import styled from "styled-components";
import Button from "components/input/Button";
import toPDF from "libs/toPDF";
import m from "styles/measures";

const StyledImg = styled.img.attrs(props => ({
  height: props.imgHeight ? props.imgHeight : "20",
  width: props.imgHeight ? props.imgHeight : "20"
}))``;

export default function PrintButton(props) {
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
