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
import { GET_ORDERS } from "../helpers/graphql/queries/index";

export default function MapRep() {
  const [on, setToggle] = React.useState(false);
  const [online, setOnline] = React.useState(false);

  const [
    changeAv,
    { data: dataA, error: errorA, loading: loadingA },
  ] = useMutation(CHANGE_AVAILABLE);

  const { role, name, lastName, available } = useSelector((state) => ({
    ...state.User,
  }));

  const dispatch = useDispatch();

  const handleToggle = (e) => setToggle(!on);
  const handleOnline = (e) => setToggle(!available);
  const handlePedido = (e) => setOnline();

  const handleChangeChk = async (e) => {
    setOnline(!available);

    const { dataA } = await changeAv({
      variables:{
        location:"driver location"
      }
    });

    dispatch({
      type: "UPDATE_USER",
      payload: {
        available: !available,
      },
    });
  };

  console.log(available);

  return (
    <StyleMapRep>
      <NavbarOn name={name} toggle={handleToggle}></NavbarOn>
      <DriverMenu show={on} />
      <div className="fondoMap">
        <div className="busqueda">
          <h1>Pedidos para tí</h1>
          <h5>Se encuentra disponible?</h5>
          <label class="switch">
            <input
              type="checkbox"
              defaultChecked={available}
              value={available}
              onChange={handleChangeChk}
            ></input>
            <span class="slider round"></span>
          </label>
          {available ? <Pedido handleChangeChk={handleChangeChk} /> : null}
        </div>
        <div className="clear"></div>
      </div>
    </StyleMapRep>
  );
}

const StyleMapRep = styled.div`
  position: absolute;

  background: white;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;

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

  .fondoMap {
    background-image: url("/mapa.png");
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    min-height: 100vh;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
        margin-left: 15%;
      }
    }
    .switch {
      margin-left: 42%;
      margin-top: 15px;
      margin-bottom: 20px;
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
