import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledTextarea = styled.textarea.attrs({
  type: "textarea"
})`
  width: ${props => props.width || m.col12};
  height: ${props => props.height || m.sp11};
  resize: none;
  border: 1px solid ${c.gray8};
  border-radius: ${s.borderRadius};
  color: ${c.gray2};
  &:focus {
    background-color: ${c.primary9};
  }
`;

export default function Textarea(props) {
  return (
    <StyledTextarea {...props} ref={props.inputRef}>
      {props.children}
    </StyledTextarea>
  );
}
