import styled from "styled-components";

const ModalBackground = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  background-color: hsla(0, 0%, 20%, 0.5);
`;

export default ModalBackground;
