import styled from "styled-components";
import Page from "components/layout/Page";
import Loader from "react-loader-spinner";
import c from "styles/color";

const StyledDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Loading() {
  return (
    <Page>
      <StyledDiv>
        <Loader type="Grid" color={c.primary7} height={60} width={60} />
      </StyledDiv>
    </Page>
  );
}
