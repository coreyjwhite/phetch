import PropTypes from "prop-types";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";

const HiddenSelect = styled.select.attrs({ className: "hiddenSelect" })``;

const StyledSelect = styled.select.attrs(props => ({
  className: "styledSelect",
  id: props.id
}))`
  width: ${props => props.width || m.col12};
  height: ${props => props.height || "fit-content"};
  &.option {
    color: green;
    background: blue;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export default function Select(props) {
  return <StyledSelect {...props}>{props.children}</StyledSelect>;
}

Select.propTypes = {
  id: PropTypes.string,
  children: PropTypes.object
};
