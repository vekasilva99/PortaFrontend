import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { GET_REPARTIDORES } from "../helpers/graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { Button } from "antd";

export default function AdminTable(props) {
  const { data: dataU, error: errorU, loading: loadingU } = useQuery(
    GET_REPARTIDORES
  );

  if (loadingU) return "Loading...";
  if (errorU) return `Error! ${errorU.message}`;

  return (
    <TableDriversStyle>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last Name</th>
            <th scope="col" width="35%">
              Mail
            </th>
            <th scope="col" width="16%">
              Cellphone
            </th>
            <th scope="col">Date Hired</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {dataU.drivers.map((user) => (
            <tr>
              <td data-label="Name">{user.name}</td>
              <td data-label="Last Name">{user.lastName}</td>
              <td data-label="Mail">{user.mail}</td>
              <td data-label="Cellphone">{user.cellphone}</td>
              <td data-label="Date Hired">
                {moment(user.createdAt).format("DD-mm-yy")}
              </td>
              <td data-label="Status">
                <Button href="#popup1">
                  {user.workingStatus ? "Accepted" : "Pending"}
                </Button>
                <div id="popup1" class="overlay">
                  <div class="popup">
                    <h2>Rejected?</h2>
                    <a class="close" href="#">
                      &times;
                    </a>
                    <div class="content">
                      Desea cambiar el estado del repartidor seleccionado? Esta
                      acción no puede revertirse
                    </div>
                    <Button className="del">REJECT</Button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableDriversStyle>
  );
}
const TableDriversStyle = styled.nav`
  display: flex;
  flex-flow: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  height: auto;
  width: 100%;
  margin-top: 0;

  .overlay {
    position: fixed;
    top: 30%;
    bottom: 0;
    left: 0;
    right: 0;
    background: transparent;
    transition: opacity 500ms;
    visibility: hidden;
    opacity: 0;
  }
  .overlay:target {
    visibility: visible;
    opacity: 1;
  }

  .popup {
    margin: 70px auto;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    width: 40%;
    height: auto;
    position: relative;
    transition: all 5s ease-in-out;
  }
  .del {
    color: #fafafa;
    background-color: orange;
    border-radius: 20px;
    width: 120px;
    padding: 10px;
    font-weight: 600;
    margin: 15px;
  }
  .popup h2 {
    margin-top: 0;
    color: #333;
  }
  .popup .close {
    position: absolute;
    top: 20px;
    right: 30px;
    transition: all 200ms;
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
    color: #333;
  }
  .popup .close:hover {
    color: #ff8600;
  }
  .popup .content {
    max-height: 30%;
    overflow: auto;
  }
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
    padding: 0.35em;
  }
  table th,
  table td {
    padding: 0.5em;
    text-align: center;
    word-break: break-word;
    font-size: 15px;
    Button {
      color: blue;
      border: none;
      text-decoration: none;
      background-color: transparent;
    }
  }
  table th {
    font-size: 0.85em;
    letter-spacing: 0.1em;
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
      font-size: 0.8em;
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

    .popup {
      margin: 70px auto;
      padding: 20px;
      background: #fff;
      border-radius: 5px;
      width: 80%;
      height: auto;
      position: relative;
      transition: all 5s ease-in-out;
      text-align: center;
    }
    .del {
      color: #fafafa;
      background-color: orange;
      border-radius: 20px;
      width: 100px;
      padding: 10px;
      font-weight: 600;
      margin: 15px;
    }
  }
`;
