import { useState } from "react";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const HiddenCheckbox = styled.input.attrs(props => ({
  className: "hiddenCheckbox",
  type: "checkbox",
  checked: props.checked
}))`
  display: none;
`;

const StyledCheckbox = styled.div.attrs({ className: "styledCheckbox" })`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${m.sp7};
  height: ${m.sp7};
  border: ${props => (props.checked ? s.activeBorder : s.inactiveBorder)};
  border-radius: ${s.borderRadius};
  background: ${props => (props.checked ? c.primary5 : "white")};
  cursor: pointer;
`;

const CheckboxContainer = styled.div.attrs({ className: "checkboxContainer" })`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCheckIcon = styled.img.attrs({
  className: "styledCheckIcon",
  src: "/icons/check-line-white.svg"
})`
  display: inline-block;
  width: ${m.sp7};
  height: ${m.sp7};
  visibility: ${props => (props.checked ? "visible" : "hidden")};
`;

export default function Checkbox(props) {
  const [checked, setChecked] = useState(props.defaultChecked);
  return (
    <CheckboxContainer
      id={`${props.id}Container`}
      onClick={() => setChecked(!checked)}
    >
      <HiddenCheckbox
        id={`_${props.id}`}
        checked={checked}
        ref={props.inputRef}
        {...props}
      />
      <StyledCheckbox id={props.id} checked={checked}>
        <StyledCheckIcon checked={checked} />
      </StyledCheckbox>
    </CheckboxContainer>
  );
}
