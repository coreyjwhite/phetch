import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Column from "components/containers/Column";
import Row from "components/containers/Row";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: ${m.sp5};
  font-weight: 600;
  color: ${c.gray6};
`;

const StyledDiv = styled.div`
  position: relative;
  min-width: 7rem;
  background-color: ${c.gray8};
  height: 1.2rem;
  border-radius: ${s.borderRadius};
  margin: ${m.sp3};
  cursor: default;
  &:before {
    content: attr(data-value);
    font-weight: 400;
    font-size: 0.92rem;
    position: absolute;
    text-align: center;
    color: white;
    top: 1px;
    left: 0;
    right: 0;
  }
`;

const StyledSpan = styled.span.attrs(props => ({}))`
  display: inline-block;
  width: ${props =>
    props.value <= props.max ? (props.value / props.max) * 100 : 100}%;
  height: 100%;
  background-color: ${c.success3};
  border-radius: ${s.borderRadius};
  overflow: visible;
  &.warning {
    background-color: ${c.warning3};
  }
  &.danger {
    background-color: ${c.danger3};
  }
  &.supergreen {
    border-right: 3px solid ${c.success2};
  }
`;

export default function Progress(props) {
  let status = "success";
  if (props.value < props.danger) {
    status = "danger";
  } else if (props.value < props.warning) {
    status = "warning";
  } else if (props.value > props.max) {
    status = "supergreen";
  }
  return (
    <div
      style={{
        fontSize: m.sp5,
        fontWeight: 600,
        color: c.gray6,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <StyledContainer>
        {props.min || "0"}
        <StyledDiv data-value={props.value}>
          <StyledSpan className={status} {...props}></StyledSpan>
        </StyledDiv>
        {props.max}
      </StyledContainer>
      <Row>
        <Column
          width={`${(props.danger / props.max) * 100}%`}
          justify="flex-end"
        >
          {props.danger == (props.min || "0") ? "" : props.danger}
        </Column>
        <Column
          width={`${100 - (props.warning / props.max) * 100}%`}
          justify="flex-start"
        >
          {props.warning == (props.danger || "0") ? "" : props.warning}
        </Column>
      </Row>
    </div>
  );
}
