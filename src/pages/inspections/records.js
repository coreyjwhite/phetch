import { useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import setApiUrl from "libs/setApiUrl";
import { create, update, del } from "libs/crud";
import m from "styles/measures";
import Button from "components/input/Button";
import EditButton from "components/input/EditButton";
import Loading from "components/Loading";
import Page from "components/layout/Page";
import Row from "components/containers/Row";
import Table from "components/data/Table";
import Textarea from "components/input/Textarea";

const pageTitle = "Inspection Records";
const recordsResourceUrl = setApiUrl("inspections/records/");

export default function Records() {
  // Fetch data
  const { data: recordData, error, mutate, isValidating } = useSWR(
    recordsResourceUrl
  );

  const columns = useMemo(
    () => [
      {
        Header: "Location",
        accessor: "location_description",
        Cell({ value }) {
          return <div style={{ width: "500px" }}>{value}</div>;
        }
      },
      {
        Header: "Last Update",
        accessor: "last_updated",
        Cell({ value }) {
          return <div style={{ width: "500px" }}>{value}</div>;
        }
      },
      {
        Header: "Link",
        Cell({ row }) {
          return (
            <Link href={`/inspections/records/${row.original.id}`}>
              <Button>Link</Button>
            </Link>
          );
        }
      }
    ],
    []
  );

  if (error) return <div>failed to load</div>;
  if (!recordData) return <Loading />;

  return (
    <Page
      id="inspectionRecords"
      heading={pageTitle}
      pageTitle={pageTitle}
      width={m.devLg}
      align="center"
      actions=<Link href="/inspections/new-record">
        <Button onClick={""} width={m.sp8} style={{ fontWeight: 600 }}>
          +
        </Button>
      </Link>
    >
      <Table
        id="recordsTable"
        columns={columns}
        data={recordData}
        width={m.col12}
      />
    </Page>
  );
}
