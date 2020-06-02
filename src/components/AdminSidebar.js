import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import logo2 from "../assets/images/logo2.png";

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
        <img className="logo" src={logo2} alt="Logo" />
        <ul className="nav-links">
          <li>
            <NavLink to="/" className="link">
              ITEM 1
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="link">
              ITEM 2
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="link">
              ITEM 2
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="link">
              ITEM 2
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="link">
              ITEM 2
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
    background: #ebebeb;
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
    background: #ebebeb;
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
  }
  .link {
    background: #ebebeb;
    display: flex;
    color: #d1d1d1;
    font-weight: 600;
    font-size: 0.9em;
    text-decoration: none;
    padding: 1.4rem;
    padding-left: 2rem;
    padding-right: 1.4rem;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-start;
    font-family: Roboto;

    &:hover {
      color: #f89262;
      border-left: 2.5px solid #f89262;
      background: #d1d1d1;
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
  }
`;
