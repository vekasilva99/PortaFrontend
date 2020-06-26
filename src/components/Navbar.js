import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

export default function Navbar(props) {
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
      <div className="navbar-inner">
        <div className="toggle">
          <div className="title">
            <h2>Porta</h2>
          </div>
        </div>
        <ul className="nav-links">
          <button className="link" onClick={props.togglerLogin}>
            LOG IN
          </button>

          <button to="/" className="link2" onClick={props.togglerRegister}>
            SIGN UP
          </button>

          <button className="link3">
            <FiLogIn
              onClick={props.togglerLogin}
              size="2em"
              className="userbut"
            />
          </button>

          <button className="link3">
            <FiUser
              onClick={props.togglerRegister}
              size="2em"
              className="userbut"
            />
          </button>
        </ul>
      </div>
    </StyledNavbar>
  );
}
const StyledNavbar = styled.nav`
  display: flex;
  position: fixed;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  z-index: 3;
  height: 4rem;
  width: 100%;
  top: 0;
  left: 0;
  background: #202124;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  .navbar-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
  }
  .toggle {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    color: #fafafa;
  }
  .title > h2 {
    font-weight: 400;
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .nav-links {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    list-style: none;
  }
  .link {
    display: flex;
    color: #fafafa;
    font-weight: 600;
    font-weight: 300;
    font-size: 0.7em;
    text-decoration: none;
    padding: 0.8vw;
    padding-left: 2vw;
    padding-right: 2vw;
    border: 1.5px solid #202124;
    border-radius: 5vw;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-end;
    background: #202124;

    z-index: 3500;
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
    z-index: 3500;

    &:hover {
      background: #333333;
      color: #fafafa;
      border-color: #333333;
    }
    &:focus {
      outline: none;
    }
  }

  .link3 {
    display: none;
  }

  @media only screen and (min-width: 735px) {
    .fondo {
      height: 70px;
      padding-right: 1rem;
    }
    .toggle {
      height: 70px;
      padding-left: 1rem;
      font-size: 20px;
    }
    .logo {
      width: 50px;
      margin-right: 1rem;
    }
  }

  @media only screen and (max-width: 734px) {
    .fondo {
      height: 70px;
      padding-right: 0.5rem;
    }
    .title > h2 {
      font-weight: 400;
      margin-left: 2vw;
      font-size: 30px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    .logo {
      width: 40px;
      margin-right: 0.5rem;
    }
    .link {
      display: none;
    }
    .link2 {
      display: none;
    }
    .link3 {
      display: block;
      color: #fafafa;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all ease-in-out 0.3s;
      justify-content: flex-end;
      padding-left: 0;
      padding-right: 0;
      background: #1d1d1f;
      border-radius: 0;
      z-index: 4;
      &:focus {
        outline: none;
        background: #1d1d1f;
      }
    }

    .userbut {
      width: 50px;
      background: none;
    }

    .nav-links {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      width: 30vw;
      list-style: none;
      margin-right: 1em;
      z-index: 4;
    }
  }
`;
