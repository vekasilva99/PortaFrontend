import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminSidebar from "../components/AdminSidebar";
import AdminMenu from "../components/AdminMenu";
import { useSelector } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import Graph1 from "../components/Graphs/Graph1";
export default function AHome() {
  const [on, setToggle] = React.useState(true);
  const handleToggle = (e) => setToggle(!on);
  const { name, lastName, role } = useSelector((state) => ({
    ...state.User,
  }));
  return (
    <AHomeStyle>
      <NavbarAdmin name={name} toggle={handleToggle} />
      <AdminMenu show={!on} />
      <div className="page">
        <div className="side">
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
              <NavLink to="/admin/drivers" className="link">
                DRIVERS
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="link">
                REQUESTS
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/trips" className="link">
                TRIPS
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="main">
          <div className="banner">
            <h1>Bienvenido Admin</h1>
          </div>
          <Graph1 />
        </div>
      </div>
    </AHomeStyle>
  );
}

const AHomeStyle = styled.div`
  position: absolute;
  background: white;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;

  .main {
    background-color: #fafafa;
    padding-top: 70px;
    h1 {
      font-weight: 300;
      color: #ff8600;
      text-align: center;
    }
  }

  .side {
    height: 100%;
    background: #202124;
    top: 0;
    left: 0;
    width: 20%;
    margin-top: 0;
    margin-left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    .nav-links {
      position: fixed;
      width: 20%;
      height: 100%;
      display: flex;
      flex-flow: column;
      list-style: none;
      left: 0;
      top: -5;
      list-style: none;
      margin-left: 0;
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
  }

  @media only screen and (min-width: 970px) {
    .page {
      display: grid;
      grid-template-columns: 20% 80%;
      grid-auto-rows: 100vh;
    }
    .main {
      left: 20%;
    }
    .banner {
      height: 200px;
      background-color: #fafafa;
      display: flex;
      justify-content: center;
      align-items: center;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("/banner1.png");
      background-size: 800px;
    }
    h1 {
      font-size: 35px;
    }
  }
  @media only screen and (max-width: 969px) and (min-width: 735px) {
    .side {
      display: none;
    }
    h1 {
      font-size: 35px;
    }
    .banner {
      height: 200px;
      background-color: #fafafa;
      display: flex;
      justify-content: center;
      align-items: center;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("/banner1.png");
      background-size: 800px;
    }
    .main {
      height: 100vh;
    }
  }
  @media only screen and (max-width: 734px) {
    .side {
      display: none;
    }
    .main {
      height: 100vh;
    }
    h1 {
      font-size: 40px;
    }
    .banner {
      height: 92vh;
      background-color: #fafafa;
      display: flex;
      justify-content: center;
      align-items: center;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("/banner2.png");
      background-size: 700px;
    }
  }
`;
