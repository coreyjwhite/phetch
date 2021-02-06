import { useState } from "react";
import m from "styles/measures";
import Button from "components/input/Button";
import Modal from "styled-react-modal";
import Page from "components/layout/Page";

export default function Criteria() {
  // Set initial state
  const [categoryModalIsOpen, setCategoryModalIsOpen] = useState(false);

  function toggleModal(e) {
    setCategoryModalIsOpen(!categoryModalIsOpen);
  }

  function resetState() {
    setCategoryModalIsOpen(false);
  }

  return (
    <>
      <Page id="modalPage" align="center">
        <Button onClick={toggleModal} />
      </Page>
      <Modal isOpen={categoryModalIsOpen} width={m.sp16}></Modal>
    </>
  );
}
