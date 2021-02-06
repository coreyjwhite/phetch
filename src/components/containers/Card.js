import PropTypes from "prop-types";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledDiv = styled.div.attrs(props => ({
  id: `${props.id}Card`,
  className: "card"
}))`
  display: flex;
  flex-flow: row wrap;
  width: ${m.col12};
  justify-content: ${props => props.justify || "center"};
  align-items: ${props => props.align || "flex-start"};
  height: ${props => props.height || "fit-content"};
  min-height: ${m.sp13};
  margin: ${props => props.margin || `${m.sp4} 0`};
  padding: ${props => props.padding || m.sp3};
  border-radius: ${s.borderRadius};
  box-shadow: ${s.elev3};
  background: ${props => props.bg || "#FFF"};
  cursor: ${props => (props.onClick ? "pointer" : "default")};
  &.success {
    border-left: ${m.sp3} solid ${c.success4};
  }
  &.warning {
    border-left: ${m.sp3} solid ${c.warning3};
  }
  &.danger {
    border-left: ${m.sp3} solid ${c.danger4};
  }
  @media (min-width: ${m.devMd}) {
    width: ${props => props.width || m.sp14};
    margin: ${m.sp4} ${m.sp4} ${m.sp7};
  }
`;

const StyledH = styled.div.attrs(props => ({
  id: `${props.id}CardHeading`,
  className: "cardHeading"
}))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${props => props.width || m.col12};
  h3 {
    margin: 0;
    font-weight: 600;
  }
  button {
    width: ${m.sp7};
    height: ${m.sp7};
    padding: ${m.sp3};
    font-weight: 600;
  }
  @media (min-width: ${m.devMd}) {
    margin: 0 ${m.sp4} 0;
  }
`;

function getCardHeading(props) {
  if (props.heading || props.actions) {
    return (
      <StyledH {...props}>
        <h3>{props.heading}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          {props.actions}
        </div>
      </StyledH>
    );
  }
}

export default function Card(props) {
  return (
    <>
      {getCardHeading({ ...props })}
      <StyledDiv {...props}>{props.children}</StyledDiv>
    </>
  );
}

Card.propTypes = {
  children: PropTypes.object,
  id: PropTypes.string,
  className: PropTypes.string,
  align: PropTypes.string,
  bg: PropTypes.string,
  heading: PropTypes.string,
  height: PropTypes.string,
  justify: PropTypes.string,
  width: PropTypes.string
};
