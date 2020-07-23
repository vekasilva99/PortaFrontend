import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { GET_ALL_ORDERS } from "../helpers/graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

export default function TableTrips(props) {
  const { data: dataU, error: errorU, loading: loadingU } = useQuery(
    GET_ALL_ORDERS
  );

  if (loadingU) return "Loading...";
  if (errorU) return `Error! ${errorU.message}`;

  return (
    <TableTripsStyle>
      <table>
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Driver</th>
            <th scope="col">Price</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {dataU.allOrders.map((order) => (
            <tr>
              <td data-label="User">
                {order.user.name} {order.user.lastName}
              </td>
              <td data-label="Driver">
                {order.repartidor
                  ? order.repartidor.name + " " + order.repartidor.lastName
                  : "N/A"}
              </td>
              <td data-label="Price">{order.price}</td>
              <td data-label="Date">
                {moment(order.createdAt).format("DD-mm-yy")}
              </td>
              <td data-label="Driver">
                {order.concluded ? "Completed" : "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableTripsStyle>
  );
}
const TableTripsStyle = styled.nav`
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
