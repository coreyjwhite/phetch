import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const HiddenCheckbox = styled.input.attrs({
  className: "hiddenToggle",
  type: "checkbox"
})`
  display: none;
`;

const StyledLabel = styled.label.attrs(props => ({
  id: props.id,
  className: "toggleContainer"
}))`
  position: relative;
  width: ${m.sp9};
  height: ${m.sp7};
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  span {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: ${m.sp5};
    background-color: ${c.gray8};
  }
  span:before {
    position: absolute;
    width: ${m.sp6};
    height: ${m.sp6};
    bottom: 4px;
    left: 4px;
    border-radius: ${m.sp6};
    background-color: white;
    transition: transform 0.1s;
    content: "";
  }
  input:checked + span {
    border: ${s.activeBorder};
    background-color: ${c.primary5};
  }
  input:checked + span:before {
    bottom: 2px;
    left: 4px;
    border: 0px;
    transform: translateX(1.25rem);
  }
`;

export default function Toggle(props) {
  return (
    <StyledLabel {...props}>
      <HiddenCheckbox id={`_${props.id}`} />
      <span />
    </StyledLabel>
  );
}
