import PropTypes from "prop-types";
import styled from "styled-components";
import m from "styles/measures";
import c from "styles/color";

const StyledDiv = styled.div.attrs(props => ({
  id: props.id,
  className: "column"
}))`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${props => props.height};
  justify-content: ${props => props.justify || "flex-start"};
  align-items: ${props => props.align || "center"};
  padding: ${props => props.padding || 0};
  margin: ${props => props.margin || 0};
  @media (min-width: ${m.devMd}) {
    width: ${props => props.width};
  }
`;

const StyledH = styled.h3.attrs(props => ({
  id: `${props.id}Heading`,
  className: "columnHeading"
}))`
  font-weight: 600;
  margin: ${m.sp6} 0 ${m.sp4} 0;
  @media (min-width: ${m.devMd}) {
    align-self: flex-start;
  }
`;

function getColumnHeading(id, heading) {
  if (heading) {
    return <StyledH id={id}>{heading}</StyledH>;
  }
}

export default function Column(props) {
  return (
    <>
      <StyledDiv
        id={props.id}
        height={props.height}
        align={props.align}
        justify={props.justify}
        width={props.width}
      >
        {getColumnHeading(props.id, props.heading)}
        {props.children}
      </StyledDiv>
    </>
  );
}

Column.propTypes = {
  children: PropTypes.array,
  id: PropTypes.string,
  heading: PropTypes.string,
  height: PropTypes.string,
  justify: PropTypes.string,
  width: PropTypes.string
};
