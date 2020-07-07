import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import Button from "../components/Button";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Login from "./Login";
import LoginDriver from "./LoginDriver";
import Register2 from "./RegisterUser2";
import RegisterDriver from "./RegisterDriver";

export default function Home() {
  const [on, setToggle] = React.useState(true);

  const handleToggle = (e) => setToggle(false);

  const [login, setLogin] = React.useState(false);
  const [loginD, setLoginD] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [registerD, setRegisterD] = React.useState(false);

  const handlingLoginD = (e) => {
    setLoginD(!loginD);
    setLogin(false);
    setRegister(false);
    setRegisterD(false);
  };
  const handlingRegister = (e) => {
    setRegister(!register);
    setLogin(false);
    setLoginD(false);
  };
  const handlingRegisterD = (e) => {
    setRegisterD(!registerD);
    setLogin(false);
    setLoginD(false);
  };

  const handlingLogin = (e) => {
    setLogin(!login);
    setRegister(false);
    setLoginD(false);
  };
  return (
    <HomeStyle>
      <Navbar togglerLogin={handlingLogin} togglerRegister={handlingRegister} />

      <Login
        show={login}
        togglerLogin={handlingLogin}
        togglerRegister={handlingRegister}
      />

      <LoginDriver
        show={loginD}
        togglerLoginD={handlingLoginD}
        togglerRegisterD={handlingRegisterD}
      />

      <Register2
        show={register}
        togglerLogin={handlingLogin}
        togglerRegister={handlingRegister}
      />

      <RegisterDriver
        show={registerD}
        togglerLogin={handlingLoginD}
        togglerRegister={handlingRegisterD}
      />

      {/* <AdminSidebar show={sidebar} /> */}
      <div className="infoPorta">
        <h1>Porta</h1>
        <h2>Hasta tu puerta</h2>
      </div>
      <div className="usuarios">
        <div className="cliente">
          <h1>Cliente</h1>
          <button onClick={handlingLogin} className="boton">
            Log In
          </button>
        </div>
        <div className="repartidor">
          <h1>Repartidor</h1>
          <button onClick={handlingLoginD} className="boton">
            Log In
          </button>
        </div>
      </div>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  position: absolute;
  background-color: #fafafa;
  min-height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  .infoPorta {
    background-repeat: no-repeat;
    background-position: center;
    text-align: center;
    color: rgb(29, 29, 31);
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 4rem;
  }
  .infoPorta > h1 {
    font-weight: 500;
    margin: 0px;
  }
  .infoPorta > h2 {
    font-weight: 300;
    margin: 0px;
  }
  .usuarios > div {
    margin-top: 0.5rem;
    background-repeat: no-repeat;
    background-position: center;
    text-align: center;
    color: rgb(29, 29, 31);
  }
  .cliente > h1 {
    font-weight: 300;
    margin: 0px;
  }
  .repartidor > h1 {
    font-weight: 300;
    margin: 0px;
  }
  .boton {
    color: rgb(2, 102, 204);
    background-color: transparent;
    border: none;
    padding: 0.4rem 0.8rem !important;
    cursor: pointer;
    font-weight: 400;
    margin-top: 0.3rem;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    &:hover {
      opacity: 0.8;
    }
  }
  @media only screen and (min-width: 1070px) {
    .infoPorta {
      height: 690px;
      background-image: url("/Porta1.png");
    }
    .infoPorta > h1 {
      font-size: 60px;
      letter-spacing: 3px;
      padding-top: 3rem;
    }
    .infoPorta > h2 {
      font-size: 30px;
      word-spacing: 5px;
      padding-top: 0.5rem;
    }
    .infoPorta > button {
      font-size: 25px;
      padding-top: 0.5rem;
    }
    .usuarios {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0.5rem;
      grid-auto-rows: auto;
    }
    .cliente {
      height: 580px;
      background-image: url("/Cliente1.png");
      margin-left: 0.5rem;
    }
    .cliente > h1 {
      font-size: 35px;
      letter-spacing: 1px;
      padding-top: 2.5rem;
    }
    .cliente > button {
      font-size: 15px;
      padding-top: 1rem;
    }
    .repartidor {
      height: 580px;
      background-image: url("/Repartidor1.png");
      margin-right: 0.5rem;
    }
    .repartidor > h1 {
      font-size: 35px;
      letter-spacing: 1px;
      padding-top: 2.5rem;
    }
    .repartidor > button {
      font-size: 15px;
      padding-top: 1rem;
    }
  }

  @media only screen and (max-width: 1069px) and (min-width: 735px) {
    .infoPorta {
      height: 650px;
      background-image: url("/Porta2.png");
    }
    .infoPorta > h1 {
      font-size: 50px;
      letter-spacing: 3px;
      padding-top: 2.5rem;
    }
    .infoPorta > h2 {
      font-size: 25px;
      word-spacing: 5px;
      padding-top: 0.5rem;
    }
    .infoPorta > button {
      font-size: 18px;
      padding-top: 1rem;
    }
    .usuarios {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0.5rem;
      grid-auto-rows: auto;
    }
    .cliente {
      height: 490px;
      background-image: url("/Cliente2.png");
      margin-left: 0.5rem;
    }
    .cliente > h1 {
      font-size: 30px;
      letter-spacing: 1px;
      padding-top: 2rem;
    }
    .cliente > button {
      font-size: 12px;
      padding-top: 1rem;
    }
    .repartidor {
      height: 490px;
      background-image: url("/Repartidor2.png");
      margin-right: 0.5rem;
    }
    .repartidor > h1 {
      font-size: 30px;
      letter-spacing: 1px;
      padding-top: 2rem;
    }
    .repartidor > button {
      font-size: 12px;
      padding-top: 1rem;
    }
  }

  @media only screen and (max-width: 734px) {
    .infoPorta {
      height: 700px;
      background-image: url("/Porta3.png");
    }
    .infoPorta > h1 {
      font-size: 50px;
      letter-spacing: 2px;
      padding-top: 2.5rem;
    }
    .infoPorta > h2 {
      font-size: 20px;
      word-spacing: 3px;
      padding-top: 0.3rem;
    }
    .infoPorta > button {
      font-size: 18px;
      padding-top: 0.4rem;
    }
    .cliente {
      height: 500px;
      background-image: url("/Cliente3.png");
    }
    .cliente > h1 {
      font-size: 30px;
      padding-top: 2.5rem;
    }
    .cliente > button {
      font-size: 15px;
      padding-top: 2rem;
    }
    .repartidor {
      height: 500px;
      background-image: url("/Repartidor3.png");
    }
    .repartidor > h1 {
      font-size: 30px;
      padding-top: 2.5rem;
    }
    .repartidor > button {
      font-size: 15px;
      padding-top: 2rem;
    }
  }
`;
