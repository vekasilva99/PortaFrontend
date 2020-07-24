import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types'

/**
 * Navbar para los administradores
 */

export default function NavbarAdmin(props) {
  const [sidebar, setSidebar] = React.useState(false);
  const [log, setLog] = React.useState(false);
  const dispatch = useDispatch();

  const logOut = (e) => {
    console.log("log Out");
    setLog(true);
    console.log(log);
  };

  React.useEffect(() => {
    if (log) {
      localStorage.clear();
      dispatch({
        type: "LOGOUT",
      });
    }
  }, [log]);

  const handlingSidebar = (e) => {
    setSidebar(!sidebar);
  };

  const { mail } = useSelector((state) => ({
    ...state.User,
  }));

  let style;
  if (sidebar) {
    style = "close";
  } else {
    style = "open";
  }
  return (
    <>
      {log ? <Redirect to="/adminlogin" /> : null}
      <div>
        <StyledNavbar>
          <div className="toggle">
            <div>
              <TiThMenuOutline
                onClick={() => {
                  props.togglerSidebar();
                  handlingSidebar();
                }}
                className={style}
                size="1.7rem"
                color="#fafafa"
              />
            </div>
          </div>

          <ul className="nav-links">
            <button className="link" onClick={logOut}>
              LOG OUT
            </button>

            <button to="/" className="link2">
              PROFILE
            </button>
          </ul>
        </StyledNavbar>
      </div>
    </>
  );
}
const StyledNavbar = styled.nav`
  display: flex;
  position: fixed;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  height: 8vh;
  width: 100%;
  top: 0;
  left: 0;
  background: #202124;

  .toggle {
    display: flex;
    position: fixed;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    top: 0;
    left: 0;
  }
  .open {
    display: flex;
    flex-flow: row nowrap;
    align-items: left;
    list-style: none;
    margin-left: 22vw;
    margin-top: 1rem;
    cursor: pointer;
    transform: translateX(0);
    transition: transform 0.3s ease-out;
    font-weight: 200;
    &:hover {
      color: #fafafa;
    }
  }

  .close {
    transform: translateX(-18vw);
    display: flex;
    font-weight: 200;
    flex-flow: row nowrap;
    align-items: left;
    list-style: none;
    margin-left: 20vw;
    margin-top: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease-out;
    &:hover {
      color: #fafafa;
    }
  }
  .nav-links {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    width: 20vw;
    list-style: none;
    margin-right: 1rem;
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
    z-index: 200;

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
