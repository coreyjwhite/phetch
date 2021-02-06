import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import setApiUrl from "libs/setApiUrl";
import { create, read, update, del } from "libs/crud";
import m from "styles/measures";
import Boolean from "components/Boolean";
import Button from "components/input/Button";
import EditButton from "components/input/EditButton";
import FormLabel from "components/input/FormLabel";
import Loading from "components/Loading";
import Checkbox from "components/input/Checkbox";
import Column from "components/containers/Column";
import CrudModal from "components/containers/CrudModal";
import Page from "components/layout/Page";
import Row from "components/containers/Row";
import Select from "components/input/Select";
import Table from "components/data/Table";
import Textbox from "components/input/Textbox";

const pageTitle = "Locations";
const locationsResourceUrl = setApiUrl("organization/locations/");
const initialLocationFields = {
  id: "",
  description: null,
  adc_id: null,
  emr_id: null,
  is_inpatient: null,
  is_offsite: null,
  contact_id: null,
  department_id: null
};

export default function Locations() {
  // Set initial state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [locationFields, setLocationFields] = useState(initialLocationFields);

  // Fetch data
  const { data: locationsData, error, mutate, isValidating } = useSWR(
    locationsResourceUrl
  );

  // Update state
  async function handleSubmit(e) {
    e.preventDefault();
    if (e.target.value == "delete") {
      del(locationsResourceUrl, { id: locationFields.id });
    } else if (locationFields.id == "") {
      create(locationsResourceUrl, locationFields);
    } else {
      update(locationsResourceUrl, locationFields);
    }
    resetState();
  }

  async function resetState() {
    setModalIsOpen(false);
    setLocationFields(initialLocationFields);
    await !isValidating;
    mutate();
  }

  function selectRow(rowFields) {
    setModalIsOpen(true);
    setLocationFields({ ...rowFields });
    console.log(rowFields);
  }

  function updateLocationField(e) {
    if (e.target.type == "checkbox") {
      if (e.target.value == true) {
        e.target.value = 1;
      } else e.target.value = 0;
    }
    setLocationFields({
      ...locationFields,
      [e.target.name]: e.target.value
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell({ value }) {
          return <div style={{ width: "150px" }}>{value}</div>;
        }
      },
      {
        Header: "Department",
        accessor: "department_description",
        Cell({ value }) {
          return <div style={{ width: "150px" }}>{value}</div>;
        }
      },
      {
        Header: "Contact",
        accessor: "contact_email",
        Cell({ value }) {
          return <div style={{ width: "150px" }}>{value}</div>;
        }
      },
      {
        Header: "Omnicell",
        accessor: "adc_id",
        Cell: ({ value }) => {
          return <div style={{ width: "100px" }}>{value}</div>;
        }
      },
      {
        Header: "Meditech",
        accessor: "emr_id",
        Cell: ({ value }) => {
          return <div style={{ width: "100px" }}>{value}</div>;
        }
      },
      {
        Header: "Inpatient",
        accessor: "is_inpatient",
        Cell: ({ value }) => {
          return <Boolean value={value} />;
        }
      },
      {
        Header: "Offsite",
        accessor: "is_offsite",
        Cell: ({ value }) => {
          return <Boolean value={value} />;
        }
      },
      {
        Header: "Crash Cart",
        accessor: "has_crashcart",
        Cell: ({ value }) => {
          return <Boolean value={value} />;
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
  if (!locationsData) return <Loading />;

  return (
    <>
      <Page
        id="locations"
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
        <Table id="locationsTable" columns={columns} data={locationsData} />
      </Page>
      <CrudModal
        isOpen={modalIsOpen}
        cancel={resetState}
        submit={handleSubmit}
        hasDelete={locationFields.id}
        heading={
          locationFields.id
            ? `Edit ${locationFields.description}`
            : "New Location"
        }
        width={m.sp16}
      >
        <Row margin={`${m.sp6} 0 ${m.sp7}`}>
          <Column justify="flex-start" width={m.col12}>
            <Textbox
              type="text"
              name="description"
              value={locationFields.description}
              onChange={updateLocationField}
              margin={`0 0 ${m.sp2}`}
              style={{ width: m.col12 }}
            />
            <FormLabel label="Description" />
          </Column>
        </Row>
        <Row margin={`${m.sp8} 0 ${m.sp2}`}>
          <Column justify="flex-start">
            <Select />
            <FormLabel label="Department" />
          </Column>
        </Row>
        <Row justify="flex-end" margin={`${m.sp8} 0 ${m.sp2}`}>
          <Column justify="center">
            <Textbox
              type="text"
              name="adc_id"
              value={locationFields.adc_id}
              onChange={updateLocationField}
            />
            <FormLabel label="Omnicell" />
          </Column>
          <Column justify="flex-start">
            <Textbox
              type="text"
              name="emr_id"
              value={locationFields.emr_id}
              onChange={updateLocationField}
            />
            <FormLabel label="Meditech" />
          </Column>
        </Row>
        <Row justify="flex-start" margin={`${m.sp8} 0 ${m.sp2}`}>
          <FormLabel label="Inpatient" />
          <Checkbox
            type="checkbox"
            name="is_inpatient"
            value={locationFields.is_inpatient === 1 ? true : false}
            onChange={updateLocationField}
          />
          <FormLabel label="Offsite" />
          <Checkbox
            type="checkbox"
            name="is_offsite"
            value={locationFields.is_offsite === 1 ? true : false}
            onChange={updateLocationField}
          />
        </Row>
      </CrudModal>
    </>
  );
}
