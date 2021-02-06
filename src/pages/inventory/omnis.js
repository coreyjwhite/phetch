import { useMemo } from "react";
import Link from "next/link";
import m from "styles/measures";
import Loading from "components/Loading";
import Page from "components/layout/Page";
import Pill from "components/Pill";
import Table from "components/data/Table";
import useSWR from "swr";
import apiUrl from "libs/setApiUrl";

export default function Omnis() {
  const resourceUrl = apiUrl("omnicell/omnis/");
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "omni_stid",
        Cell: ({ value }) => (
          <Link href={`/inventory/omnis/${value}`}>
            <a>{value}</a>
          </Link>
        )
      },
      {
        Header: "Name",
        accessor: "omni_name"
      },
      {
        Header: "Area",
        accessor: "area"
      },
      {
        Header: "Status",
        accessor: "omni_stat",
        Cell: ({ value }) =>
          value == "U" ? (
            <Pill className="success">{value}</Pill>
          ) : (
            <Pill className="danger">{value}</Pill>
          )
      },
      {
        Header: "IP",
        accessor: "comm_ip"
      }
    ],
    []
  );

  const { data, error } = useSWR(resourceUrl);

  if (!data || error) return <Loading />;

  return (
    <Page id="Omnis" heading="Omnis">
      <Table id="omnisTable" columns={columns} data={data} />
    </Page>
  );
}
