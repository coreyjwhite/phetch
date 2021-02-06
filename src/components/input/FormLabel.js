import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";

const StyledLabel = styled.label`
  color: ${c.gray5};
  font-size: ${m.sp6};
  margin-top: ${m.sp3};
`;

export default function FormLabel(props) {
  return <StyledLabel>{props.label}</StyledLabel>;
}
