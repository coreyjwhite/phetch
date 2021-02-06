import { useMemo, useState } from "react";
import useSWR from "swr";
import setApiUrl from "libs/setApiUrl";
import { create, update, del } from "libs/crud";
import m from "styles/measures";
import Button from "components/input/Button";
import EditButton from "components/input/EditButton";
import Loading from "components/Loading";
import Checkbox from "components/input/Checkbox";
import CrudModal from "components/containers/CrudModal";
import Page from "components/layout/Page";
import Row from "components/containers/Row";
import Table from "components/data/Table";
import Textbox from "components/input/Textbox";

const pageTitle = "Departments";
const departmentsResourceUrl = setApiUrl("organization/departments/");
const initialDepartmentState = {
  id: "",
  description: "",
  adc_id: null,
  emr_id: null,
  is_inpatient: null,
  is_offsite: null,
  contact_id: null
};

export default function Departments() {
  // Set initial state
  const [departmentFields, setDepartmentFields] = useState(
    initialDepartmentState
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetch data
  const { data: departmentsData, error, mutate, isValidating } = useSWR(
    departmentsResourceUrl
  );

  // Update state
  async function handleSubmit(e) {
    e.preventDefault();
    if (e.target.value == "delete") {
      del(departmentsResourceUrl, { id: departmentFields.id });
    } else if (departmentFields.id == "") {
      create(departmentsResourceUrl, departmentFields);
    } else {
      update(departmentsResourceUrl, departmentFields);
    }
    resetState();
  }

  async function resetState() {
    setModalIsOpen(false);
    setDepartmentFields(initialDepartmentState);
    await !isValidating;
    mutate();
  }

  function selectRow(rowFields) {
    setModalIsOpen(true);
    setDepartmentFields({ ...rowFields });
    console.log(rowFields);
  }

  function updateDepartmentField(e) {
    setDepartmentFields({
      ...departmentFields,
      [e.target.name]: e.target.value
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell({ value }) {
          return <div style={{ width: "300px" }}>{value}</div>;
        }
      },
      {
        Header: "Omnicell",
        accessor: "adc_id",
        Cell({ value }) {
          return <div style={{ width: "150px" }}>{value}</div>;
        }
      },
      {
        Header: "Meditech",
        accessor: "emr_id",
        Cell({ value }) {
          return <div style={{ width: "150px" }}>{value}</div>;
        }
      },
      {
        Header: "Inpatient",
        accessor: "is_inpatient",
        Cell: ({ value }) => {
          return <div style={{ width: "150px" }}>{value}</div>;
        }
      },
      {
        Header: "Offsite",
        accessor: "is_offsite",
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
  if (!departmentsData) return <Loading />;

  return (
    <>
      <Page
        id="departments"
        heading={pageTitle}
        pageTitle={pageTitle}
        width={m.devMd}
        align="center"
        actions=<Button
          onClick={() => setModalIsOpen(true)}
          width={m.sp8}
          style={{ fontWeight: 600 }}
        >
          +
        </Button>
      >
        <Table id="departmentsTable" columns={columns} data={departmentsData} />
      </Page>
      <CrudModal
        isOpen={modalIsOpen}
        cancel={resetState}
        submit={handleSubmit}
        hasDelete={departmentFields.id}
        heading="Department"
        width={m.sp16}
      >
        <Row margin={`0 0 ${m.sp4}`}>
          <label>Description</label>
          <Textbox
            name="description"
            value={departmentFields.description}
            onChange={updateDepartmentField}
          />
        </Row>
        <Row>
          <label>Omnicell</label>
          <Textbox
            name="adc_id"
            value={departmentFields.adc_id}
            onChange={updateDepartmentField}
          />
        </Row>
        <Row>
          <label>Inpatient</label>
          <Checkbox
            name="is_inpatient"
            value={departmentFields.is_inpatient === 1 ? true : false}
            onChange={updateDepartmentField}
          />
        </Row>
      </CrudModal>
    </>
  );
}
