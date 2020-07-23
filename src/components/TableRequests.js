import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { GET_REQUESTS } from "../helpers/graphql/queries";
import { DISABLE_DRIVER } from "../helpers/graphql/mutations";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import Spinner from "./Spinner";
import { Button } from "antd";

export default function TableRequests(props) {
  const { data: dataU, error: errorU, loading: loadingU } = useQuery(
    GET_REQUESTS
  );
  const [disableDriver, { data, error, loading }] = useMutation(DISABLE_DRIVER);

  if (loadingU)
    return (
      <StyledSpinner>
        <div className="spinner">
          <Spinner color="#ff8600" />
        </div>
      </StyledSpinner>
    );
  if (errorU) return `Error! ${errorU.message}`;

  const reject = async (driverId) => {
    const { data } = await disableDriver({
      variables: {
        driverId: driverId.toString(),
      },
    });
  };

  return (
    <TableRequestsStyle>
      <table>
        <thead>
          <tr>
            <th scope="col" width="20%">
              Name
            </th>
            <th scope="col">ID</th>
            <th scope="col">Experience</th>
            <th scope="col">Vehicle</th>
            <th scope="col" width="30%">
              Desition
            </th>
          </tr>
        </thead>
        <tbody>
          {dataU.solicitudes.map((request) => (
            <tr>
              <td data-label="Name">
                {request.repartidor.name} {request.repartidor.lastName}
              </td>
              <td data-label="ID">{request.repartidor.cedula}</td>
              <td data-label="Experience">{request.experience}</td>
              <td data-label="Vehicle">{request.vehicle}</td>
              <td data-label="Desition">
                <Button>Accept</Button>
                <Button
                  className="del"
                  onClick={() => {
                    reject(request.repartidor._id);
                  }}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableRequestsStyle>
  );
}
const StyledSpinner = styled.div`
height: 50vh;
width: 80vw;
overflow-x: hidden;
overflow-y: scroll;
background: #fafafa;
display: flex;
position:relative;
.spinner{
    display:flex;
    position:absolute:
    z-index:100;
    width:100%;
    height:100%;
    justify-content:center;

  }
`;
const TableRequestsStyle = styled.nav`
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
    .content {
      margin: 20px;
    }
    .del {
      color: #fafafa;
      background-color: orange;
      border-radius: 20px;
      padding: 10px;
      font-weight: 600;
    }
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
