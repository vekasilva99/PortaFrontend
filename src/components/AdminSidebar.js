import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import logo3 from "../assets/images/logo3.png";
import { FiMail } from "react-icons/fi";

export default function AdminSidebar(props) {
  let style;
  if (props.show) {
    style = "open";
  } else {
    style = "close";
  }
  return (
    <StyledSidebar>
      <div className={style}>
        <img className="logo" src={logo3} alt="Logo" />
        <ul className="nav-links">
          <li>
            <NavLink to="/admin" className="link">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="link">
              USERS
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="link">
              DRIVERS
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="link">
              REQUESTS
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="link">
              TRIPS
            </NavLink>
          </li>
        </ul>
      </div>
    </StyledSidebar>
  );
}
const StyledSidebar = styled.nav`
  .open {
    transform: translateX(0);
    height: 100%;
    background: #202124;
    position: fixed;
    top: 0;
    left: 0;
    width: 20vw;
    transition: transform 0.3s ease-out;
    margin-top: 0;
    margin-left: 0;
    z-index: 100;
  }

  .close {
    transform: translateX(-20vw);
    height: 100%;
    background: #202124;
    position: fixed;
    top: 0;
    left: 0;
    width: 20vw;
    transition: transform 0.3s ease-out;
    margin-top: 0;
    margin-left: 0;
    z-index: 100;
  }
  .nav-links {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    list-style: none;
    left: 0;
    top: -5;
    list-style: none;
    margin-left: 0;
    width: 100%;
    margin-block-end: 0;
    margin-block-start: 0;
    padding-inline-start: 0;
    justify-content: center;
    background: #202124;
  }
  .link {
    background: #202124;
    display: flex;
    color: #fafafa;
    font-weight: 500;
    font-size: 0.9em;
    text-decoration: none;
    padding: 1.4rem;
    padding-left: 2rem;
    padding-right: 1.4rem;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-start;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    &:hover {
      color: #f28530;
      border-left: 2.5px solid #f28530;
      background: #333333;
    }
    &:focus {
      outline: none;
    }
  }

  .logo {
    width: 12vw;
    background: pink;
    position: fixed;
    display: flex;
    align-self: center;
    justify-content: center;
    margin: 2rem;
    padding: 2.5rem;
    top: 0;
    left: 0;
    z-index: 100;
  }
`;
