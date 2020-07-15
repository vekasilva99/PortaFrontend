import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import Button from "../components/Button";
import Input from "../components/Input";
import NavbarIn from "../components/NavIn";
import FormPayment from "../components/Forms/Payment";
import { useMutation } from "@apollo/react-hooks";
import UserMenu from "../components/UserMenu";
import UserProfileSidebar from "../components/UserProfileSidebar";

export default function UserHome() {
  const [on, setToggle] = React.useState(false);
  const [sidebar, setSidebar] = React.useState(false);

  const handlingSidebar = (e) => setSidebar(!sidebar);

  return (
    <>
      <HomeStyle>
        {" "}
        <div className="show">
          <NavbarIn name={"Veka"} toggle={handlingSidebar} />
          <UserMenu show={sidebar} />
        </div>
        <div className="Payment">
          <FormPayment />
        </div>
        <UserProfileSidebar />
        <div className="content"></div>
      </HomeStyle>
    </>
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

  .Payment {
    width: 60vw;
    height: 80vh;
    margin-left: 292px;
    margin-top: 80px;
    display: flex;
    position: fixed;
  }

  @media only screen and (max-width: 734px) {
    .Payment {
      width: 100vw;
      height: 100vh;
      margin-left: 0;
      margin-top: 0;
      display: flex;
      position: fixed;
    }
  }
`;
