import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminSidebar from "../components/AdminSidebar";
import AdminTable from "../components/AdminUserDashboardTable";
import AdminDriverTable from "../components/AdminDriverDashboardTable";
import RequestsTable from "../components/RequestsDashboardTable";
import CardMessage from "../components/Cards/CardMessage";
import Messages from "../components/Messages";
import NavbarIn from "../components/NavIn";
import UserMenu from "../components/UserMenu";
import UserProfileSidebar from "../components/UserProfileSidebar";
import UserProfileForm from "../components/Forms/UserProfile";
import { useSelector } from "react-redux";
import InputMessage from "../components/inputMessage";
import { useQuery } from "@apollo/react-hooks";
import { MESSAGES } from "../helpers/graphql/queries/index";
export default function AdminHome() {
  const [sidebar, setSidebar] = React.useState(false);

  const handlingSidebar = (e) => setSidebar(!sidebar);
  const { name, lastName, _id, role, currentOrder } = useSelector((state) => ({
    ...state.User,
  }));

  const { data, error, loading, subscribeToMore } = useQuery(MESSAGES, {
    fetchPolicy: "network-only",
    variables: {
      order: currentOrder._id,
    },
  });

  console.log(data);
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
        <div className="chat">
          {data && (
            <Messages
              subscribeToMore={subscribeToMore}
              messages={data.messages}
              currentOrder={currentOrder._id}
            />
          )}
        </div>
        <div className="send">
          <InputMessage />
        </div>
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
    flex-direction: column;
    .chat {
      width: 100%;
      background: pink;
      height: 70vh;
      overflow-y: scroll;
    }
    .send {
      width: 100%;
      display: flex;
      background: green;
      height: 10vh;
    }
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
