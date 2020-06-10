import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import NavbarDriver from "../components/NavbarDriver";
import DriverMenu from "../components/DriverMenu";
import DriverProfileSidebar from "../components/DriverProfileSidebar";
import DriverProfileForm from "../components/DriverProfile";
import { FaUserAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

export default function DriverProfile() {
  const [sidebar, setSidebar] = React.useState(false);

  const handlingSidebar = (e) => setSidebar(!sidebar);

  return (
    <HomeStyle>
      {" "}
      <NavbarDriver togglerSidebar={handlingSidebar} />
      <DriverMenu show={sidebar} />
      {/* <div className="edit">
        <FaUserAlt className="photo" color="#00507a" />
        <MdModeEdit className="settings" color="#00507a" />
      </div> */}
      <div className="form">
        <DriverProfileForm />
      </div>
      <DriverProfileSidebar />
      <div className="content"></div>
    </HomeStyle>
  );
}

const HomeStyle = styled.section`
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  position: absolute;
  overflow-x: hidden;
  background: #fafafa;
  .content {
    margin-top: 5rem;
  }
  .photo2 {
    border-radius: 500px;
    padding: 2em;
    border: solid 0.2em #00507a;
    width: 8vw;
    height: 8vw;
    margin-left: 1vw;
  }
  .settings2 {
    border-radius: 500px;
    margin-left: 0;
    left: 0;
    margin-top: 8vw;
    display: flex;
    position: absolute;
    padding: 1em;
    border: solid 0.1em #00507a;
    width: 2vw;
    height: 2vw;
    background: white;
  }

  .edit2 {
    display: flex;
    position: relative;
    width: 40vw;
    height: 50vh;
    margin-left: 292px;
    margin-top: 80px;
  }

  .form {
    width: 60vw;
    height: 80vh;
    margin-left: 292px;
    margin-top: 80px;
    display: flex;
    position: fixed;
  }

  @media only screen and (max-width: 734px) {
    .form {
      width: 100vw;
      height: 100vh;
      margin-left: 0;
      margin-top: 0;
      display: flex;
      position: fixed;
    }
  }
`;
