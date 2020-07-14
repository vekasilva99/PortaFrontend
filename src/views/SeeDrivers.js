import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import Button from "../components/Button";
import Input from "../components/Input";
import NavbarIn from "../components/NavIn";
import SideIn from "../components/SideIn";
import RepList from "../components/RepList";
import UserProfileSidebar from "../components/UserProfileSidebar";
import UserMenu from "../components/UserMenu";
import { useSelector } from "react-redux";

export default function SeeDrivers() {
  const [on, setToggle] = React.useState(false);

  const handleToggle = (e) => setToggle(!on);
  const { name, lastName, role } = useSelector((state) => ({
    ...state.User,
  }));
  return (
    <DriveList>
      <NavbarIn name={name} toggle={handleToggle} />
      <UserMenu show={on} />
      <div className="page">
        <div className="sid">
          {/* <SideIn></SideIn> */}
          <UserProfileSidebar />
        </div>
        <div className="repartidores">
          <h1>Repartidores</h1>
          <RepList></RepList>
        </div>
      </div>
    </DriveList>
  );
}

const DriveList = styled.div`
  position: absolute;
  background: white;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;

  .page {
    margin-top: 60px;
  }

  .repartidores {
    margin-top: 1.5em;
    background-color: white;
    padding-left: 3rem;
    h1 {
      font-weight: 300;
      color: #00507a;
      letter-spacing: 2px;
      margin-bottom: 40px;
    }
  }

  @media only screen and (min-width: 970px) {
    .page {
      display: grid;
      grid-template-columns: 25% 75%;
      grid-auto-rows: 100vh;
    }
    .repartidores {
      h1 {
        font-weight: 300;
        color: #00507a;
        letter-spacing: 2px;
      }
      h2 {
        margin-top: 15px;
        margin-bottom: 15px;
      }
      hr {
        border: 1px solid #00507a;
        width: 600px;
      }
    }
  }
  @media only screen and (max-width: 969px) and (min-width: 735px) {
    .repartidores {
      height: 100vh;
      h1 {
        margin-top: 100px;
        font-weight: 300;
        color: #00507a;
        letter-spacing: 2px;
      }
      h2 {
        margin-top: 15px;
        margin-bottom: 15px;
      }
      hr {
        border: 1px solid #00507a;
        width: 600px;
      }
    }
    .sid {
      display: none;
    }
  }
  @media only screen and (max-width: 734px) {
    .page {
      margin-top: 50px;
    }
    .repartidores {
      height: 100vh;
      h1 {
        margin-top: 100px;
        font-size: 30px;
        font-weight: 300;
        color: #00507a;
        letter-spacing: 2px;
      }
      h2 {
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: 15px;
      }
      hr {
        border: 1px solid #00507a;
        width: 400px;
      }
    }
    .sid {
      display: none;
    }
  }
`;
