import { useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import { NavigationTree } from "components/NavigationTree";

const StyledDiv = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  width: ${m.col12};
  overflow: hidden;
  transition: 0.2s;
  background-color: inherit;
  a {
    color: ${c.primary8};
    transition: 0.2s;
    overflow: hidden;
  }
`;

const StyledButton = styled.button.attrs({})`
  display: ${props => (props.visible ? "inline" : "none")};
  background-color: inherit;
  cursor: pointer;
  padding: 0;
  margin: ${m.sp4} 0;
  width: 100%;
  text-align: left;
  font-weight: 600;
  border: none;
  outline: none;
  @media (min-width: ${m.devMd}) {
    display: inline;
  }
  &:hover a {
    color: ${c.primary6};
    transition: 0s;
  }
`;

const StyledA = styled.a.attrs(props => ({
  className: "styledA",
  href: props.href
}))`
  padding-left: ${m.sp7};
  padding-top: ${props => (props.open === props.group ? m.sp3 : "0px")};
  height: ${props => (props.open === props.group ? m.sp7 : "0px")};
  &:hover {
    color: ${c.primary6};
  }
`;

export default function NavigationAccordion(props) {
  const [open, setOpen] = useState("");

  return (
    <StyledDiv open={open}>
      {NavigationTree.map(([key, links]) => (
        <>
          <StyledButton onClick={() => setOpen(open === key ? "" : key)}>
            <a>{key}</a>
          </StyledButton>
          {links.map(([title, href]) => (
            <Link href={href}>
              <StyledA href={href} open={open} group={key}>
                {title}
              </StyledA>
            </Link>
          ))}
        </>
      ))}
    </StyledDiv>
  );
}
