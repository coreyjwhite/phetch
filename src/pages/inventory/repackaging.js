import { useMemo } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Link from "next/link";
import CalculatorButton from "components/input/CalculatorButton";
import Card from "components/containers/Card";
import ControlLevel from "components/ControlLevel";
import Page from "components/layout/Page";
import PageHeader from "components/layout/PageHeader";
import Pill from "components/Pill";
import PrintButton from "components/input/PrintButton";
import Progress from "components/Progress";
import Row from "components/containers/Row";
import Table from "components/data/Table";
import useSWR from "swr";
import apiUrl from "libs/setApiUrl";

const StyledHeader = styled(PageHeader)`
  height: ${m.sp15};
  background: #053f6f;
  h1 {
    color: ${c.primary9};
  }
`;

const midazolam = ["MIDA3.75ML", "MIDA5ML", "MIDA7.5ML"];

export default function Repackaging() {
  const props = {
    id: "repackaging",
    pageTitle: "Repackaging",
    header: (
      <StyledHeader id="repackaging" className="Header">
        <h1>Repackaging</h1>
        <Row justify="flex-start">
          <Card>
            <Row align="center" justify="center" height={m.col12}>
              <h1
                style={{
                  fontSize: m.sp11,
                  margin: `0 ${m.sp8}`,
                  color: c.primary5,
                  textShadow: s.elev3
                }}
              >
                3
              </h1>
            </Row>
          </Card>
          <Card />
        </Row>
      </StyledHeader>
    )
  };
  const resourceUrl = apiUrl("omnicell/repackaging/");
  const columns = useMemo(
    () => [
      {
        Header: "Omni",
        accessor: "omni_stid",
        Cell: ({ value }) => {
          let omni_id = value.substring(2);
          let bg = c.primary6;
          let border = `2px solid ${c.primary6}`;
          let color = "white";
          if (omni_id == "CPM") {
            bg = "white";
            color = c.primary6;
          }
          return (
            <div style={{ textAlign: "center" }}>
              <Pill bg={bg} border={border} color={color}>
                <Link href={`/inventory/omnis/${value}`}>
                  <a>{omni_id}</a>
                </Link>
              </Pill>
            </div>
          );
        }
      },
      {
        Header: "C",
        accessor: "ctrl_lvl",
        Cell: ({ value }) => {
          return (
            <div style={{ textAlign: "center" }}>
              <ControlLevel ctrl_lvl={value} />
            </div>
          );
        }
      },
      {
        Header: "Disp",
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
      },
      {
        Header: (
          <div>
            Routine
            <br />
            Qty
          </div>
        ),
        accessor: "daily_doses",
        Cell: ({ value }) => {
          if (!value) {
            value = "-";
          }
          return <div style={{ textAlign: "right" }}>{value}</div>;
        }
      },
      {
        Header: <div style={{ textAlign: "center" }}>On Hand</div>,
        accessor: "onhandratio",
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
            Days <br />
            On Hand
          </div>
        ),
        accessor: "daysonhand",
        Cell: ({ value }) => {
          if (value) {
            value = value.toFixed(1);
          }
          if (value > 100) {
            value = "-";
          }
          if (value < 1) {
            value = 0;
          }
          return <div style={{ textAlign: "right" }}>{value}</div>;
        }
      },
      {
        Header: "Exp",
        accessor: "expiration",
        Cell: ({ value }) => {
          if (value) {
            return DateTime.fromISO(value).toFormat("L/d/yy");
          }
          return null;
        }
      },
      {
        id: "Button",
        Cell: ({ row }) => {
          if (midazolam.includes(row.original.item_id)) {
            return <CalculatorButton />;
          }
          return null;
        }
      }
    ],
    []
  );

  const { data, error } = useSWR(resourceUrl);

  return (
    <Page {...props} data={[data, error]}>
      <Table
        id="repackagingTable"
        columns={columns}
        data={data}
        heading="Inventory"
        width={m.col12}
        actions=<PrintButton element="repackagingTable" />
      />
    </Page>
  );
}
