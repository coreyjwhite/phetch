import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import m from "styles/measures";
import NavigationAccordion from "components/layout/NavigationAccordion";
import Sidenav from "components/layout/Sidenav";

const StyledDiv = styled.div.attrs({
  id: "layoutContainer"
})`
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
`;

const StyledButton = styled.button.attrs({
  id: "sidenavToggleButton",
  className: "sidenavToggleButton"
})`
  position: fixed;
  bottom: 0;
  width: ${m.sp10};
  height: ${m.sp10};
  padding: 0;
  border: none;
  background: transparent;
  @media (min-width: ${m.devMd}) {
    display: none;
  }
`;

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <StyledDiv>
      <Sidenav open={open}>
        <NavigationAccordion open={open} />
        <StyledButton onClick={() => setOpen(!open)}>
          <img src="/icons/menu-line.svg" />
        </StyledButton>
      </Sidenav>
      {children}
    </StyledDiv>
  );
}

Layout.propTypes = {
  children: PropTypes.object
};
