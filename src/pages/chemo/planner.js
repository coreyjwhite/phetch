import { useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import useModalForm from "libs/useModalForm";
import setApiUrl from "libs/setApiUrl";
import c from "styles/color";
import m from "styles/measures";
import chemoAppointments from "pages/chemo/chemoAppointments";
import AddButton from "components/input/AddButton";
import Calendar from "components/calendar/Calendar";
import Card from "components/containers/Card";
import ChemoEvent from "components/calendar/ChemoEvent";
import FormModal from "components/containers/FormModal";
import Page from "components/layout/Page";
import PrintButton from "components/input/PrintButton";
import Textbox from "components/input/Textbox";

const pageTitle = "Chemo Planner";

const initialEventState = {
  id: null,
  patient: null,
  drug: [],
  allDay: false,
  start: null,
  end: null,
  status: null
};

export default function ChemoPlanner() {
  const { register, handleSubmit, errors } = useForm();
  const [toggle, fields, reset, select, submit] = useModalForm(
    initialEventState
  );

  return (
    <>
      <Page
        pageTitle={pageTitle}
        actions={
          <>
            <PrintButton element="chemoCalendarCard" />
            <AddButton onClick={select} />
          </>
        }
      >
        <Card id="chemoCalendar" width={m.col12}>
          <Calendar
            selectable
            event={ChemoEvent}
            events={chemoAppointments}
            onSelectEvent={select}
            views={["month", "week", "day"]}
            min={new Date(2008, 0, 1, 7, 0)}
            max={new Date(2008, 0, 1, 17, 0)}
          />
        </Card>
      </Page>
      <FormModal
        isOpen={toggle}
        cancel={reset}
        hasDelete={true}
        width={m.sp16}
        submit={handleSubmit(submit)}
      >
        <Textbox name="drug" defaultValue={fields.drug} inputRef={register} />
        <Textbox
          name="patient"
          defaultValue={fields.patient}
          inputRef={register({ required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
      </FormModal>
    </>
  );
}
