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
  font-align: center;
`;

export default function Boolean(props) {
  let value = true;
  if (props.value == false) {
    value = false;
  }
  return (
    <StyledSpan value={value}>
      {value ? <img src="/icons/check-line.svg" /> : null}
    </StyledSpan>
  );
}
