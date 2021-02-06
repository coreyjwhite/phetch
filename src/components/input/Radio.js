import { useState } from "react";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const HiddenRadio = styled.input.attrs({
  className: "hiddenRadio",
  type: "radio"
})`
  display: none;
`;

const StyledRadio = styled.div.attrs(props => ({
  id: props.id,
  className: "styledRadio"
}))`
  display: flex;
  width: ${m.sp7};
  height: ${m.sp7};
  padding: 3px;
  border: ${props => (props.checked ? s.activeBorder : s.inactiveBorder)};
  border-radius: 100%;
  background: white;
  cursor: pointer;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-color: ${props => (props.checked ? c.primary5 : "white")};
  }
`;

const RadioContainer = styled.div.attrs({ className: "radioContainer" })`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${m.sp5};
  -webkit-tap-highlight-color: transparent;
`;

export default function Radio(props) {
  const [checked, setChecked] = useState(false);
  return (
    <RadioContainer
      id={`${props.id}Container`}
      onClick={() => setChecked(!checked)}
    >
      <HiddenRadio id={`_${props.id}`} checked={checked} />
      <StyledRadio id={props.id} checked={checked}>
        <span></span>
      </StyledRadio>
    </RadioContainer>
  );
}
