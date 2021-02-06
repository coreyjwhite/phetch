import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledSpan = styled.span.attrs({})`
  display: inline-block;
  height: ${m.sp8};
  width: ${m.sp8};
  border-radius: 100px;
  margin: 0;
  padding: ${m.sp4};
  color: ${props => props.color || c.gray4};
  font-family: Georgia, serif;
  font-size: ${m.sp6};
  font-weight: 600;
  cursor: default;
  &.legend {
    color: ${c.primary5};
    font-size: 1.5rem;
  }
  &.scheduleTwo {
    border: 2px solid ${c.danger4};
    padding: 0.35rem;
    color: ${c.danger4};
  }
  &.scheduleThree {
    color: ${c.danger4};
  }
  &.scheduleFour {
    color: ${c.danger4};
  }
  &.scheduleFive {
    color: ${c.danger4};
  }
`;

export default function ControlLevel(props) {
  let ctrl_lvl = props.ctrl_lvl;
  let className = "legend";
  let display = "℞";
  if (ctrl_lvl == "2") {
    className = "scheduleTwo";
    display = "II";
  } else if (ctrl_lvl == "3") {
    className = "scheduleThree";
    display = "III";
  } else if (ctrl_lvl == "4") {
    className = "scheduleFour";
    display = "IV";
  } else if (ctrl_lvl == "5") {
    className = "scheduleFive";
    display = "V";
  }
  return <StyledSpan className={className}>{display}</StyledSpan>;
}
