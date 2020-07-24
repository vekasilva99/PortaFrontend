import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import {
  NEW_REPARTIDORES
} from "../helpers/graphql/queries";
import { useQuery } from "@apollo/react-hooks";

import PropTypes from 'prop-types'


/**
 * Componente con la tabla de los Repartidores más recientes.
 */

export default function AdminDriverTable(props) {
  const { data: dataNR, error: errorNR, loading: loadingNR } = useQuery(
    NEW_REPARTIDORES
  );
  
  const [users, setUsers] = React.useState([
    { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" },
    { id: 2, name: "Ali", age: 19, email: "ali@email.com" },
  ]);

  if (loadingNR) return "Loading...";
  if (errorNR) return `Error! ${errorNR.message}`;
  return (
    <StyledTable>
      <div className="title">
        <h1>Drivers</h1>
        <BsCircleFill size="1.8rem" color="#202124" className="circle">
          2
        </BsCircleFill>
      </div>

      <ul className="header">
        <li className="link2">
          <NavLink className="item2" to="/">
            NAME
          </NavLink>
        </li>
        <li className="link2">
          <NavLink className="item2" to="/">
            LAST NAME
          </NavLink>
        </li>
        <li className="link2">
          <NavLink className="item2" to="/">
            BIRTHDATE
          </NavLink>
        </li>
        <li className="link2">
          <NavLink className="item2" to="/">
            MAIL
          </NavLink>
        </li>
        <li className="link2">
          <NavLink className="item2" to="/">
            CELLPHONE
          </NavLink>
        </li>
        <li className="link2">
          <NavLink className="item2" to="/">
            HIRING DATE
          </NavLink>
        </li>
      </ul>
      {dataNR.newestDrivers.map((driver) => (
        <ul className="nav-links">
          <li className="link">
            <NavLink className="item" to="/">
              {driver._id}
            </NavLink>
          </li>
          <li className="link">
            <NavLink className="item" to="/">
              {driver.name}
            </NavLink>
          </li>
          <li className="link">
            <NavLink className="item" to="/">
              {driver.birthdate}
            </NavLink>
          </li>
          <li className="link">
            <NavLink className="item" to="/">
              {driver.mail}
            </NavLink>
          </li>
          <li className="link">
            <NavLink className="item" to="/">
              {driver.cellphone}
            </NavLink>
          </li>
          <li className="link">
            <NavLink className="item" to="/">
              {driver.createdAt}
            </NavLink>
          </li>
        </ul>
      ))}

      <li className="container">
        <NavLink to="/" className="button">
          SHOW MORE
        </NavLink>
      </li>
    </StyledTable>
  );
}

AdminDriverTable.propTypes = {
  /** Query con los últimos repartidores */
  NEW_REPARTIDORES: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Nombre del repartidor*/
  fname: PropTypes.string.isRequired,
  /** Cedula del repartidor */
  cedula: PropTypes.string.isRequired,
  /** Mail del repartidor*/
  mail: PropTypes.string.isRequired
}

const StyledTable = styled.nav`
  display: flex;
  flex-flow: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  height: 50vh;
  width: 100%;
  margin-top: 0;
  .title {
    font-size: 1.5rem;
    display: flex;
    margin-left: 20vw;
    width: 70%;
    align-self: center;
    color: #202124;
  }
  .title > h1 {
    font-weight: 200;
  }

  .circle {
    margin-left: 1.2rem;
    align-self: center;
  }
  .nav-links {
    display: flex;
    flex-flow: row nowrap;
    margin-left: 20vw;
    width: 70%;
    align-self: center;
    justify-content: space-around;
    list-style: none;
    height: 8vh;
    margin-block-end: 0;
    margin-block-start: 0;
    padding-inline-start: 0;
    transition: all ease-in-out 0.3s;
    border-bottom: 1px solid #202124;
    padding: 0;

    &:hover {
      background: #ebebeb;
      border-bottom: 1px solid #202124;
    }
    &:focus {
      outline: none;
    }
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    width: 70%;
    margin-left: 20vw;
    align-self: center;
    justify-content: center;
    list-style: none;
    height: 4.5vh;
    background: #202124;
    margin-block-end: 0;
    margin-block-start: 0;
    padding-inline-start: 0;
    margin-bottom: 1.5rem;
    border: 1.5px solid #202124;
    border-radius: 10px;
    padding-left: 1em;
  }

  .container {
    display: flex;
    flex-flow: row nowrap;
    width: 70%;
    margin-left: 20vw;
    align-self: center;
    justify-content: center;
    list-style: none;
    height: 4.5vh;
    margin-block-end: 0;
    margin-block-start: 0;
    padding-inline-start: 0;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
  }
  .button {
    display: flex;
    color: #fafafa;
    font-weight: 600;
    font-size: 0.7em;
    text-decoration: none;
    padding: 0.5rem;
    padding-left: 4rem;
    padding-right: 4rem;
    border: 1.5px solid #f28530;
    border-radius: 500px;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-end;
    background: #f28530;

    &:hover {
      background: #202124;
      color: #fafafa;
      border-color: #202124;
    }
    &:focus {
      outline: none;
    }
  }

  .link {
    display: flex;
    font-weight: 600;
    font-size: 0.7em;
    text-decoration: none;
    margin-left: 0;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-start;
    text-align: right;
    width: 100%;
    align-self: center;
  }

  .link2 {
    display: flex;
    font-weight: 600;
    font-size: 0.5em;
    text-decoration: none;
    cursor: pointer;
    justify-content: center;
    justify-content: flex-start;
    text-align: right;
    width: 100%;
    align-self: center;
  }

  .item {
    text-decoration: none;
    color: #202124;
  }
  .item2 {
    text-decoration: none;
    color: #fafafa;
  }
`;
