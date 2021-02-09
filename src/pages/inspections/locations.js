import { useMemo } from "react";
import useSWR from "swr";
import useModalForm from "libs/useModalForm";
import setApiUrl from "libs/setApiUrl";
import m from "styles/measures";
import AddButton from "components/input/AddButton";
import Boolean from "components/Boolean";
import Checkbox from "components/input/Checkbox";
import Column from "components/containers/Column";
import FormModal from "components/containers/FormModal";
import Page from "components/layout/Page";
import PrintButton from "components/input/PrintButton";
import Row from "components/containers/Row";
import Select from "components/input/Select";
import Table from "components/data/Table";
import Textbox from "components/input/Textbox";
import XLSButton from "components/input/XLSButton";

const locationsResourceUrl = setApiUrl("inspections/locations/");
const departmentsResourceUrl = setApiUrl("organization/departments/");
const initialLocationState = {
  id: null,
  description: null,
  department_id: null,
  adc_id: null,
  emr_id: null,
  has_crashcart: false,
  is_inpatient: false,
  is_offsite: false,
  has_refrigerator: false,
  is_inspected: false,
  last_updated_by: 5
};

export default function InspectionLocations() {
  const {
    data: locationsData,
    mutate: refreshLocationsData,
    error: locationsDataError
  } = useSWR(locationsResourceUrl);
  const { data: departmentsData, departmentsDataError } = useSWR(
    departmentsResourceUrl
  );
  const [toggle, fields, register, select, submit, reset] = useModalForm(
    initialLocationState,
    locationsResourceUrl,
    refreshLocationsData
  );

  const columns = useMemo(
    () => [
      {
        Header: "Location",
        accessor: "description",
        Cell({ value }) {
          return <div>{value}</div>;
        }
      },
      {
        Header: "Department",
        accessor: "department_description"
      },
      {
        Header: "Inpatient",
        accessor: "is_inpatient",
        Cell({ value }) {
          return <Boolean value={value} />;
        }
      },
      {
        Header: "Crash Cart",
        accessor: "has_crashcart",
        Cell({ value }) {
          return <Boolean value={value} />;
        }
      },
      {
        Header: "Refrigerator",
        accessor: "has_refrigerator",
        Cell({ value }) {
          return <Boolean value={value} />;
        }
      },
      {
        Header: "Offsite",
        accessor: "is_offsite",
        Cell({ value }) {
          return <Boolean value={value} />;
        }
      },
      {
        Header: "Omnicell",
        accessor: "adc_id",
        Cell({ value }) {
          return <Boolean value={value} />;
        }
      }
    ],
    []
  );

  return (
    <>
      <Page
        pageTitle="Inspection Locations"
        width={m.col12}
        align="center"
        data={[
          locationsData && departmentsData,
          locationsDataError || departmentsDataError
        ]}
        actions={
          <>
            <XLSButton table="categoriesTable" />
            <PrintButton element="categoriesTable" />
            <AddButton onClick={() => selectCategory(null)} />
          </>
        }
      >
        <Table
          id="locationsTable"
          columns={columns}
          data={locationsData}
          onRowClick={select}
        />
        <FormModal
          isOpen={toggle}
          cancel={reset}
          hasDelete={fields.id}
          width={m.sp16}
          submit={submit}
          heading="Location"
        >
          <Row
            align="flex-end"
            justify="space-between"
            margin={`${m.sp4} 0 ${m.sp7}`}
          >
            <label>Description</label>
            <Textbox
              name="description"
              width={m.col8}
              defaultValue={fields.description}
              inputRef={register}
            />
          </Row>
          <Row
            align="flex-end"
            justify="space-between"
            margin={`${m.sp4} 0 ${m.sp7}`}
          >
            <label>Meditech</label>
            <Textbox
              name="emr_id"
              defaultValue={fields.emr_id}
              inputRef={register}
              width={m.col3}
            />
            <label>Omnicell</label>
            <Textbox
              name="adc_id"
              defaultValue={fields.adc_id}
              inputRef={register}
              width={m.col3}
            />
          </Row>
          <Row>
            <Column width="100%" align="flex-end" justify="space-around">
              <label>Inpatient</label>
              <label>Crash Cart</label>
              <label>Offsite</label>
              <label>Refrigerator</label>
            </Column>
            <Column align="flex-start">
              <Checkbox
                name="is_inpatient"
                defaultChecked={fields.is_inpatient}
                inputRef={register}
              />
              <Checkbox
                name="has_crashcart"
                defaultChecked={fields.has_crashcart}
                inputRef={register}
              />
              <Checkbox
                name="is_offsite"
                defaultChecked={fields.is_offsite}
                inputRef={register}
              />
              <Checkbox
                name="has_refrigerator"
                defaultChecked={fields.has_refrigerator}
                inputRef={register}
              />
            </Column>
          </Row>
          <label>Department</label>
          <Select
            name="department_id"
            defaultValue={fields.department_id}
            inputRef={register}
            data={departmentsData}
            valueField="id"
            labelField="description"
          />
        </FormModal>
      </Page>
    </>
  );
}
