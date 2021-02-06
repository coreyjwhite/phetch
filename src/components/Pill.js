import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledSpan = styled.span`
  display: inline-block;
  height: fit-content;
  width: ${props => props.width || "fit-content"};
  border-radius: 100px;
  margin: 0;
  padding: ${m.sp3};
  background-color: ${props => props.bg || c.gray9};
  border: ${props => props.border || "none"};
  color: ${props => props.color || c.gray4};
  font-size: ${m.sp6};
  font-weight: 500;
  cursor: default;
  &.success {
    background-color: ${c.success5};
    color: ${c.success2};
  }
  &.warning {
    background-color: ${c.warning5};
    color: ${c.warning1};
  }
  &.danger {
    background-color: ${c.danger5};
    color: ${c.danger1};
  }
`;

export default function Pill(props) {
  return <StyledSpan {...props}>{props.children}</StyledSpan>;
}
