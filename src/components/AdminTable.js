import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { GET_USERS, GET_REPARTIDORES } from "../helpers/graphql/queries";
import { useQuery } from "@apollo/react-hooks";

export default function AdminTable(props) {
  const [users, setUsers] = React.useState([
    { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" },
    { id: 2, name: "Ali", age: 19, email: "ali@email.com" },
  ]);

  const { data: dataU, error: errorU, loading: loadingU } = useQuery(GET_USERS);
  const { loading, error, data } = useQuery(GET_REPARTIDORES);
  // const { u_loading, u_error, u_data } = useQuery(GET_USERS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // if (u_loading) return 'Loading...';
  // if (u_error) return `Error! ${r_error.message}`;

  return (
    <StyledTable>
      <div className="title">
        <h1>USERS</h1>
        <BsCircleFill size="1.8rem" color="#f89262" className="circle">
          2
        </BsCircleFill>
      </div>

      {/* Prueba repartidores */}
      <select name="driverTest">
        {data.repartidores.map((repartidor) => (
          <option key={repartidor.id}>{repartidor.name}</option>
        ))}
      </select>

      {/* Prueba USUARIOS */}
      <select name="userTest">
        {dataU.users.map((user) => (
          <option key={user.id}>{user.name}</option>
        ))}
      </select>

      <ul className="header">
        <li className="link2">
          <NavLink className="item" to="/">
            ITEM 1
          </NavLink>
        </li>
        <li className="link2">
          <NavLink className="item" to="/">
            ITEM 2
          </NavLink>
        </li>
        <li className="link2">
          <NavLink className="item" to="/">
            ITEM 2
          </NavLink>
        </li>
        <li className="link2">
          <NavLink className="item" to="/">
            ITEM 2
          </NavLink>
        </li>
      </ul>
      {users.map((user) => (
        <ul className="nav-links">
          <li className="link">
            <NavLink className="item" to="/">
              {user.id}
            </NavLink>
          </li>
          <li className="link">
            <NavLink className="item" to="/">
              {user.name}
            </NavLink>
          </li>
          <li className="link">
            <NavLink className="item" to="/">
              {user.age}
            </NavLink>
          </li>
          <li className="link">
            <NavLink className="item" to="/">
              {user.email}
            </NavLink>
          </li>
        </ul>
      ))}

      <li className="container">
        <NavLink to="/" className="button">
          BOTON
        </NavLink>
      </li>
    </StyledTable>
  );
}
const StyledTable = styled.nav`
  display: flex;
  flex-flow: column;
  font-family: Roboto;
  height: 50vh;
  width: 100%;
  margin-top: 1vh;
  .title {
    font-size: 1.5rem;
    display: flex;
    margin-left: 20vw;
    width: 70%;
    align-self: center;
    color: #f89262;
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
    border-bottom: 1.5px solid #f8f8f8;
    padding: 0;

    &:hover {
      background: #ebebeb;
      color: white;
      border-color: #ebebeb;
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
    background: #f8f8f8;
    margin-block-end: 0;
    margin-block-start: 0;
    padding-inline-start: 0;
    margin-bottom: 1.5rem;
    border: 1.5px solid #f8f8f8;
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
    color: white;
    font-weight: 600;
    font-size: 0.7em;
    text-decoration: none;
    padding: 0.5rem;
    padding-left: 4rem;
    padding-right: 4rem;
    border: 1.5px solid #f89262;
    border-radius: 500px;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-end;
    background: #f89262;

    &:hover {
      background: white;
      color: #f89262;
      border-color: #f89262;
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
    font-size: 0.8em;
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
    color: #f89262;
  }
`;
