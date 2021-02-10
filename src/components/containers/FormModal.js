import Button from "components/input/Button";
import Modal from "styled-react-modal";
import Row from "components/containers/Row";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import styled from "styled-components";

const StyledModal = Modal.styled`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: space-between;
  justify-content: space-between;
  background-color: white;
  color: ${c.gray2};
  padding: ${m.sp8};
  box-shadow: ${s.elev5};
  @media (min-width: ${m.devMd}) {
    width: ${props => props.width || "fit-content"};
    height: ${props => props.height || "fit-content"};
    border-radius: ${s.borderRadius};
  }
`;

const StyledH2 = styled.h2`
  margin: 0 0 ${m.sp6};
`;

export default function FormModal(props) {
  return (
    <StyledModal
      {...props}
      onBackgroundClick={props.cancel}
      onEscapeKeydown={props.cancel}
    >
      <Row width={m.col12} justify="flex-start">
        <StyledH2>{props.heading}</StyledH2>
      </Row>
      <form onSubmit={props.submit}>
        {props.children}
        <Row justify="flex-end" margin={`${m.sp8} 0 0`}>
          {props.hasDelete ? (
            <Button
              className="delete"
              value="delete"
              onClick={props.submit}
              style={{ marginRight: "auto" }}
            >
              Delete
            </Button>
          ) : null}
          <Button className="secondary" onClick={props.cancel}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Row>
      </form>
    </StyledModal>
  );
}
