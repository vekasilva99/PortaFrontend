import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

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
          <div>
            <h2>Porta</h2>
          </div>
        </div>

        <ul className="nav-links">
          <button onClick={props.togglerLogin} className="link">
            LOG IN
          </button>

          <button onClick={props.togglerRegister} className="link2">
            SIGN UP
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
  .toggle > h2 {
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
    margin-left: 0.3rem;
    font-weight: 600;
    font-weight: 300;
    font-size: 0.7em;
    text-decoration: none;
    padding: 0.4rem 0.8rem;
    border: 1.5px solid #202124;
    border-radius: 500px;
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
    padding: 0.4rem 0.8rem;
    border: 1.5px solid #202124;
    border-radius: 500px;
    border: 1.5px solid #202124;
    border-radius: 500px;
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
`;
