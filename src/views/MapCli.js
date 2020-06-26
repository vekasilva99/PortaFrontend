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

  const [
    makeOrderd,
    { data: dataM, error: errorM, loading: loadingM },
  ] = useMutation(MAKE_ORDER);

  const { _id, role, name, lastName } = useSelector((state) => ({
    ...state.User,
  }));

  const dispatch = useDispatch();

  const handleToggle = (e) => setToggle(!on);

  const pedir = async (e) => {
    const { dataM } = await makeOrderd({
      variables: {
        orderInput: {
          user: _id,
          pickUp: "Soy un pickup",
          deliver: "Soy un deliver",
          km: 1500,
          price: 2000,
          
        },
      },
    });
  };

  return (
    <StyleMapRep>
      <NavbarIn name={name} toggle={handleToggle} />
      <UserMenu show={on} />
      <div className="fondoMap">
        <div className="busqueda">
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
        <div className="clear"></div>
      </div>
    </StyleMapRep>
  );
}

const StyleMapRep = styled.div`
  position: absolute;
  background: white;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;

  .pedir {
    display: flex;
    color: #fafafa;
    font-weight: 600;
    font-weight: 300;
    font-size: 0.7em;
    text-decoration: none;
    padding: 0.8vw;
    padding-left: 1.8vw;
    padding-right: 1.8vw;
    border: 1.5px solid #202124;
    border-radius: 5vw;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: flex-end;
    background: #202124;
    z-index: 4;
    justify-self: center;

    &:hover {
      background: #333333;
      color: #fafafa;
      border-color: #333333;
    }
    &:focus {
      outline: none;
    }
  }
  .fondoMap {
    background-image: url("/mapa.png");
    height: 100%;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .MuiPickersToolbar-toolbar {
    height: 100px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    background-color: rgb(0, 80, 122) !important;
  }

  @media only screen and (min-width: 735px) {
    .fondoMap {
      display: grid;
      grid-template-columns: 30% 70%;
      grid-auto-rows: auto;
    }
    .busqueda {
      background-color: #fafafa;
      margin: 20px;
      margin-top: 80px;
      width: 400px;
      h1 {
        font-size: 60px;
        font-weight: 600;
        color: #fafafa;
        height: 230px;
        background-color: rgb(0, 80, 122);
        margin: 0;
        padding: 40px;
      }
      h2 {
        font-size: 25px;
        font-weight: 500;
        color: #1d1d1f;
        margin: 0;
        margin-top: 5%;
        margin-left: 5%;
      }

      .div1 {
        background-image: url("/iconos.png");
        background-repeat: no-repeat;
        background-size: 40px;
        margin-left: 25%;
        margin-top: 20%;
      }
      .rutas {
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-areas:
          "iconos partida"
          "iconos llegada";
      }
      input {
        background-color: #ffffff;
        margin: 5%;
        border: none;
        height: 40px;
        width: 90%;
        font-size: 20px;
        font-weight: 500;
        color: #1d1d1f;
      }

      .div1 {
        grid-area: iconos;
      }
      .div2 {
        grid-area: partida;
        margin: 0;
      }
      .div3 {
        grid-area: llegada;
        margin: 0;
      }
    }
  }

  @media only screen and (max-width: 734px) {
    .fondoMap {
      display: grid;
      grid-template-areas:
        "clear"
        "busqueda";
    }

    .clear {
      grid-area: clear;
      height: 50vh;
    }
    .busqueda {
      grid-area: busqueda;
      background-color: #fafafa;
      h1 {
        font-size: 30px;
        font-weight: 400;
        color: #fafafa;
        height: 80px;
        background-color: #ef0023;
        margin: 0;
        padding: 20px;
        width: 100vw;
      }
      h5 {
        font-size: 25px;
        font-weight: 500;
        color: #1d1d1f;
        margin: 0;
        margin-top: 5%;
        margin-left: 15%;
      }
    }
    .switch {
      margin-left: 20%;
      margin-top: 15px;
      margin-bottom: 20px;
    }
  }
`;
