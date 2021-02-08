import styled from "styled-components";
import m from "styles/measures";
import s from "styles/styles";

const StyledProgress = styled.progress`
  border-radius: ${s.borderRadius};
  border: none;
  width: ${m.col10};
`;

const StyledDiv = styled.div`
  width: ${m.col12};
  align-self: center;
  display: flex;
  flex-flow: column nowrap;
`;

export default function ChemoProgress(props) {
  return (
    <StyledDiv>
      <StyledProgress />
    </StyledDiv>
  );
}
