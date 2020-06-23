import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import logo3 from "../assets/images/logo3.png";

export default function UserProfileSidebar() {
  return (
    <StyledSidebar>
      <div className="container">
        <ul className="nav-links">
          <li>
            <NavLink to="/" className="link">
              REQUEST A DELIVERY
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="link">
              MY DELIVERIES
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/userprofile" className="link">
              PROFILE SETTINGS
            </NavLink>
          </li>
        </ul>
      </div>
    </StyledSidebar>
  );
}
const StyledSidebar = styled.nav`
  @media only screen and (max-width: 734px) {
    display: none;
  }
  @media only screen and (max-width: 1069px) and (min-width: 735px) {
    display: none;
  }
  .container {
    height: 20vh;
    position: fixed;
    left: 2rem;
    width: 20vw;
    margin-left: 0;
    top: 5rem;
  }

  .nav-links {
    display: flex;
    flex-flow: column;
    list-style: none;
    left: 0;
    top: -5;
    list-style: none;
    width: 100%;
    margin-block-end: 0;
    margin-block-start: 0;
    padding-inline-start: 0;
    justify-content: center;
  }
  .link {
    display: flex;
    color: #202124;
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
      background: #fafafa;
    }
    &:focus {
      outline: none;
    }
  }
`;
