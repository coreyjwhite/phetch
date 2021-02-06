import { useCallback, useState } from "react";
import { create, read, update, del } from "libs/crud";

export default function useModalForm(
  initialFieldsState,
  apiUrl,
  toggleState = false
) {
  const [modalIsOpen, setModalIsOpen] = useState(toggleState);
  const [fields, setFields] = useState(initialFieldsState);

  function reset() {
    setFields(initialFieldsState);
    setModalIsOpen(false);
  }

  function select(e) {
    setFields(e);
    setModalIsOpen(true);
  }

  function submit(e) {
    console.log(e);
    if (e.target.value == "delete") {
      del(apiUrl, { id: fields.id });
    } else if (fields.id == null) {
      create(apiUrl, fields);
    } else {
      update(apiUrl, fields);
    }
    reset();
  }

  return [modalIsOpen, fields, reset, useCallback(e => select(e)), submit];
}
