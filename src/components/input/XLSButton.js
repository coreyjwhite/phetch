import styled from "styled-components";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Button from "components/input/Button";

const StyledReactHTMLTableToExcel = styled(ReactHTMLTableToExcel).attrs(
  props => ({
    id: props.id,
    className: "styledButton"
  })
)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width || m.sp7};
  height: ${props => props.height || m.sp7};
  border: none;
  border-radius: ${s.borderRadius};
  cursor: pointer;
`;

export default function XLSButton(props) {
  return (
    <StyledReactHTMLTableToExcel
      {...props}
      id="test-table-xls-button"
      table={props.table}
      filename={props.table}
      sheet={props.table}
      buttonText=<img src="/icons/file-excel-line.svg" height="20" width="20" />
    />
  );
}
