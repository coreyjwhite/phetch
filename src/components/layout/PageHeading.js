import PropTypes from "prop-types";
import styled from "styled-components";
import m from "styles/measures";
import Button from "components/input/Button";

const StyledDiv = styled.div.attrs(props => ({
  id: `${props.id}PageHeading`,
  className: "pageHeading"
}))`
  display: flex;
  width: 100%;
  h1 {
    margin: ${m.sp6} ${m.sp9} ${m.sp4} 0;
    font-weight: 600;
    display: inline-block;
  }
  button {
    display: inline-block;
    align-self: center;
    margin-left: auto;
    height: ${m.sp8};
    padding: ${m.sp3};
  }
  @media (min-width: ${m.devMd}) {
    margin: 0 ${m.sp4};
    justify-self: flex-start;
  }
`;

export default function PageHeading(props) {
  return (
    <StyledDiv id={props.id}>
      <h1>{props.heading}</h1>
      {props.actions}
    </StyledDiv>
  );
}

PageHeading.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.instanceOf(Button)
  ]),
  heading: PropTypes.string,
  id: PropTypes.string
};
