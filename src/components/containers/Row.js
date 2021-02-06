import PropTypes from "prop-types";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";

const StyledDiv = styled.div.attrs(props => ({
  id: props.id,
  className: "row"
}))`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: ${props => props.height || "fit-content"};
  justify-content: ${props => props.justify || "space-around"};
  align-items: ${props => props.align || "space-around"};
  padding: ${props => props.padding || "0"};
  margin: ${props => props.margin || "0"};
  @media (min-width: ${m.devMd}) {
    width: ${props => props.width || "100%"};
    flex-flow: row nowrap;
  }
`;

const StyledH = styled.h3.attrs(props => ({
  id: `${props.id}Heading`,
  className: "rowHeading"
}))`
  font-weight: 400;
  margin: ${m.sp6} 0 ${m.sp4} ${m.sp4};
  @media (min-width: ${m.devMd}) {
    align-self: flex-start;
  }
`;

function getRowHeading(id, heading) {
  if (heading) {
    return <StyledH id={id}>{heading}</StyledH>;
  }
}

export default function Row(props) {
  return (
    <>
      {getRowHeading(props.id, props.heading)}
      <StyledDiv {...props}>{props.children}</StyledDiv>
    </>
  );
}

Row.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  id: PropTypes.string,
  align: PropTypes.string,
  heading: PropTypes.string,
  height: PropTypes.string,
  justify: PropTypes.string
};
