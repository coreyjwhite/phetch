import Button from "components/input/Button";
import m from "styles/measures";

export default function DeleteButton(props) {
  return (
    <Button
      onClick={props.onClick}
      className="tertiary"
      height={m.sp8}
      width={m.sp8}
      margin="0"
    >
      <img src="/icons/delete-bin-line.svg" height="20" width="20" />
    </Button>
  );
}
