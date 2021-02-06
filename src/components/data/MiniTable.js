import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import Card from "components/containers/Card";
import Column from "components/containers/Column";

export default function MiniTable(props) {
  const data = props.data;
  return (
    <table>
      {data.map(function(row) {
        let rowArray = Object.values(row);
        return (
          <tr>
            <td>{rowArray[0]}</td>
            <td>{rowArray[1]}</td>
          </tr>
        );
      })}
    </table>
  );
}
