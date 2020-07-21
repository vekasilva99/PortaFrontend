import React from "react";
import styled from "styled-components";
import { FiLogIn } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

export default function Navbar(props) {
  const [sidebar, setSidebar] = React.useState(false);
  const [log, setLog] = React.useState(false);
  const dispatch = useDispatch();

  const handlingSidebar = (e) => {
    setSidebar(!sidebar);
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
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
      <StyledNavbar phoneR={props.phoneR}>
        <div className="fondo">
          <div className="toggle">
            <img src="/LogoMain.png" alt="Logo" className="logo" />
            <div>
              <h2>Porta</h2>
            </div>
          </div>
        </div>
      </StyledNavbar>
    </>
  );
}
const StyledNavbar = styled.nav`
  .fondo {
    display: flex;
    position: fixed;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    font-family: Roboto;
    /* z-index: 3; */
    width: 100%;
    top: 0;
    left: 0;
    background: #1d1d1f;
    z-index: 3500;
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
    z-index: 3500;
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
    display: ${(props) => (props.phoneR ? "flex" : "none")};
    .fondo {
      height: 70px;
      padding-right: 0.5rem;
    }
    .toggle {
      height: 70px;
      padding-left: 0.5rem;
      font-size: 15px;
    }
    .logo {
      width: 40px;
      margin-right: 0.5rem;
    }
  }
`;
