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
            color="#f28530"
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
  font-family: Roboto;
  height: 8vh;
  width: 100%;
  top: 0;
  left: 0;

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
  }

  .close {
    transform: translateX(-18vw);
    display: flex;
    flex-flow: row nowrap;
    align-items: left;
    list-style: none;
    margin-left: 20vw;
    margin-top: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease-out;
  }
  .nav-links {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: right;
    width: 15vw;
    list-style: none;
    margin-right: 1rem;
  }

  .link {
    display: flex;
    color: #ff8600;
    font-weight: 600;
    font-size: 0.7em;
    text-decoration: none;
    padding: 0.5rem;
    padding-left: 1.4rem;
    padding-right: 1.4rem;
    border: 1.5px solid #202124;
    border-radius: 500px;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-end;
    background: #202124;

    &:hover {
      background: #f28530;
      color: #202124;
      border-color: #f28530;
    }
    &:focus {
      outline: none;
    }
  }
  .link2 {
    display: flex;
    color: #202124;
    font-weight: 600;
    font-size: 0.7em;
    text-decoration: none;
    padding: 0.5rem;
    padding-left: 1.4rem;
    padding-right: 1.4rem;
    border: 1.5px solid #f28530;
    border-radius: 500px;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-end;
    background: #f28530;

    &:hover {
      background: #202124;
      color: #f28530;
      border-color: #202124;
    }
    &:focus {
      outline: none;
    }
  }
`;
