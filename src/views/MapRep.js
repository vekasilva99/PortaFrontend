import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import Button from "../components/Button";
import Input from "../components/Input";
import NavbarOn from "../components/NavOn";
import DriverMenu from "../components/DriverMenu";
import Pedido from "../components/Pedidos";
import { useMutation } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import { CHANGE_AVAILABLE } from "../helpers/graphql/mutations/index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSubscription } from "@apollo/react-hooks";
import { NavLink, withRouter } from "react-router-dom";
import { GET_ORDERS } from "../helpers/graphql/queries/index";
import MapR from "../components/MapR";

export default function MapRep() {
  const [on, setToggle] = React.useState(false);
  const [online, setOnline] = React.useState(false);

  const [
    changeAv,
    { data: dataA, error: errorA, loading: loadingA },
  ] = useMutation(CHANGE_AVAILABLE);

  const {
    role,
    _id,
    name,
    lastName,
    available,
    latitud,
    longitud,
    currentOrder,
    workingStatus,
  } = useSelector((state) => ({
    ...state.User,
  }));

  console.log("current order");
  console.log(currentOrder);

  const dispatch = useDispatch();

  const handleToggle = (e) => setToggle(!on);
  const handleOnline = (e) => setToggle(!available);
  const handlePedido = (e) => setOnline();

  const handleChangeChk = async (e) => {
    setOnline(!available);

    const { dataA } = await changeAv({
      variables: {
        lat: "driver lat",
        lng: "driver lng",
      },
    });

    dispatch({
      type: "UPDATE_USER",
      payload: {
        available: !available,
      },
    });
  };

  return (
    <>
      <NavbarOn name={name} toggle={handleToggle} />
      <DriverMenu show={on} />
      <StyleMapRep>
        <MapR />

        <div className="fondoMap">
          {currentOrder ? (
            <div className="busqueda">
              <h1>Pedido Actual</h1>
              {!currentOrder ? (
                <>
                  <h5>Se encuentra disponible?</h5>
                  <label class="switch">
                    <input
                      type="checkbox"
                      defaultChecked={available}
                      value={available}
                      checked={available}
                      disabled={true}
                    ></input>

                    <span class="slider round"></span>
                  </label>
                </>
              ) : null}
              <div className="info">
                <div className="div6">
                  <h2>Cliente</h2>
                  <h3>
                    {currentOrder.user.name} {currentOrder.user.lastName}
                  </h3>
                  <h2>Origen</h2>
                  <h3>{currentOrder.pickUp}</h3>
                  <h2>Destino</h2>
                  <h3>{currentOrder.deliver}</h3>
                </div>
              </div>

              <div className="botonContainer2">
                <NavLink to="/driver/chatrep" className="boton">
                  CHAT
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="busqueda">
              <h1>Pedidos para tí</h1>
              <h5>Se encuentra disponible?</h5>
              <label class="switch">
                <input
                  type="checkbox"
                  defaultChecked={available}
                  value={available}
                  checked={available}
                  onChange={handleChangeChk}
                  disabled={!workingStatus}
                ></input>
                <span class="slider round"></span>
              </label>
              {available && workingStatus ? (
                <Pedido handleChangeChk={handleChangeChk} />
              ) : null}
            </div>
          )}
          <div className="clear"></div>
        </div>
      </StyleMapRep>
    </>
  );
}

const StyleMapRep = styled.div`
  .fondoMap {
    display: flex;
    position: relative;
    height: 100vh;
    width: 100vw;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background: #fafafa;
    overflow: hidden;
  }

  .boton {
    border: solid 2px #ef0023;
    color: white;
    padding: 0.9rem;
    font-size: 0.8em;
    width: 15vw;
    display: flex;
    font-weight: 600;
    cursor: pointer;
    background: #ef0023;
    border-radius: 500px;
    transition: all ease-in-out 0.3s;
    justify-content: center;

    &:hover {
      opacity: 0.8;
      background: #ef0023;
      color: white;
      border-color: #ef0023;
    }
    &:focus {
      opacity: 0.8;
      outline: none;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .botonContainer2 {
    width: 100%;
    background: #fafafa;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .info {
    margin: 0;
    padding-top: 2%;
    padding-bottom: 15%;
    padding-left: 9%;
    padding-right: 9%;
    width: 100%;
    height: 30vh;
    background: #fafafa;
    display: grid;
    grid-template-areas: "partida partida";
  }

  .div6 {
    background: transparent;
    width: 100%;
    height: 100%;
    grid-area: partida;

    h2 {
      font-size: 25px;
      font-weight: 500;
      color: #1d1d1f;
      margin: 0;
    }

    h3 {
      font-size: 20px;
      font-weight: 200;
      color: #1d1d1f;
      margin: 0;
      margin-bottom: 1vh;
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #1d1d1f;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #ef0023;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
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
      z-index: 3000;

      h1 {
        font-size: 60px;
        font-weight: 600;
        color: #fafafa;
        height: 35vh;
        background-color: #ef0023;
        margin: 0;
        padding: 40px;
      }
      h5 {
        font-size: 25px;
        font-weight: 500;
        color: #1d1d1f;
        margin: 0;
        margin-top: 5%;
        width: 90%;
        text-align: center;
        margin-left: 50%;
        transform: translateX(-50%);
      }
      .switch {
        margin-left: 42%;
        margin-top: 15px;
        margin-bottom: 20px;
      }
    }
  }

  @media only screen and (max-width: 734px) {
    .fondoMap {
      display: grid;
      grid-template-areas:
        "clear"
        "busqueda";
      overflow-y: scroll;
    }

    .busqueda {
      grid-area: busqueda;
      background-color: #fafafa;
      z-index: 2020;
      margin: 0;
      bottom: 0;
      height: 70vh;
      min-height: 48vh;
      h1 {
        font-size: 40px;
        font-weight: 400;
        color: #fafafa;
        height: 100px;
        background-color: #ef0023;
        margin: 0;
        padding: 30px;
        width: 100vw;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
      h5 {
        font-size: 20px;
        font-weight: 500;
        color: #1d1d1f;
        margin: 0;
        width: 90%;
        text-align: center;
        margin-top: 3%;
        margin-left: 50%;
        transform: translateX(-50%);
      }
      .switch {
        margin-left: 50%;
        transform: translateX(-50%);
        margin-top: 12px;
        margin-bottom: 20px;
        width: 60px;
      }
    }

    .clear {
      grid-area: clear;
      height: 85vh;
    }

    .info {
      margin: 0;
      padding-top: 10%;
      padding-bottom: 15%;
      padding-left: 9%;
      padding-right: 9%;
      width: 100%;
      height: 30vh;
      background: #fafafa;
      display: grid;
      grid-template-areas: "partida partida";
    }

    .div6 {
      background: transparent;
      width: 100%;
      height: 100%;
      grid-area: partida;

      h2 {
        font-size: 25px;
        font-weight: 500;
        color: #1d1d1f;
        margin: 0;
      }

      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #1d1d1f;
        margin: 0;
        margin-bottom: 1vh;
      }
    }

    .boton {
      border: solid 2px #ef0023;
      color: white;
      padding: 0.9rem;
      font-size: 18px;
      width: 40vw;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      background: #ef0023;
      border-radius: 500px;
      transition: all ease-in-out 0.3s;
      justify-content: center;

      &:hover {
        opacity: 0.8;
        background: #ef0023;
        color: white;
        border-color: #ef0023;
      }
      &:focus {
        opacity: 0.8;
        outline: none;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      }
    }

    .botonContainer2 {
      width: 100%;
      background: #fafafa;
      height: 18vh;
      display: flex;

      justify-content: center;
      align-items: center;
    }
  }
`;
