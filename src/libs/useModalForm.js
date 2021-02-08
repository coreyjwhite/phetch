/** @module useModalForm */
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { create, del, update } from "libs/request";

/**
 * useModalForm - Provide state and methods for the ModalForm component.
 *
 * @param  {object} initialFieldsState State of an empty form.
 * @param  {string} apiUrl             RESTful API resource URL.
 * @param  {Function} refresh          Function for refreshing after submit.
 * @returns {Array.<(boolean | object | Function)>}  Array of modal toggle,
 *    fields data, field ref object, data update method, submit and reset
 *    functions, and validation errors object.
 */
export default function useModalForm(initialFieldsState, apiUrl, refresh) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fields, setFields] = useState(initialFieldsState);
  const { register, handleSubmit, errors } = useForm();

  /**
   * select - description
   *
   * @param  {object} newFields description
   */
  function select(newFields) {
    setFields(Object.assign(fields, newFields));
    console.log(fields);
    setModalIsOpen(true);
  }

  /**
   * submit - description
   *
   * @param  {object} newFields description
   */
  function submit(newFields) {
    setFields(Object.assign(fields, newFields));
    if (newFields.value == "delete") {
      del(apiUrl, { id: fields.id });
    } else if (fields.id == null) {
      create(apiUrl, fields);
    } else {
      update(apiUrl, fields);
    }
    reset();
    refresh();
  }

  /**
   * reset - description
   */
  function reset() {
    setFields(initialFieldsState);
    setModalIsOpen(false);
    refresh();
  }

  return [
    modalIsOpen,
    fields,
    register,
    useCallback(e => select(e)),
    handleSubmit(submit),
    reset,
    errors
  ];
}
