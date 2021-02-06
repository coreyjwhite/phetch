import { DateTime } from "luxon";
import c from "styles/color";
import Loading from "components/Loading";
import Page from "components/layout/Page";
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryZoomContainer
} from "victory";
import apiUrl from "libs/setApiUrl";
import useSWR from "swr";

const transactionResourceUrl = apiUrl("meditech/transaction/");

export default function Dispensed() {
  const { data, error } = useSWR(transactionResourceUrl);

  if (!data || error) return <Loading />;

  return (
    <Page id="transactions" heading="Transactions" pageTitle="Transactions">
      <VictoryChart
        domainPadding={10}
        scale={{ x: "time" }}
        containerComponent={<VictoryZoomContainer />}
        animate={{
          duration: 500,
          onLoad: { duration: 200 }
        }}
        width={1000}
        height={600}
      >
        <VictoryBar
          style={{ data: { fill: c.primary5 } }}
          barWidth={6}
          data={data}
          x="date"
          y="total_doses"
        />
        <VictoryAxis
          tickCount={12}
          tickFormat={date => DateTime.fromISO(date).toFormat("LL/dd")}
          label="Date"
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 10, padding: 30 },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 8, padding: 5, angle: -30 }
          }}
        />
        <VictoryAxis
          dependentAxis
          label="Total # of Doses"
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 10, padding: 30 },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 8, padding: 5, angle: -30 }
          }}
        />
      </VictoryChart>
    </Page>
  );
}
