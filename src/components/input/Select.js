import PropTypes from "prop-types";
import styled from "styled-components";
import Select from "react-select";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledSelect = styled(Select)`
  .react-select__control {
    border: ${s.inactiveBorder};
    border-radius: ${s.borderRadius};
  }
`;

function getOptions(data, value, label) {
  const options = [];
  data.forEach(function(row) {
    console.log(row[value]);
    options.push({ value: row[value], label: row[label] });
  });
  return options;
}

export default function CustomSelect(props) {
  return (
    <StyledSelect
      classNamePrefix="react-select"
      ref={props.inputRef}
      options={getOptions(props.data, props.value, props.label)}
      {...props}
    />
  );
}
