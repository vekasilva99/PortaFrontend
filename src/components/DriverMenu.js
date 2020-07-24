import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import logo3 from "../assets/images/logo3.png";
import { FiMail } from "react-icons/fi";

export default function DriverMenu(props) {
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
            <NavLink to="/driver/maprep" className="link">
              MAP
            </NavLink>
          </li>
          <li>
            <NavLink to="/driver/request" className="link">
              REQUEST TO BE A DRIVER
            </NavLink>
          </li>
          <li>
            <NavLink to="/driver/mytrips" className="link">
              MY TRIPS
            </NavLink>
          </li>
          <li>
            <NavLink to="/driver/driverprofile" className="link">
              PROFILE SETTINGS
            </NavLink>
          </li>
          <li>
            <NavLink to="/driver/emailrep" className="link">
              EMAILS
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
    background: #202124;
    position: fixed;

    right: 0;
    transition: transform 0.4s ease-in;
    z-index: 3000;
  }

  .close {
    transform: translateY(-50vh);
    background: #202124;
    position: fixed;
    right: 0;
    transition: transform 0.4s ease-in;
    z-index: 3000;
  }

  .nav-links {
    top: 0;
    margin: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    list-style: none;
    justify-content: center;
    background: #202124;
  }

  .link {
    background: #202124;
    display: flex;
    color: #fafafa;
    font-weight: 500;
    text-decoration: none;
    padding: 1.4rem;
    padding-left: 2rem;
    padding-right: 1.4rem;
    cursor: pointer;
    /* transition: all ease-in-out 0.3s; */
    justify-content: flex-start;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    &:hover {
      color: #ee462f;
      border-left: 2.5px solid #ee462f;
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

  @media only screen and (min-width: 735px) {
    .open {
      width: 300px;
      margin-top: 70px;
    }
    .close {
      width: 300px;
    }
    .nav-links {
      top: 165px;
    }
    .link {
      font-size: 15px;
    }
  }

  @media only screen and (max-width: 734px) {
    .open {
      width: 100%;
      height: 100%;
      top: 70px;
      overflow: hidden;
      margin-right: 0;
      right: 0;
    }
    .close {
      width: 100%;
      height: 100%;
      top: 70px;
      transform: translateY(-100vh);
    }
    .nav-links {
      top: 0;
      justify-content: start;
    }
    .link {
      font-size: 15px;
    }
  }
`;
