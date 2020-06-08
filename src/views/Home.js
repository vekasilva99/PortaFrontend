import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Home() {
  const [count, setCount] = React.useState("Hola");

  const handlingInput = (e) => setCount(count + "a");

  return (
    <HomeStyle>
      <Button onClick={handlingInput}> {count} </Button>
    </HomeStyle>
  );
}

const HomeStyle = styled.section`
  min-height: 100vh;
  background: white;

  width: 100%;
`;
