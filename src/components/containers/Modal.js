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
  padding: ${m.sp7};
  box-shadow: ${s.elev5};
  @media (min-width: ${m.devMd}){
    width: ${props => props.width || "fit-content"};
    height: ${props => props.height || "fit-content"};
    border-radius: ${s.borderRadius};
  }
`;

const StyledH3 = styled.h3`
  margin: 0 0 ${m.sp6};
`;

export default function MyModal(props) {
  return (
    <StyledModal
      {...props}
      onBackgroundClick={props.cancel}
      onEscapeKeydown={props.cancel}
    >
      <Row width={m.col12} justify="flex-start">
        <StyledH3>{props.heading}</StyledH3>
      </Row>
      {props.children}
    </StyledModal>
  );
}
