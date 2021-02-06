import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
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
import Table from "components/data/Table";
import Textbox from "components/input/Textbox";

const pageTitle = "Inspection Record";

export default function InspectionRecord() {
  const router = useRouter();
  const { record } = router.query;
  const recordResourceUrl = setApiUrl(`inspections/records/${record}`);
  const [recordData, setRecordData] = useState([{}]);
  useEffect(() => {
    read(recordResourceUrl).then(res => setRecordData(res));
  }, []);
  const resultsResourceUrl = setApiUrl(`inspections/results/${record}`);
  const { data: resultsData, error } = useSWR(resultsResourceUrl);

  console.log(recordData[0]);

  const columns = useMemo(
    () => [
      {
        Header: "Criterion",
        accessor: "inspection_criterion_description",
        Cell({ value }) {
          return <div style={{ width: "300px" }}>{value}</div>;
        }
      },
      {
        Header: "Category",
        accessor: "inspection_category_description",
        Cell({ value }) {
          return <div style={{ width: "150px" }}>{value}</div>;
        }
      },
      {
        Header: "Edit",
        Cell({ row }) {
          return <EditButton onClick={() => selectRow({ ...row.original })} />;
        }
      }
    ],
    []
  );

  if (error) return <div>failed to load</div>;
  if (!resultsData) return <Loading />;

  return (
    <Page
      id="inspectionRecord"
      heading={pageTitle}
      pageTitle={pageTitle}
      width={m.devMd}
      align="center"
    >
      <h1>{recordData[0].location_description}</h1>
      <Table
        id="inspectionRecordResultsTable"
        columns={columns}
        data={resultsData}
      />
    </Page>
  );
}
