import PropTypes from "prop-types";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine } from "victory";
import setApiUrl from "libs/setApiUrl";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Card from "components/containers/Card";
import Checkbox from "components/input/Checkbox";
import Column from "components/containers/Column";
import LoadingPage from "components/layout/LoadingPage";
import MiniTable from "components/data/MiniTable";
import Modal from "components/containers/Modal";
import Page from "components/layout/Page";
import Pill from "components/Pill";
import PrintButton from "components/input/PrintButton";
import Progress from "components/Progress";
import Row from "components/containers/Row";
import SparklineCard from "components/data/SparklineCard";
import StatusCard from "components/data/StatusCard";
import Table from "components/data/Table";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Smith Vinca",
    patient: "Smith",
    drug: ["VCR", "MTX"],
    allDay: false,
    start: new Date(2021, 1, 3, 10, 0),
    end: new Date(2021, 1, 3, 10, 0)
  },
  {
    title: "Green MTX",
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0)
  }
];

const StyledCalendar = styled(Calendar)`
  .rbc-btn-group {
    display: none;
  }
  &.rbc-calendar {
    width: ${m.col12};
    background-color: white;
  }
  .rbc-time-header-content {
    display: none;
  }
  .rbc-time-content {
    border: none;
  }
  .rbc-timeslot-group {
    border: none;
  }
  .rbc-time-view {
    border: none;
    background-color: white;
  }
  .rbc-time-column {
    background-color: white;
  }
  .rbc-events-container {
    border: none;
    background-color: white;
  }
  .rbc-toolbar-label {
    display: none;
  }
  .rbc-events-container {
    div {
      border: none;
    }
  }
  .rbc-event {
    border-radius: ${s.borderRadius};
  }
  .rbc-event-label {
    display: none;
  }
  .rbc-label {
    color: ${c.gray5};
  }
  .rbc-day-slot {
    border: none;
  }
`;

const pageTitle = "Status Board";
const censusResourceUrl = setApiUrl("omnicell/census/");
const kitDataResourceUrl = setApiUrl("statstock/");
const pendingTagResourceUrl = setApiUrl("statstock/pending/");
const populationsResourceUrl = setApiUrl("omnicell/populations/");
const stockoutResourceUrl = setApiUrl("omnicell/status/");
const watchlistResourceUrl = setApiUrl("omnicell/watchlist/");

const historicalCensus = [
  {
    date: "0",
    census: "76"
  },
  {
    date: "1",
    census: "55"
  },
  {
    date: "2",
    census: "55"
  },
  {
    date: "3",
    census: "65"
  },
  {
    date: "4",
    census: "61"
  },
  {
    date: "5",
    census: "80"
  },
  {
    date: "6",
    census: "83"
  },
  {
    date: "7",
    census: "80"
  },
  {
    date: "8",
    census: "72"
  },
  {
    date: "9",
    census: "70"
  },
  {
    date: "10",
    census: "77"
  },
  {
    date: "11",
    census: "74"
  },
  {
    date: "12",
    census: "80"
  },
  {
    date: "13",
    census: "84"
  },
  {
    date: "14",
    census: "90"
  },
  {
    date: "15",
    census: "84"
  },
  {
    date: "16",
    census: "85"
  },
  {
    date: "17",
    census: "82"
  },
  {
    date: "18",
    census: "88"
  },
  {
    date: "19",
    census: "98"
  },
  {
    date: "20",
    census: "100"
  },
  {
    date: "21",
    census: "97"
  },
  {
    date: "22",
    census: "94"
  },
  {
    date: "23",
    census: "92"
  },
  {
    date: "24",
    census: "86"
  },
  {
    date: "25",
    census: "98"
  },
  {
    date: "26",
    census: "104"
  },
  {
    date: "27",
    census: "111"
  },
  {
    date: "28",
    census: "113"
  },
  {
    date: "29",
    census: "101"
  },
  {
    date: "30",
    census: "95"
  },
  {
    date: "31",
    census: "96"
  },
  {
    date: "32",
    census: "101"
  }
];

function getHistoricalCensusData(data) {
  const historicalCensusData = data.map(function(row) {
    return row.census;
  });
  return historicalCensusData;
}

const historicalCensusData = getHistoricalCensusData(historicalCensus);

const sampleCensus = [
  { area: "EDBH", census: 1 },
  { area: "2E", census: 14 },
  { area: "2W", census: 13 },
  { area: "3W", census: 13 },
  { area: "NICU", census: 48 },
  { area: "PICU", census: 7 }
];

const samplePops = [
  { area: "NAS", census: 17 },
  { area: "TPN", census: 9 },
  { area: "DKA", census: 1 },
  { area: "CF", census: 4 },
  { area: "Chemo", census: 2 },
  { area: "Renal", census: 0 }
];

function CensusTable(props) {
  const data = props.data;
  return (
    <table>
      {data.map(function(row) {
        return (
          <tr>
            <td>{row.area}</td>
            <td>{row.census}</td>
          </tr>
        );
      })}
    </table>
  );
}

function getTotalCensus(sampleCensus) {
  let total = sampleCensus.reduce(function(prev, cur) {
    return prev + cur.census;
  }, 0);
  return total;
}

export default function StatusBoard() {
  const [censusModalIsOpen, setCensusModalIsOpen] = useState(false);
  // Fetch data
  const { data: censusData, error: censusDataError } = useSWR(
    censusResourceUrl
  );
  //const { data: kitData, error: kitDataError } = useSWR(kitDataResourceUrl);
  const { data: pendingTagData, error: pendingTagDataError } = useSWR(
    pendingTagResourceUrl
  );
  const { data: populationsData, error: populationsDataError } = useSWR(
    populationsResourceUrl
  );
  const { data: stockoutData, error: stockoutDataError } = useSWR(
    stockoutResourceUrl
  );
  const { data: watchlistData, error: watchlistDataError } = useSWR(
    watchlistResourceUrl
  );

  function toggleModal(e) {
    setCensusModalIsOpen(!censusModalIsOpen);
  }

  const columns = useMemo(
    () => [
      {
        Header: "Product",
        accessor: "rx_disp",
        Cell: ({ row }) => {
          let alias = undefined;
          if (row.original.item_name) {
            alias = row.original.item_name;
          }
          return (
            <>
              <p className="bold">{row.original.rx_disp}</p>
              <p className="light">{alias}</p>
            </>
          );
        }
      },
      {
        Header: <div style={{ textAlign: "center" }}>On Hand</div>,
        accessor: "qty_onhand",
        Cell: ({ row }) => {
          return (
            <span style={{ display: "flex", justifyContent: "center" }}>
              <Progress
                value={row.original.qty_onhand}
                max={row.original.qty_parlvl}
                warning={row.original.qty_min}
                danger={row.original.qty_alarm}
              ></Progress>
            </span>
          );
        }
      },
      {
        Header: (
          <div>
            7-day
            <br />
            Avg
          </div>
        ),
        accessor: "xactqty",
        width: 20,
        Cell: ({ value }) => {
          let xactqty = "-";
          if (value >= 0.5) {
            xactqty = value.toFixed(1);
          }
          return <div style={{ textAlign: "right" }}>{xactqty}</div>;
        }
      }
    ],
    []
  );

  const sampleColumns = useMemo(
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
  const sampleData = useMemo(
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

  //if (!kitData) return <Loading />;
  //if (!pendingTagData) return <Loading />;
  if (!(censusData && populationsData && stockoutData && watchlistData))
    return <LoadingPage />;

  return (
    <>
      {console.log(populationsData)}
      <Page pageTitle={pageTitle} heading={pageTitle}>
        <Row>
          <Column width={m.col9}>
            <Row justify="space-evenly">
              <Column>
                <Row justify="space-evenly">
                  <Column width={m.col6}>
                    <SparklineCard
                      heading="Census"
                      width={m.col12}
                      height={m.sp13}
                      padding={-1}
                      onClick={toggleModal}
                      sparklineData={historicalCensusData}
                      fill={c.primary8}
                      fillOpacity={1}
                    >
                      <Row align="center" margin="0 0 -10">
                        <h1
                          style={{
                            fontSize: m.sp11,
                            margin: `0 ${m.sp8}`,
                            color: c.primary5
                          }}
                        >
                          {getTotalCensus(sampleCensus)}
                        </h1>
                        <MiniTable data={censusData} />
                        <table>
                          <tr>
                            <td>CF</td>
                            <td>{populationsData[0]["cf"]}</td>
                          </tr>
                          <tr>
                            <td>DKA</td>
                            <td>{populationsData[0]["dka"]}</td>
                          </tr>
                          <tr>
                            <td>NAS</td>
                            <td>{populationsData[0]["nas"]}</td>
                          </tr>
                          <tr>
                            <td>TPN</td>
                            <td>{populationsData[0]["tpn"]}</td>
                          </tr>
                        </table>
                      </Row>
                    </SparklineCard>
                  </Column>
                  <Column width={m.col5}>
                    <SparklineCard
                      heading="Productivity"
                      width={m.col12}
                      height={m.sp13}
                      padding={-1}
                      onClick={toggleModal}
                      sparklineData={historicalCensusData}
                      fill={c.success5}
                      fillOpacity={1}
                    >
                      <Row width={m.col12} margin="0 0">
                        <Column align="flex-start">
                          <h4>Yesterday</h4>
                          <h1
                            style={{
                              fontSize: m.sp11,
                              margin: `0`,
                              color: c.success2
                            }}
                          >
                            1.4k
                          </h1>
                        </Column>
                        <CensusTable data={sampleCensus} />
                      </Row>
                    </SparklineCard>
                  </Column>
                </Row>
                <Row justify="space-evenly" padding={`0 ${m.sp5}`}>
                  <Column width={m.col4}>
                    <StatusCard
                      heading="Chemo"
                      className="success"
                      width={m.col11}
                      height={m.sp13}
                      margin={0}
                      kpiData={8}
                      kpiTitle="Today*"
                    >
                      <p>Tomorrow*</p>
                      <h2>7</h2>
                      <p>Inpatient*</p>
                      <h2>3</h2>
                    </StatusCard>
                  </Column>
                  <Column width={m.col4}>
                    <StatusCard
                      heading="IV Room"
                      height={m.sp13}
                      className="success"
                      width={m.col11}
                      kpiData={110}
                      kpiTitle="Daily Doses"
                    >
                      <Column justify="flex-start" height={m.col12}>
                        <p>TPN Orders</p>
                        <h2>{populationsData[0]["tpn"]}</h2>
                      </Column>
                    </StatusCard>
                  </Column>
                  <Column width={m.col4}>
                    <StatusCard
                      heading="Inventory"
                      className="success"
                      width={m.col11}
                      height={m.sp13}
                      kpiData={5}
                      kpiTitle="Expiring"
                    >
                      <p>Stock Outs</p>
                      <h2>{stockoutData[0]["stockout"]}</h2>
                      <p>Low*</p>
                      <h2>13</h2>
                      <p>Next Order</p>
                      <h2>33 / 2</h2>
                    </StatusCard>
                  </Column>
                </Row>
                <Row justify="space-evenly" padding={`0 ${m.sp5}`}>
                  <Column width={m.col4}>
                    <StatusCard
                      heading="Crash Carts"
                      className={pendingTagData == 0 ? "success" : "warning"}
                      width={m.col11}
                      height={m.sp13}
                      kpiData={pendingTagData}
                      kpiTitle="Pending Tags"
                    >
                      <Column justify="space-between" height={m.col12}>
                        <p>Next Kit Expiration</p>
                        <h2>4/26/21</h2>
                        <p>Next Cart Expiration</p>
                        <h2>2/15/21</h2>
                      </Column>
                    </StatusCard>
                  </Column>
                  <Column width={m.col4}>
                    <StatusCard
                      heading="Projects"
                      className="success"
                      width={m.col11}
                      height={m.sp13}
                      kpiData={16}
                      kpiTitle="In Progress"
                    ></StatusCard>
                  </Column>
                  <Column width={m.col4}>
                    <Card
                      heading="Inspections"
                      className="success"
                      width={m.col11}
                      height={m.sp13}
                    >
                      <Column justify="flex-start" height={m.col12}></Column>
                    </Card>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Column>
          <Column width={m.col3}>
            <Card heading="Chemo Timeline" width={m.col12} height={m.col12}>
              <StyledCalendar
                localizer={localizer}
                width={m.col12}
                view="day"
                views={"day"}
                events={events}
                startAccessor="start"
                endAccessor="end"
                tooltipAccessor={null}
                onSelectEvent={toggleModal}
                min={new Date(2008, 0, 1, 7, 0)}
                max={new Date(2008, 0, 1, 17, 0)}
                defaultDate={moment().toDate()}
                showMultiDayTimes
              />
            </Card>
          </Column>
        </Row>
        <Row>
          <Column width={m.col8}>
            <Table
              id="watchlistTable"
              columns={columns}
              data={watchlistData}
              heading="Watchlist"
              width={m.col12}
              actions=<PrintButton element="watchlistTable" />
            />
          </Column>
        </Row>
      </Page>
      <Modal isOpen={censusModalIsOpen} cancel={toggleModal} width={m.sp16} />
    </>
  );
}
