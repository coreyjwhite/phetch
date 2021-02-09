/**
 * @example
  <Select
    name="department_id"
    defaultValue={fields.department_id}
    inputRef={register}
    data={departmentsData}
    valueField="id"
    labelField="description"
  />
 */
import PropTypes from "prop-types";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

const StyledDiv = styled.div`
  width: 100%;
  border: ${s.inactiveBorder};
  border-radius: ${s.borderRadius};
  padding: 0;
  display: flex;
  cursor: pointer;
  select {
    appearance: none;
    outline: none;
    background-color: transparent;
    border: none;
    padding: ${m.sp3} ${m.sp4};
    margin: 0 calc(-2 * ${m.sp5}) 0 0;
    width: 100%;
    cursor: pointer;
  }
  &&::after {
    content: "";
    width: ${m.sp5};
    height: ${m.sp4};
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    background-color: ${c.primary5};
    justify-self: end;
    align-self: center;
    margin-right: ${m.sp5};
  }
`;

export default function Select(props) {
  return (
    <StyledDiv>
      <select
        ref={props.inputRef}
        name={props.name}
        defaultValue={props.defaultValue}
      >
        <option />
        {props.data.map(function(row) {
          return (
            <option key={row[props.valueField]} value={row[props.valueField]}>
              {row[props.labelField]}
            </option>
          );
        })}
      </select>
    </StyledDiv>
  );
}

Select.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueField: PropTypes.number,
  labelField: PropTypes.string
};
