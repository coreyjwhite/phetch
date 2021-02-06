import styled from "styled-components";
import { createRef, useMemo, useState } from "react";
import c from "styles/color";
import m from "styles/measures";
import Button from "components/input/Button";
import Card from "components/containers/Card";
import Checkbox from "components/input/Checkbox";
import Column from "components/containers/Column";
import Modal from "styled-react-modal";
import PageHeader from "components/layout/PageHeader";
import Palette from "components/Palette";
import Pill from "components/Pill";
import PrintButton from "components/input/PrintButton";
import Progress from "components/Progress";
import Radio from "components/input/Radio";
import Row from "components/containers/Row";
import Table from "components/data/Table";
import Toggle from "components/input/Toggle";
import Page from "components/layout/Page";

const StyledHeader = styled(PageHeader)`
  height: ${m.sp15};
  background: gray;
`;

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default function Styles() {
  const props = {
    id: "styles",
    pageTitle: "Styles",
    header: (
      <StyledHeader id="styles" className="Header">
        <Column>
          <Row width={m.col12} justify="flex-start">
            <h1 style={{ color: "white" }}>header</h1>
          </Row>
          <Row justify="flex-start">
            <Card align="center" width="fit-content">
              <Row>
                <h3
                  style={{
                    margin: 0,
                    color: c.primary6,
                    alignSelf: "flex-start"
                  }}
                >
                  Reorder
                </h3>
              </Row>
              <h1 style={{ fontSize: m.sp11, margin: 0, color: c.primary6 }}>
                78%
              </h1>
            </Card>
          </Row>
        </Column>
      </StyledHeader>
    )
  };

  const columns = useMemo(
    () => [
      {
        Header: "Product",
        accessor: "col1",
        Cell: ({ value }) => {
          return (
            <>
              <p className="bold">{value}</p>
            </>
          );
        }
      },

      {
        Header: () => (
          <div
            style={{
              textAlign: "center"
            }}
          >
            Number
          </div>
        ),
        accessor: "col3"
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "center"
            }}
          >
            Progress
          </div>
        ),
        accessor: "col4"
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "center"
            }}
          >
            Pill
          </div>
        ),
        accessor: "col5"
      },
      {
        Header: "Check",
        accessor: "col6"
      }
    ],
    []
  );
  const data = useMemo(
    () => [
      {
        col1: (
          <>
            <p>acetaminophen 1000mg/100mL VIAL</p>
            <p className="light">Ofirmev</p>
          </>
        ),

        col4: <Progress max={50} value={40} warning={45} danger={10} />,
        col5: <Pill className="success">Success</Pill>,
        col6: <Checkbox />
      },
      {
        col1: (
          <>
            <p>albuteroL 90mcg/puff MDI</p>
            <p className="light">ProAir</p>
          </>
        ),

        col3: "",
        col4: <Progress max={100} value={15} warning={50} danger={20} />,
        col5: <Pill className="warning">Warning</Pill>,
        col6: <Checkbox />
      },
      {
        col1: (
          <>
            <p>dexAMETHasone 4mg/mL 1mL VIAL</p>
            <p className="light">Decadron</p>
          </>
        ),

        col4: <Progress max={100} value={170} warning={50} danger={20} />,
        col5: <Pill className="danger">2.4</Pill>,
        col6: <Checkbox />
      },
      {
        col1: (
          <>
            <p>dexmedeTOMidine 200mcg/2mL VIAL</p>
            <p className="light">Precedex</p>
          </>
        ),

        col3: "",
        col4: <Progress max={10} value={10} warning={5} danger={2} />,
        col5: <Pill className="warning">Warning</Pill>,
        col6: <Checkbox />
      },
      {
        col1: (
          <>
            <p>fentaNYL citrate 50mcg/mL 2mL VIAL</p>
            <p className="light">Sublimaze</p>
          </>
        ),

        col3: "",
        col4: <Progress max={100} value={70} warning={50} danger={40} />,
        col5: <Pill className="success">Success</Pill>,
        col6: <Checkbox />
      },
      {
        col1: (
          <>
            <p>propofoL 10mg/mL 20mL VIAL</p>
            <p className="light">Diprivan</p>
          </>
        ),

        col3: "",
        col4: <Progress max={20} value={10} warning={10} danger={5} />,
        col5: <Pill className="success">Success</Pill>,
        col6: <Checkbox />
      }
    ],
    []
  );

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Page {...props}>
        <>
          <Row>
            <Column width="fit-content">
              <Table
                id="watchlistTable"
                columns={columns}
                data={data}
                heading="Watchlist"
                actions=<PrintButton element="watchlistTable" />
              />
            </Column>
          </Row>
          <Row id="colorsAndInput" justify="space-around" width={m.col12}>
            <Column width={m.col7}>
              <Card
                id="colors"
                heading="Color"
                width={m.col8}
                height="20rem"
                align="center"
              >
                <Palette />
              </Card>
            </Column>
            <Column width={m.col5}>
              <Card
                id="inputs"
                heading="Input"
                width={m.col12}
                height="20rem"
                align="center"
              >
                <Column justify="space-evenly" height="100%">
                  <Row height="25%" align="center" justify="space-around">
                    <Button id="examplePrimaryButton" onClick={toggleModal}>
                      Primary
                    </Button>
                    <Button id="exampleSecondaryButton" className="secondary">
                      Secondary
                    </Button>
                    <Button id="exampleTertiaryButton" className="tertiary">
                      Tertiary
                    </Button>
                  </Row>
                  <Row height="25%" align="center" justify="space-around">
                    <Radio id="exampleRadio" />
                    <Toggle id="exampleToggle" />
                    <Checkbox id="exampleCheckbox" />
                  </Row>
                </Column>
              </Card>
            </Column>
          </Row>
          <Row width={m.col12}>
            <Column id="firstColumn" width={m.col5} height={m.sp19}>
              <Card id="firstCard" heading="First Card" height={m.col4}></Card>
              <Card height={m.col6} />
              <Card height={m.col2} />
            </Column>
            <Column id="secondColumn" width={m.col5} height={m.sp18}>
              <Card id="firstCard" heading="First Card" height={m.col2}></Card>
              <Card height={m.col4} />
              <Card height={m.col6} />
            </Column>
          </Row>
        </>
      </Page>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <span>I am a modal!</span>
        <button onClick={toggleModal}>Close me</button>
      </StyledModal>
    </>
  );
}
