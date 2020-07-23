import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Graph1 from "../components/Graphs/Graph1";

export default function Graphs() {
  return (
    <HomeStyle>
      <Graph1 />
    </HomeStyle>
  );
}

const HomeStyle = styled.section`
  height: auto;
  width: 100vw;
  top: 0;
  left: 0;
  position: absolute;
  overflow-x: hidden;
  background: #fafafa;
  display: grid;
  grid-area: profile;
  grid-template-areas: "edit Profile-name Profile-name Profile-name Profile-name ";
`;
