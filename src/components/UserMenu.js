import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import logo3 from "../assets/images/logo3.png";
import { FiMail } from "react-icons/fi";

export default function UserMenu(props) {
  let style;
  if (props.show) {
    style = "open";
  } else {
    style = "close";
  }
  return (
    <StyledSidebar>
      <div className={style}>
        <ul className="nav-links">
          <li>
            <NavLink to="/admin" className="link">
              REQUEST A DELIVERY
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="link">
              MY DELIVERIES
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="link">
              PROFILE SETTINGS
            </NavLink>
          </li>
        </ul>
      </div>
    </StyledSidebar>
  );
}
const StyledSidebar = styled.nav`
  .open {
    transform: translateY(0);
    height: 20%;
    background: #202124;
    position: fixed;
    top: 0;
    right: 0;
    width: 20vw;
    transition: transform 0.3s ease-in;
    margin-right: 1em;
    margin-top: 11.5vh;
    z-index: 1;
  }

  .close {
    transform: translateY(-35vh);
    height: 20%;
    background: #202124;
    position: fixed;
    top: 0;
    right: 0;
    width: 20vw;
    transition: transform 0.3s ease-in;
    margin-right: 1em;
    margin-top: 11.5vh;
    z-index: 1;
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
      color: #00507a;
      border-left: 2.5px solid #00507a;
      background: #333333;
    }
    &:focus {
      outline: none;
    }
  }

  .logo {
    width: 6vw;
    position: fixed;
    display: flex;
    align-self: center;
    justify-content: center;
    margin: 2rem;
    padding: 2.5rem;
    top: 0;
    left: 0;
    z-index: 50;
  }

  @media only screen and (max-width: 734px) {
    display: none;
  }
`;
