import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { GET_USERS } from "../helpers/graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

export default function AdminTable(props) {
  const { data: dataU, error: errorU, loading: loadingU } = useQuery(GET_USERS);

  if (loadingU) return "Loading...";
  if (errorU) return `Error! ${errorU.message}`;

  return (
    <TableUsersStyle>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Birth Date </th>
            <th scope="col" width="25%">
              Mail
            </th>
            <th scope="col" width="16%">
              Cellphone
            </th>
            <th scope="col">Date Added</th>
          </tr>
        </thead>
        <tbody>
          {dataU.costumers.map((user) => (
            <tr>
              <td data-label="Name">{user.name}</td>
              <td data-label="Last Name">{user.lastName}</td>
              <td data-label="Birth Date">
                {moment(user.birthdate).format("DD-mm-yy")}
              </td>
              <td data-label="Mail">{user.mail}</td>
              <td data-label="Cellphone">{user.cellphone}</td>
              <td data-label="Date Added">
                {moment(user.createdAt).format("DD-mm-yy")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableUsersStyle>
  );
}
const TableUsersStyle = styled.nav`
display: flex;
flex-flow: column;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
height: auto;
width: 100%;
margin-top: 0;
  table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: fixed;
}
table tr {
  background-color: #fafafa;
  border: 1px solid #ddd;
  padding: .35em;
}
table th,
table td {
  padding: .5em;
  text-align: center;
  word-break: break-word;
  font-size: 15px;
}
table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #ff8600;
}

@media screen and (max-width: 734px) {
  table {
    border: 0;
    background-color: #fafafa;
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  table tr {
    border-bottom: 0.5px solid #ff8600;
    border-top: 0.5px solid #ff8600;
    display: block;
  }
  table td {
    border-bottom: 1px solid #fafafa;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: 300;
    text-transform: uppercase;
  }
  table td:last-child {
    border-bottom: 0;
  }
`;
