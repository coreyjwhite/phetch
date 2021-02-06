import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import { Sparklines, SparklinesCurve } from "react-sparklines";
import Card from "components/containers/Card";
import Column from "components/containers/Column";

export default function SparklineCard(props) {
  return (
    <Card {...props} style={{ overflow: "hidden" }}>
      <Column height={"105%"} justify="center">
        <Sparklines
          className={props.className}
          data={props.sparklineData}
          style={{ width: "102%", height: "110%" }}
          min={0}
        >
          <SparklinesCurve
            style={{
              stroke: "none",
              fill: props.fill,
              fillOpacity: props.fillOpacity
            }}
          />
        </Sparklines>
        <div style={{ position: "absolute" }}>{props.children}</div>
      </Column>
    </Card>
  );
}
