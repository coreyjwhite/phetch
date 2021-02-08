import PropTypes from "prop-types";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledButton = styled.button.attrs(props => ({
  id: props.id,
  className: "styledButton"
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width || m.sp11};
  height: ${props => props.height || m.sp9};
  border-style: none;
  border-radius: ${s.borderRadius};
  padding: ${props => props.padding || m.sp5};
  margin: ${props => props.margin || m.sp3};
  background: ${props => props.bg || c.primary5};
  color: white;
  font-size: ${props => props.fontSize || m.sp6};
  font-weight: 400;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  &:active {
    background: ${c.primary3};
  }
  &.secondary {
    background: ${c.gray8};
    color: ${c.gray1};
  }
  &.secondary.warning {
    background: ${c.danger5};
    color: ${c.danger3};
  }
  &.secondary:active {
    background: ${c.gray7};
  }
  &.tertiary {
    background: transparent;
    color: ${props => props.color || c.gray1};
    text-decoration: underline;
  }
  &.delete {
    color: ${c.danger3};
    background: ${c.danger5};
  }
  &.delete:active {
    color: white;
    background: ${c.danger3};
  }
`;

export default function Button(props) {
  return (
    <StyledButton {...props}>
      {props.text}
      {props.children}
    </StyledButton>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  bg: PropTypes.string,
  bgHover: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
};
