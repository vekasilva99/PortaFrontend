import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

export default function NavbarAdmin(props) {
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
          {/* <FiMail className={style} size="1.7rem" color="#ff8600" />
          <FaRegUser className={style} size="1.7rem" color="#ff8600" /> */}
        </div>
      </div>
      {/* <button onClick={props.togglerSidebar}>BUTTON</button> */}
      <ul className="nav-links">
        <li>
          <NavLink to="/" className="link">
            LOG OUT
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="link2">
            PROFILE
          </NavLink>
        </li>
      </ul>
    </StyledNavbar>
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
    align-items: right;
    width: 18vw;
    list-style: none;
    margin-right: 1rem;
  }

  .link {
    display: flex;
    color: #fafafa;
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
