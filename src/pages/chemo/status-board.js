import styled from "styled-components";
import s from "styles/styles";
import Card from "components/containers/Card";
import Page from "components/layout/Page";

const pageProps = {
  pageTitle: "Chemo Status Board"
};

const StyledProgress = styled.progress`
  border-radius: ${s.borderRadius};
  border: none;
`;

export default function ChemoStatusBoard() {
  return (
    <Page {...pageProps}>
      <Card>
        <StyledProgress value="30" max="70" />
      </Card>
    </Page>
  );
}
