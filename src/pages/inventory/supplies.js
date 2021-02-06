import { useMemo } from "react";
import useSWR from "swr";
import setApiUrl from "libs/setApiUrl";
import m from "styles/measures";
import Button from "components/input/Button";
import AddButton from "components/input/AddButton";
import Page from "components/layout/Page";
import Table from "components/data/Table";
import XLSButton from "components/input/XLSButton";

const props = {
  id: "supplies",
  pageTitle: "Supplies"
};

export default function Home() {
  const { data: suppliesData } = useSWR(setApiUrl("inventory/supplies/"));

  const suppliesColumns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell({ value }) {
          return <div style={{ width: "500px" }}>{value}</div>;
        }
      }
    ],
    []
  );

  if (!suppliesData) return <div>Loading</div>;

  return (
    <Page {...props} heading="Index">
      <Table
        id="criteriaTable2"
        columns={suppliesColumns}
        data={suppliesData}
        heading="heading"
        width={m.col6}
        actions={
          <>
            <XLSButton table="criteriaTable2" /> <AddButton />
          </>
        }
      />
    </Page>
  );
}
