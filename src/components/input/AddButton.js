import Button from "components/input/Button";
import c from "styles/color";
import m from "styles/measures";
import styled from "styled-components";

const StyledButton = styled(Button)`
  &.tertiary {
    text-decoration: none;
    font-size: 1.7rem;
    font-weight: 400;
    color: ${props => props.color || c.gray4};
    margin: 0;
  }
`;

export default function AddButton(props) {
  return (
    <StyledButton
      {...props}
      className="tertiary"
      height={m.sp8}
      width={m.sp8}
      text="+"
    />
  );
}
