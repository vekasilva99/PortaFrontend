import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminSidebar from "../components/AdminSidebar";
import AdminTable from "../components/AdminUserDashboardTable";
import AdminDriverTable from "../components/AdminDriverDashboardTable";
import RequestsTable from "../components/RequestsDashboardTable";
import CardMessage from "../components/Cards/CardMessage";
import NavbarIn from "../components/NavIn";
import UserMenu from "../components/UserMenu";
import UserProfileSidebar from "../components/UserProfileSidebar";
import UserProfileForm from "../components/Forms/UserProfile";
import { useSelector } from "react-redux";

export default function AdminHome() {
  const [sidebar, setSidebar] = React.useState(false);

  const handlingSidebar = (e) => setSidebar(!sidebar);
  const { name, lastName, _id, role } = useSelector((state) => ({
    ...state.User,
  }));

  const options = {
    timeZone: "UTC",
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <HomeStyle>
      {" "}
      <div className="show">
        <NavbarIn name={name} toggle={handlingSidebar} />
        <UserMenu show={sidebar} />
      </div>
      <div className="form">
        <CardMessage
          content="Hola"
          date="2020-10-12"
          user={_id}
          name={name}
          userId={_id}
          options={options}
        />
      </div>
      <UserProfileSidebar />
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
    position: absolute;
    background: red;
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

    .show {
      display: none;
    }
  }
`;
