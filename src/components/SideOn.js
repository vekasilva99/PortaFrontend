import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

import PropTypes from 'prop-types'

/**
 * 
 */

export default function SideOn(props) {
  const [sidebar, setSidebar] = React.useState(false);

  const handlingSidebar = (e) => {
    setSidebar(!sidebar);
  };

  let style;
  if (sidebar) {
    style = "close";
  } else {
    style = "open";
  }
  return (
    <StyledSideOn>
      <ul className="side">
        <li>
          <button className="link">Pedidos</button>
        </li>
        <li>
          <button className="link">Repartidores</button>
        </li>
        <li>
          <button className="link">Ajustes</button>
        </li>
        <li>
          <button className="link">Quienes Somos</button>
        </li>
        <li>
          <button className="link" id="close">
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </StyledSideOn>
  );
}
const StyledSideOn = styled.nav`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;

  .side {
    background-color: #fafafa;
    border: 20px solid white;
    margin: 0;
    padding: 0;
    width: 250px;
    height: 410px;
  }

  #close {
    margin-top: 70px;
  }

  .link {
    display: flex;
    color: #fafafa;
    text-decoration: none;
    border: solid transparent;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-start;
    background: rgb(239, 0, 35, 0.7);
    width: 190px;
    height: 50px;
    margin: 10px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 15px;
    &:hover {
      background: #333333;
      color: #fafafa;
      border-color: #333333;
    }
    &:focus {
      outline: none;
    }
  }
`;
