import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import Button from "../components/Button";
import Input from "../components/Input";
import NavbarIn from "../components/NavIn";
import Pedido from "../components/Pedidos";
import { useMutation } from "@apollo/react-hooks";
import UserMenu from "../components/UserMenu";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "date-fns";
import Map from "../components/Map";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function UserHome() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [on, setToggle] = React.useState(false);
  const [online, setOnline] = React.useState(false);
  const handleToggle = (e) => setToggle(!on);

  const dispatch = useDispatch();

  const { _id, role, name, lastName } = useSelector((state) => ({
    ...state.User,
  }));

  return (
    <>
      <NavbarIn name={name} toggle={handleToggle} />
      <UserMenu show={on} />
      <StyleMapRep>
        <div className="google">
          <Map />
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
    margin-top: 0;
    width: 100vw;
    height: 100vh;
  }
`;
