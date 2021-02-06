import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import useModalForm from "libs/useModalForm";
import setApiUrl from "libs/setApiUrl";
import { read, update } from "libs/crud";
import m from "styles/measures";
import Boolean from "components/Boolean";
import FormModal from "components/containers/FormModal";
import Loading from "components/Loading";
import Page from "components/layout/Page";
import Row from "components/containers/Row";
import Table from "components/data/Table";
import Textbox from "components/input/Textbox";

const pageTitle = "Inspection Locations";

const locationsResourceUrl = setApiUrl("inspections/locations/");

const initialLocationState = {
  id: null,
  description: null,
  has_crashcart: null,
  is_inpatient: null,
  is_offsite: null,
  is_inspected: null,
  last_updated_by: 5
};

export default function InspectionLocations() {
  const {
    data: locationsData,
    error: locationsDataError,
    mutate: refreshLocationsData,
    isValidating: locationsDataIsValidating
  } = useSWR(locationsResourceUrl);

  const { register, handleSubmit, errors } = useForm();
  const [modalIsOpen, fields, reset, select, submit] = useModalForm(
    initialLocationState
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
      }
    ],
    []
  );

  if (locationsDataError) return <div>failed to load</div>;
  if (!locationsData) return <Loading />;

  return (
    <>
      <Page pageTitle={pageTitle} width={m.devMd} align="center">
        <Table
          id="locationsTable"
          columns={columns}
          data={locationsData}
          onRowClick={select}
        />
      </Page>
      <FormModal
        isOpen={modalIsOpen}
        cancel={reset}
        hasDelete={true}
        width={m.sp16}
        submit={handleSubmit(submit)}
      >
        <Textbox
          name="description"
          defaultValue={fields.description}
          inputRef={register}
        />
      </FormModal>
    </>
  );
}
