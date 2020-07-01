import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import NavbarIn from "../components/NavIn";
import DriverMenu from "../components/DriverMenu";
import DriverProfileSidebar from "../components/DriverProfileSidebar";
import DriverProfileForm from "../components/DriverProfile";
import { FaUserAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";

export default function DriverProfile() {
  const [sidebar, setSidebar] = React.useState(false);

  const handlingSidebar = (e) => setSidebar(!sidebar);

  const { name } = useSelector((state) => ({
    ...state.User,
  }));

  return (
    <HomeStyle>
      {" "}
      <NavbarIn name={name}></NavbarIn>
      {/* <NavbarDriver togglerSidebar={handlingSidebar} /> */}
      {/* <div className="edit">
        <FaUserAlt className="photo" color="#00507a" />
        <MdModeEdit className="settings" color="#00507a" />
      </div> */}
      <div className="form">
        <DriverProfileForm />
      </div>
    </HomeStyle>
  );
}

const HomeStyle = styled.section`
  overflow: scroll;
  width: 100vw;
  top: 0;
  left: 0;
  background: #fafafa;

  .form {
    width: 60vw;
    margin-left: 5vw;
    margin-top: 80px;
    display: flex;
    position: fixed;
  }

  @media only screen and (max-width: 734px) {
    .form {
      width: 100vw;
      margin-left: 0;
      margin-top: 0;
      display: flex;
      position: fixed;
    }
  }
`;
