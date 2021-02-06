import { useMemo } from "react";
import { DateTime } from "luxon";
import Page from "components/layout/Page";
import m from "styles/measures";
import c from "styles/color";
import Loading from "components/Loading";
import Table from "components/data/Table";
import Progress from "components/Progress";
import styled from "styled-components";
import useSWR from "swr";
import setApiUrl from "libs/setApiUrl";

export default function Omni() {
  const itemsResourceUrl = setApiUrl("omnicell/main/ETCPM");
  const { data: itemsData, error: itemsDataError } = useSWR(itemsResourceUrl);

  const columns = useMemo(
    () => [
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
      }
    ],
    []
  );

  if (itemsDataError) return <div>failed to load</div>;
  if (!itemsData) return <Loading />;

  return (
    <Page id="CPM">
      <Table columns={columns} data={itemsData} width={m.col12} />
    </Page>
  );
}
