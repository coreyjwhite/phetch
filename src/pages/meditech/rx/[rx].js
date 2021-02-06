import { useMemo } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import Card from "components/containers/Card";
import Page from "components/layout/Page";
import m from "styles/measures";
import c from "styles/color";
import PageHeader from "components/layout/PageHeader";
import Pill from "components/Pill";
import Table from "components/data/Table";
import Progress from "components/Progress";
import styled from "styled-components";
import useSWR from "swr";
import graphqlFetcher from "libs/fetch";

const StyledHeader = styled(PageHeader)`
  height: ${m.sp13};
  background: white;
  display: flex;
  flex-flow: column nowrap;
`;

function getTotals(data, key) {
  let total = 0;
  data.forEach(edges => {
    total += edges.node[key];
  });
  return total;
}

function getCount(data, key) {
  let total = 0;
  data.forEach(edges => {
    total += 1;
  });
  return total;
}

export default function Rx() {
  const router = useRouter();
  const { rx } = router.query;
  const tableId = `${rx}Table`;

  const { data, error } = useSWR(
    `{
        GetDoseTransactions(rxNum: "${rx}"){
          edges {
            node {
              date
              mnemonic
              txType
              inventory
              doses
              rx
            }
          }
        }
        GetMarAdministrations(rxNum: "${rx}"){
          edges{
            node{
              adminTime
              account
              mnemonic
              dose
              units
            }
          }
        }
      }`,
    graphqlFetcher
  );

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "node.date"
      },
      {
        Header: "Doses",
        accessor: "node.doses"
      },
      {
        Header: "Type",
        accessor: "node.txType"
      },
      {
        Header: "Inventory",
        accessor: "node.inventory"
      }
    ],
    []
  );

  const columns2 = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "node.adminTime",
        Cell: ({ value }) => {
          return (
            <>
              <p>{moment(value).format("MM/DD/YY")}</p>
              <p>{moment(value).format("HH:mm")}</p>
            </>
          );
        }
      },
      {
        Header: "Account",
        accessor: "node.account"
      },
      {
        Header: "Dose",
        accessor: "node.dose"
      },
      {
        Header: "Units",
        accessor: "node.units"
      }
    ],
    []
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const sum = getTotals(data.GetDoseTransactions.edges, "doses");
  const admins = getCount(data.GetMarAdministrations.edges, "doses");
  const props = {
    id: rx,
    pageTitle: rx,
    header: (
      <StyledHeader id="styles" className="Header">
        <>
          <h1>{data.GetMarAdministrations.edges[0].node.account}</h1>
          <p>
            Item: {data.GetDoseTransactions.edges[0].node.mnemonic}Product:{" "}
            {data.GetDoseTransactions.edges[0].node.rx}
          </p>
          <p>Account: {data.GetMarAdministrations.edges[0].node.account}</p>
          <p>Rx: {rx}</p>
          <p>Total: {sum}</p>
          <p>Admins: {admins}</p>
        </>
      </StyledHeader>
    )
  };
  return (
    <Page {...props}>
      <Table
        heading="Transactions"
        columns={columns}
        data={data.GetDoseTransactions.edges}
      />
      <Table
        heading="Administrations"
        columns={columns2}
        data={data.GetMarAdministrations.edges}
      />
    </Page>
  );
}
