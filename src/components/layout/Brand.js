import Link from "next/link";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledDiv = styled.div`
  display: none;
  align-self: center;
  @media (min-width: ${m.devMd}) {
    display: flex;
    margin: ${m.sp4};
  }
`;

const StyledImg = styled.img`
  height: ${m.sp9};
  width: ${m.sp9};
  filter: drop-shadow(0 2px 0.5px hsla(0, 0%, 0%, 0.4));
  margin-right: ${m.sp4};
`;

const StyledP = styled.p`
  align-self: center;
  margin: 0;
  font-size: ${m.sp7};
  font-weight: 600;
  color: ${c.primary8};
  filter: drop-shadow(0 2px 0.5px hsla(0, 0%, 0%, 0.4));
`;

export default function Brand() {
  return (
    <Link href="/">
      <a href="/">
        <StyledDiv>
          <StyledImg src="/ETCH_logo.png" />
          <StyledP>phetch</StyledP>
        </StyledDiv>
      </a>
    </Link>
  );
}
