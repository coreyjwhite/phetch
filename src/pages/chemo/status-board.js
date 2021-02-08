import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import Card from "components/containers/Card";
import ChemoProgress from "components/ChemoProgress";
import Page from "components/layout/Page";
import PageHeader from "components/layout/PageHeader";

const StyledHeader = styled(PageHeader)`
  height: ${m.sp11};
  background: ${c.primary6};
  padding: 0;
  & h1 {
    color: ${c.primary9};
    margin: ${m.sp3} ${m.sp6};
  }
`;

const pageProps = {
  pageTitle: "Chemo Status Board",
  header: (
    <StyledHeader>
      <div style={{ textAlign: "center" }}>
        <h1>Today</h1>
        <h1>14</h1>
      </div>
    </StyledHeader>
  )
};

const chemoAppointments = [
  {
    id: 1,
    patient: "Smith",
    drug: ["VCR", "MTX"],
    allDay: false,
    start: new Date(2021, 1, 3, 10, 0),
    end: new Date(2021, 1, 3, 10, 0)
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0)
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 4, 12, 0),
    end: new Date(2021, 1, 4, 12, 0)
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 4, 12, 0),
    end: new Date(2021, 1, 4, 12, 0)
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 5, 12, 0),
    end: new Date(2021, 1, 5, 12, 0)
  }
];

export default function ChemoStatusBoard() {
  return (
    <Page {...pageProps}>
      <Card width={m.col12} height="80vh">
        <ChemoProgress />
      </Card>
    </Page>
  );
}
