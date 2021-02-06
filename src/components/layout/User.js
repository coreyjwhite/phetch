import PropTypes from "prop-types";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: white;
  position: absolute;
  bottom: 0;
  align-self: center;
  a {
    color: gray;
  }
`;

export default function User(props) {
  return (
    <StyledDiv>
      {props.children}
      <a href="/">Logout</a>
    </StyledDiv>
  );
}
