import PropTypes from "prop-types";
import styled from "styled-components";
import c from "styles/color";
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
  && button {
    color: ${c.gray2};
    display: inline-block;
    align-self: flex-end;
    padding: 0;
  }
  .buttonGroup {
    display: flex;
    margin-left: auto;
    align-items: center;
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
      <div className="buttonGroup">{props.actions}</div>
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
