import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function NavbarOn(props) {
  const [sidebar, setSidebar] = React.useState(false);
  const [log, setLog] = React.useState(false);
  const dispatch = useDispatch();
  const handlingSidebar = (e) => {
    setSidebar(!sidebar);
  };
  const { role, name } = useSelector((state) => ({
    ...state.User,
  }));
  console.log(role, name);

  const logOut = (e) => {
    e.preventDefault();
    console.log("entra");
    localStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
    console.log("sale");
    setLog(true);
  };

  let style;
  if (sidebar) {
    style = "close";
  } else {
    style = "open";
  }
  return (
    <>
      {log && <Redirect to="/" />}
      <StyledNavbarOn>
        <div className="fondo">
          <div className="toggle">
            <img src="/LogoRepartidor.png" alt="Logo" className="logo" />
            <div>
              <h2>Porta</h2>
            </div>
          </div>
          {/* <button onClick={props.togglerSidebar}>BUTTON</button> */}
          <ul className="nav-links">
            <button onClick={logOut} className="link">
              LOG OUT
            </button>

            <button onClick={props.toggle} className="link2">
              {props.name.toUpperCase()}
            </button>

            <li>
              <button className="link3">
                <img src="/user.png" alt="User" className="userbut" />
              </button>
            </li>
          </ul>
        </div>
      </StyledNavbarOn>
    </>
  );
}
const StyledNavbarOn = styled.nav`
  .fondo {
    display: flex;
    position: fixed;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    font-family: Roboto;
    width: 100%;
    top: 0;
    left: 0;
    background: #1d1d1f;
    z-index: 4;
  }

  .toggle {
    padding: 0px;
    z-index: 5;
    display: flex;
    position: fixed;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    letter-spacing: 0.2rem;
    color: #fafafa;
    top: 0;
    left: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    z-index: 4;
  }

  .nav-links {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    width: 20vw;
    list-style: none;
    margin-right: 1rem;
    z-index: 4;
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
    z-index: 4;

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
    z-index: 4;

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
    color: #fafafa;
    text-decoration: none;
    border: solid #202124;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-end;
    background: #202124;
    border-radius: 20px;
    z-index: 4;
    &:hover {
      background: #333333;
      color: #fafafa;
      border-color: #333333;
    }
    &:focus {
      outline: none;
    }
  }
  .userbut {
    width: 15px;
    z-index: 4;
  }

  @media only screen and (min-width: 735px) {
    .fondo {
      height: 60px;
      padding-right: 1rem;
    }
    .toggle {
      height: 60px;
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
      height: 50px;
      padding-right: 0.5rem;
    }
    .toggle {
      height: 50px;
      padding-left: 0.5rem;
      font-size: 15px;
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
    }
  }
`;
