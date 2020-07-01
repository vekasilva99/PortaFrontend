import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import Button from "../components/Button";
import Input from "../components/Input";
import NavbarIn from "../components/NavIn";
import Pedido from "../components/Pedidos";
import { useMutation } from "@apollo/react-hooks";
import { MAKE_ORDER } from "../helpers/graphql/mutations/index";
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

  const [
    makeOrderd,
    { data: dataM, error: errorM, loading: loadingM },
  ] = useMutation(MAKE_ORDER);

  const { _id, role, name, lastName } = useSelector((state) => ({
    ...state.User,
  }));

  const dispatch = useDispatch();

  const pedir = async (e) => {
    const { dataM } = await makeOrderd({
      variables: {
        orderInput: {
          user: _id,
          pickUp: "SoP",
          deliver: "SoD",
          km: 1500,
          price: 2000,
        },
      },
    });
  };

  return (
    <>
      <NavbarIn name={name} toggle={handleToggle} />
      <UserMenu show={on} />
      <StyleMapRep>
        <div className="google">
          <Map />
        </div>
        {/* <div className="busqueda">
          <h1>Realiza un pedido</h1>
          <div className="rutas">
            <div className="div1"></div>
            <div className="div2">
              <input type="text" />
            </div>
            <div className="div3">
              <input type="text" />
            </div>
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <button onClick={pedir} className="pedir">
            Realizar Pedido
          </button>
        </div>
        <div className="clear"></div> */}
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
    position absolute;
    margin-top: 0;
    width: 100vw;
    height: 100vh;
  }
 
`;
