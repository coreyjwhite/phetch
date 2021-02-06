import Button from "components/input/Button";
import m from "styles/measures";

export default function CalculatorButton(props) {
  return (
    <Button
      {...props}
      className="tertiary"
      height={m.sp8}
      width={m.sp8}
      margin="0"
    >
      <img src="/icons/calculator-line.svg" height="20" width="20" />
    </Button>
  );
}
