import { useMemo } from "react";
import useSWR from "swr";
import useModalForm from "libs/useModalForm";
import setApiUrl from "libs/setApiUrl";
import m from "styles/measures";
import Boolean from "components/Boolean";
import Checkbox from "components/input/Checkbox";
import FormModal from "components/containers/FormModal";
import Page from "components/layout/Page";
import Select from "components/input/Select";
import Table from "components/data/Table";
import Textbox from "components/input/Textbox";

const locationsResourceUrl = setApiUrl("inspections/locations/");
const departmentsResourceUrl = setApiUrl("organization/departments/");
const initialLocationState = {
  id: null,
  description: null,
  adc_id: null,
  has_crashcart: false,
  is_inpatient: false,
  is_offsite: false,
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
      ,
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
      >
        <Table
          id="locationsTable"
          columns={columns}
          data={locationsData}
          onRowClick={select}
        />
      </Page>
      <FormModal
        isOpen={toggle}
        cancel={reset}
        hasDelete={fields.id}
        width={m.sp16}
        submit={submit}
      >
        <Textbox
          name="description"
          defaultValue={fields.description}
          inputRef={register}
        />
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
        <Textbox
          name="adc_id"
          defaultValue={fields.adc_id}
          inputRef={register}
          margin={`${m.sp4} 0`}
        />
        <Select
          name="department_id"
          defaultValue={fields.department_id}
          inputRef={register}
          data={departmentsData}
          value="id"
          label="description"
        ></Select>
      </FormModal>
    </>
  );
}
