import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

import PropTypes from 'prop-types'

/**
 * Navbar para los usuarios
 */

export default function NavbarUser(props) {
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
    <StyledNavbar>
      <div className="toggle">
        <div>
          <h2>Porta</h2>
        </div>
      </div>
      {/* <button onClick={props.togglerSidebar}>BUTTON</button> */}
      <ul className="nav-links">
        <li>
          <button onClick={props.togglerLogin} className="link">
            LOG OUT
          </button>
        </li>
        <li>
          <button onClick={props.togglerSidebar} className="link2">
            USER
          </button>
        </li>
      </ul>
    </StyledNavbar>
  );
}
const StyledNavbar = styled.nav`
  display: flex;
  position: fixed;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  font-family: Roboto;
  height: 4rem;
  width: 100%;
  top: 0;
  left: 0;
  background: #202124;
  z-index: 5;

  .toggle {
    display: flex;
    position: fixed;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    color: #fafafa;
    top: 0;
    left: 0;
    margin-left: 2vw;
  }
  .toggle > h2 {
    font-weight: 500;
    margin-left: 2vw;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .nav-links {
    display: flex;
    margin: 0;
    padding: 0;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: right;
    width: 15vw;
    list-style: none;
    margin-right: 1rem;
  }

  .link {
    display: flex;
    color: #fafafa;
    font-weight: 600;
    font-weight: 300;
    font-size: 0.7em;
    text-decoration: none;
    padding: 0.8vw;
    padding-left: 1.8vw;
    padding-right: 1.8vw;
    border: 1.5px solid #202124;
    border-radius: 5vw;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-end;
    background: #202124;

    &:hover {
      background: #333333;
      color: #fafafa;
      border-color: #333333;
    }
    &:focus {
      outline: none;
    }
  }
  .link2 {
    display: flex;
    color: #fafafa;
    font-weight: 600;
    font-weight: 300;
    font-size: 0.7em;
    text-decoration: none;
    padding: 0.8vw;
    padding-left: 1.8vw;
    padding-right: 1.8vw;
    border: 1.5px solid #202124;
    border-radius: 5vw;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-end;
    background: #202124;

    &:hover {
      background: #333333;
      color: #fafafa;
      border-color: #333333;
    }
    &:focus {
      outline: none;
    }
  }

  @media only screen and (max-width: 734px) {
    display: none;
  }
`;
