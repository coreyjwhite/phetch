import PropTypes from "prop-types";
import styled from "styled-components";
import m from "styles/measures";
import s from "styles/styles";

const StyledDiv = styled.div.attrs(props => ({
  id: `${props.id}PageHeader`
}))`
  display: flex;
  flex-flow: column nowrap;
  width: calc(100vw - ${m.sp13} - ${m.sp6});
  padding: ${m.sp6};
  z-index: 700;
  box-shadow: ${s.elev3};
`;

export default function PageHeader(props) {
  return (
    <StyledDiv id={props.id} className={props.className}>
      {props.children}
    </StyledDiv>
  );
}

PageHeader.propTypes = {
  id: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string
};
