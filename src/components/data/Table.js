import { useFlexLayout, useSortBy, useTable } from "react-table";
import styled from "styled-components";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";
import Card from "components/containers/Card";

const StyledCard = styled(Card).attrs(props => ({
  id: props.id
}))`
  padding: 0.4rem 0.5rem;
  overflow: hidden;
  font-size: 0.875rem;
  max-width: ${m.col12};
  width: ${props => props.width || "fit-content"};
  height: fit-content;
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    max-width: 100%;
    width: 100%;
    display: block;
  }
  td,
  th {
    text-align: left;
    margin-left: ${m.sp8};
    margin-bottom: 2rem;
  }
  th {
    text-transform: uppercase;
    font-weight: 300;
    color: ${c.gray4};
    padding: ${m.sp5} ${m.sp6};
    border-bottom: 1px solid ${c.gray8};
  }
  td {
    padding: ${m.sp4} ${m.sp6};
    font-size: ${m.sp6};
    border-top: 1px solid ${c.gray8};
  }
  p {
    margin: ${m.sp2} 0;
    font-weight: 400;
    color: ${c.gray1};
    .light {
      font-weight: 200;
      color: ${c.gray6};
    }
  }
  tr:active {
    background-color: ${props => (props.onRowClick ? c.primary5 : "white")};
    td {
      color: ${props => (props.onRowClick ? c.primary9 : c.gray1)};
    }
  }
  tr {
    cursor: ${props => (props.onRowClick ? "pointer" : null)};
  }
  .right {
    text-align: right;
  }
  .light {
    color: ${c.gray6};
  }
`;

export default function Table(props) {
  const columns = props.columns;
  const data = props.data;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      sortTypes: {
        alphanumeric: (row1, row2, columnName) => {
          const rowOneColumn = row1.values[columnName];
          const rowTwoColumn = row2.values[columnName];
          if (isNaN(rowOneColumn)) {
            return rowOneColumn.toUpperCase() > rowTwoColumn.toUpperCase()
              ? 1
              : -1;
          }
          return Number(rowOneColumn) > Number(rowTwoColumn) ? 1 : -1;
        }
      }
    },
    useSortBy
  );
  return (
    <StyledCard {...props}>
      <table {...getTableProps()} id={props.id} className="table">
        <thead id={props.id + "Header"}>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} id={props.id + "Body"}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() =>
                  props.onRowClick ? props.onRowClick(row.original) : null
                }
              >
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </StyledCard>
  );
}
