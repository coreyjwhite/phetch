import Button from "components/input/Button";
import toPDF from "libs/toPDF";
import m from "styles/measures";

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
      <img src="/icons/printer-line.svg" height="20" width="20" />
    </Button>
  );
}
