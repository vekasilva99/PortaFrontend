import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import Button from "../components/Button";
import Input from "../components/Input";
import NavbarIn from "../components/NavIn";
import FormPayment from "../components/Forms/Payment";
import { useMutation } from "@apollo/react-hooks";
import UserMenu from "../components/UserMenu";

export default function UserHome() {
  const [on, setToggle] = React.useState(false);
  const [online, setOnline] = React.useState(false);
  const handleToggle = (e) => setToggle(!on);

  return (
    <>
      <StyleMapRep>
        <div className="google">
          <FormPayment />
        </div>
      </StyleMapRep>
    </>
  );
}

const StyleMapRep = styled.div`
  background: #fafafa;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;

  .google {
    position: absolute;
    margin-top: 50px;
    width: 100vw;
    height: 100vh;
  }
`;
