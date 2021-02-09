import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Card from "components/containers/Card";
import Column from "components/containers/Column";
import Row from "components/containers/Row";

const StyledCard = styled(Card)`
  p {
    margin: 0;
  }
  h1 {
    margin: 0 ${m.sp8};
    font-size: ${m.sp10};
    &.success {
      color: ${c.success1};
    }
    &.danger {
      color: ${c.danger2};
    }
  }
  h2 {
    margin: 0 0 ${m.sp4};
  }
`;

export default function StatusCard(props) {
  return (
    <StyledCard {...props}>
      <Column height={m.col12} justify="center">
        <Row align="center" margin="0 ">
          <Column>
            <p style={{ margin: 0, fontSize: m.sp7 }}>{props.kpiTitle}</p>
            <h1>{props.kpiData}</h1>
          </Column>
          <Column>{props.children}</Column>
        </Row>
      </Column>
    </StyledCard>
  );
}
