import PropTypes from "prop-types";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Brand from "components/layout/Brand";
import Textbox from "components/input/Textbox";
import User from "components/layout/User";

const StyledTextbox = styled(Textbox)`
  width: 85%;
  margin: ${m.sp5} 0;
  background-image: url("/icons/search-line.svg");
  background-size: ${m.sp5};
  text-indent: ${m.sp6};
  color: ${c.primary8};
  align-self: flex-end;
  &::placeholder {
    color: white;
  }
  &:focus {
    box-shadow: 0 2px 0 ${c.primary6};
  }
  @media (min-width: ${m.devMd}) {
    width: 100%;
    margin: ${m.sp7} 0;
  }
`;

const StyledDiv = styled.div.attrs({
  id: "sidenav",
  className: "sidenav"
})`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  transition: 0.2s;
  z-index: 1000;
  width: 100vw;
  height: ${props => (props.open ? "50vh" : m.sp10)};
  box-shadow: ${s.elev4};
  background: ${c.primary5};
  padding: ${m.sp6};
  overflow: hidden;
  @media (min-width: ${m.devMd}) {
    width: ${m.sp13};
    height: 100%;
    border: none;
  }
`;

export default function Sidenav(props) {
  return (
    <StyledDiv open={props.open}>
      <StyledTextbox placeholder="search..." width={m.col9} caret="white" />
      {props.children}
    </StyledDiv>
  );
}

Sidenav.propTypes = {
  children: PropTypes.array,
  open: PropTypes.bool
};
