import PropTypes from "prop-types";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledDiv = styled.div.attrs(props => ({
  id: `${props.id}ContentContainer`,
  className: "contentContainer"
}))`
  display: flex;
  flex-flow: row wrap;
  align-self: flex-start;
  padding: ${m.sp3};
  border-radius: ${s.borderRadius};
  margin-top: -10px;
  z-index: 900;
  @media (min-width: ${m.devMd}) {
    width: 100%;
    height: 100%;
    align-items: ${props => props.align || "flex-start"};
    padding: ${m.sp4};
  }
`;

export default function Content(props) {
  return <StyledDiv {...props}>{props.children}</StyledDiv>;
}

Content.propTypes = {
  children: PropTypes.array,
  id: PropTypes.string
};
