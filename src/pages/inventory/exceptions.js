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
import XLSButton from "components/input/XLSButton";

export default function Exceptions() {
  const itemsResourceUrl = setApiUrl("omnicell/exceptions");
  const { data: itemsData, error: itemsDataError } = useSWR(itemsResourceUrl);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "item_id"
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
      }
    ],
    []
  );

  if (itemsDataError) return <div>failed to load</div>;
  if (!itemsData) return <Loading />;

  return (
    <Page id="Exceptions" pageTitle="Exceptions" heading="Exceptions">
      <Table
        id="exceptionsTable"
        columns={columns}
        data={itemsData}
        width={m.col12}
        heading=" "
        actions=<XLSButton table="exceptionsTable" />
      />
    </Page>
  );
}
