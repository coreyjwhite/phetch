import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledSpan = styled.span.attrs({})`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  color: ${props => props.color || c.gray4};
  justify-content: center;
`;

export default function Boolean(props) {
  let value = true;
  if (props.value == false || !props.value) {
    value = false;
  }
  return (
    <StyledSpan value={value}>
      {value ? <img src="/icons/check-line.svg" /> : null}
    </StyledSpan>
  );
}
