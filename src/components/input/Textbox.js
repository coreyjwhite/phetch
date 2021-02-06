import PropTypes from "prop-types";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledTextInput = styled.input.attrs(props => ({
  className: "styledTextInput",
  type: "text"
}))`
  width: ${props => props.width};
  height: ${m.sp7};
  margin: ${props => props.margin || `${m.sp2} ${m.sp1} 0`};
  padding: 0 ${m.sp2} 0 ${props => props.left};
  border: none;
  box-shadow: 0 1px 0 ${c.gray6};
  border-radius: 0;
  outline: none;
  background: transparent;
  background-image: url(${props => props.img});
  background-position: 0;
  background-repeat: no-repeat;
  background-size: ${m.sp4};
  font-size: ${m.sp6};
  caret-color: ${props => props.caret || c.gray5};
  &:focus {
    box-shadow: 0 2px 0 ${c.primary5};
  }
`;

export default function Textbox(props) {
  return <StyledTextInput {...props} ref={props.inputRef} />;
}

Textbox.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string,
  inputRef: PropTypes.func,
  left: PropTypes.string,
  width: PropTypes.string
};
