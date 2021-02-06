import Button from "components/input/Button";
import m from "styles/measures";

export default function EditButton(props) {
  return (
    <Button
      {...props}
      className="tertiary"
      height={m.sp8}
      width={m.sp8}
      margin="0"
    >
      <img src="/icons/pencil-fill.svg" height="20" width="20" />
    </Button>
  );
}
