import styled from "styled-components";
import Button from "components/input/Button";
import toPDF from "libs/toPDF";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import m from "styles/measures";

const StyledImg = styled.img.attrs(props => ({
  height: props.imgHeight ? props.imgHeight : "20",
  width: props.imgHeight ? props.imgHeight : "20"
}))``;

const StyledButton = styled(Button)`
  &.tertiary {
    text-decoration: none;
    font-size: 1.7rem;
    font-weight: 400;
    margin: 0;
  }
`;

function handleClick(action, target = null) {
  if (action == "print") {
    return toPDF(target);
  }
}

export default function ActionButton(props) {
  return (
    <Button
      {...props}
      height={m.sp8}
      width={m.sp8}
      margin="0"
      className="tertiary"
      onClick={() => toPDF(props.element, props.output)}
    >
      <StyledImg src="/icons/printer-line.svg" imgHeight={props.imgHeight} />
    </Button>
  );
}
