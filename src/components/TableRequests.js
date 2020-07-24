import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { GET_REQUESTS, SELECTED_DRIVER } from "../helpers/graphql/queries";
import { REVIEW_REQUEST } from "../helpers/graphql/mutations";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import Spinner from "./Spinner";
import { Button } from "antd";

export default function TableRequests(props) {
  const { data: dataU, error: errorU, loading: loadingU } = useQuery(
    GET_REQUESTS
  );
  const [reviewSolicitud, { data, error, loading }] = useMutation(REVIEW_REQUEST);

  if (loadingU)
    return (
      <StyledSpinner>
        <div className="spinner">
          <Spinner color="#ff8600" />
        </div>
      </StyledSpinner>
    );
  if (errorU) return `Error! ${errorU.message}`;

  // const reject = async (driverId) => {
  //   const { data } = await disableDriver({
  //     variables: {
  //       driverId: driverId.toString(),
  //     },
  //   });
  // };

  const acceptRequest = async (request) => {

    const { data } = await reviewSolicitud({
      variables: {
        reviewInput: {
          id: request._id,
          vehiculo: request.vehiculo,
          licencia: request.licencia,
          experience: request.experience,
          carnetCirculacion: request.carnetCirculacion,
          seguroVehiculo: request.seguroVehiculo,
          placaVehiculo: request.placaVehiculo,
          status: true,
        },
      },
    });

  };

  const denyRequest = async (request) => {
    const { data } = await reviewSolicitud({
      variables: {
        reviewInput: {
          id: request._id,
          vehiculo: request.vehiculo,
          licencia: request.licencia,
          experience: request.experience,
          carnetCirculacion: request.carnetCirculacion,
          seguroVehiculo: request.seguroVehiculo,
          placaVehiculo: request.placaVehiculo,
          status: false,
        },
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
            <th scope="col">Desition</th>
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
              <td data-label="Vehicle">{request.vehiculo}</td>
              <td data-label="Desition">
                <Button href="#popup1">More Info</Button>
                <div id="popup1" class="overlay">
                  <div class="popup">
                    <h2>Possible Driver</h2>
                    <a class="close" href="#">
                      &times;
                    </a>
                    <div class="content">
                      <div className="row">
                        <div class="cell">Name:</div>
                        <div class="cell">{request.repartidor.name}</div>
                      </div>
                      <div className="row">
                        <div class="cell">Last Name:</div>
                        <div class="cell">{request.repartidor.lastName}</div>
                      </div>
                      <div className="row">
                        <div class="cell">ID:</div>
                        <div class="cell">{request.repartidor.cedula}</div>
                      </div>
                      <div className="row">
                        <div class="cell">Birthdate:</div>
                        <div class="cell">{request.repartidor.birthdate}</div>
                      </div>
                      <div className="row">
                        <div class="cell">Mail:</div>
                        <div class="cell">{request.repartidor.mail}</div>
                      </div>
                      <div className="row">
                        <div class="cell">Cellphone:</div>
                        <div class="cell">{request.repartidor.cellphone}</div>
                      </div>
                      <div className="row">
                        <div class="cell">Vehicle:</div>
                        <div class="cell">{request.vehiculo}</div>
                      </div>
                      <div className="row">
                        <div class="cell">Licence:</div>
                        <div class="cell">{request.licencia}</div>
                      </div>
                      <div className="row">
                        <div class="cell">Carnet:</div>
                        <div class="cell">
                          {request.carnetCirculacion}
                        </div>
                      </div>
                      <div className="row">
                        <div class="cell">Insurance:</div>
                        <div class="cell">
                          {request.seguroVehiculo}
                        </div>
                      </div>
                    </div>
                    <div className="options">
                    {!loading ? (
                      <>
                      <Button id="opt" href="#" onClick={() => {acceptRequest(request)}}>
                        Accept
                      </Button>
                      <Button id="opt" href="#" onClick={ () => {denyRequest(request)}}>
                        Reject
                      </Button>
                      </>
                    ) : (
                        <Spinner color={"#000"}></Spinner>
                    )}
                      
                    </div>
                  </div>
                </div>
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
    top: 15%;
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
    width: 500px;
    height: auto;
    position: relative;
    transition: all 5s ease-in-out;

    .content {
      display: table;
      overflow: auto;
      margin: auto;
    }

    .row {
      display: table-row;
    }
    .cell {
      display: table-cell;
    }
    .del {
      color: #fafafa;
      background-color: orange;
      border-radius: 20px;
      padding: 10px;
      font-weight: 600;
      width: 500px;
    }
  }

  .popup h2 {
    margin-top: 0;
    color: #333;
    padding: 10px;
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

  .options {
    margin: 20px;
    #opt {
      color: #fafafa;
      background-color: #ff8600;
      border-radius: 20px;
      padding: 10px;
      width: 120px;
      margin: 10px;
    }
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
      width: 90%;
      height: auto;
      position: relative;
      transition: all 5s ease-in-out;
      text-align: center;
      h2 {
        margin-bottom: 25px;
      }
    }
  }
`;
