import styled from "styled-components";
import m from "styles/measures";
import s from "styles/styles";

const StyledProgress = styled.progress`
  border-radius: ${s.borderRadius};
  border: none;
  width: ${m.col10};
  align-self: center;
  height: ${m.sp8};
`;

const StyledDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  text-align: left;
  width: ${m.col12};
  align-self: flex-start;
  display: flex;
  flex-flow: column nowrap;
`;

export default function ChemoProgress(props) {
  return (
    <StyledDiv>
      Smith VCR
      <StyledProgress />
    </StyledDiv>
  );
}
