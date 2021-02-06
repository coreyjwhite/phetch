import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import setApiUrl from "libs/setApiUrl";
import { create, read, update, del } from "libs/crud";
import m from "styles/measures";
import Button from "components/input/Button";
import EditButton from "components/input/EditButton";
import Loading from "components/Loading";
import Checkbox from "components/input/Checkbox";
import Page from "components/layout/Page";
import Row from "components/containers/Row";
import Select from "components/input/Select";
import Table from "components/data/Table";
import Textbox from "components/input/Textbox";

const pageTitle = "New Inspection Record";
const locationsResourceUrl = setApiUrl("organization/locations");
const newRecordResourceSlug = "inspections/record/new/";

export default function InspectionRecord() {
  // Set initial state
  const [locationId, setLocationId] = useState("2");
  const [locationsData, setLocationsData] = useState({});
  const [newRecordResourceUrl, setNewRecordResourceUrl] = useState(
    setApiUrl(`${newRecordResourceSlug}${locationId}`)
  );
  const [recordFields, setRecordFields] = useState({
    inspector_id: "1",
    contact_id: "1",
    last_updated_by: "1"
  });
  const [results, setResults] = useState([
    {
      criterion_id: "2",
      status: "1",
      result_comment: "",
      last_updated_by: "1"
    }
  ]);

  function changeLocation(e) {
    setLocationId(e.target.value);
    setNewRecordResourceUrl(
      setApiUrl(`${newRecordResourceSlug}${e.target.value}`)
    );
    constructResults(criteriaData);
    console.log(results);
  }

  function constructResults(criteriaData) {
    setResults([{}]);
    criteriaData.forEach(function(criterion) {
      setResults(results => [
        ...results,
        {
          criterion_id: criterion.criterion_id,
          status: 1,
          result_comment: "",
          last_updated_by: 5
        }
      ]);
    });
  }

  // Fetch data
  const { data: criteriaData, error, mutate, isValidating } = useSWR(
    newRecordResourceUrl
  );
  useEffect(() => {
    read(locationsResourceUrl).then(res => setLocationsData(res));
  }, []);

  // Update state
  async function handleSubmit(e) {
    e.preventDefault();
    create(newRecordResourceUrl, { record: recordFields, results: results });
  }

  function handleCheck() {
    const elementsIndex = results.findIndex(
      element => element.criterion_id == 25
    );
    console.log(results[elementsIndex]);
    const newArray = [...results];
    console.log(newArray);
    newArray[elementsIndex] = { ...newArray[elementsIndex], status: 2 };
    console.log(newArray[elementsIndex]);
    setResults([newArray]);
  }

  const columns = useMemo(
    () => [
      {
        Header: "Criterion",
        accessor: "location_id",
        Cell({ value }) {
          return <div style={{ width: "300px" }}>{value}</div>;
        }
      },
      {
        Header: "Category",
        accessor: "description",
        Cell({ value }) {
          return <div style={{ width: "150px" }}>{value}</div>;
        }
      },
      {
        Header: "Result",
        Cell({ row }) {
          return <input type="checkbox" onClick={() => handleCheck()} />;
        }
      }
    ],
    []
  );

  if (error) return <div>failed to load</div>;
  if (!criteriaData) return <Loading />;

  return (
    <Page
      id="newInspectionRecord"
      heading={pageTitle}
      pageTitle={pageTitle}
      width={m.devMd}
      align="center"
      actions=<Button onClick={handleSubmit} width={m.sp10}>
        Submit
      </Button>
    >
      <Select name="location_id" value={locationId} onChange={changeLocation}>
        {Object.keys(locationsData).map(key => {
          return (
            <option key={key} value={locationsData[key].id}>
              {locationsData[key].description}
            </option>
          );
        })}
      </Select>
      <Table
        id="inspectionRecordResultsTable"
        columns={columns}
        data={criteriaData}
      />
    </Page>
  );
}
