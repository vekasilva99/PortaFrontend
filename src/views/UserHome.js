import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import Button from "../components/Button";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import Login from "./Login";
import LoginDriver from "./LoginDriver";
import Register2 from "./RegisterUser2";
import RegisterDriver from "./RegisterDriver";
import { CURRENT_SESION_USER } from "../helpers/graphql/queries";
import { useQuery } from "@apollo/react-hooks";

export default function UserHome() {
  const [on, setToggle] = React.useState(true);

  const handleToggle = (e) => setToggle(false);

  const [login, setLogin] = React.useState(false);
  const [loginD, setLoginD] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [registerD, setRegisterD] = React.useState(false);
  // const { loading, error, data } = useQuery(CURRENT_SESION_USER);
  
  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;
  
  console.log("Aqui va");
  // console.log(data);

  const handlingLoginD = (e) => {
    setLoginD(!loginD);
    setLogin(false);
    setRegister(false);
  };
  const handlingRegister = (e) => {
    setRegister(!register);
    setLogin(false);
    setLoginD(false);
  };
  const handlingRegisterD = (e) => {
    setRegisterD(!register);
    setLogin(false);
    setLoginD(false);
  };

  const handlingLogin = (e) => {
    setLogin(!login);
    setRegister(false);
    setLoginD(false);
  };

  // const loggedUser = data.user.map();
  // console.log(loggedUser);
  return (
    <HomeStyle>
      <Navbar togglerLogin={handlingLogin} togglerRegister={handlingRegister} />
      {login ? (
        <Login
          show={login}
          togglerLogin={handlingLogin}
          togglerRegister={handlingRegister}
        />
      ) : null}
      {loginD ? (
        <LoginDriver
          show={loginD}
          togglerLoginD={handlingLoginD}
          togglerRegisterD={handlingRegisterD}
        />
      ) : null}
      {register ? (
        <Register2
          show={register}
          togglerLogin={handlingLogin}
          togglerRegister={handlingRegister}
        />
      ) : null}
      {registerD ? (
        <RegisterDriver
          show={registerD}
          togglerLogin={handlingLoginD}
          togglerRegister={handlingRegisterD}
        />
      ) : null}

      {/* <AdminSidebar show={sidebar} /> */}
      <div className="infoPorta">
        {/* <select name="userTest">
        {data.user.map((user) => (
          <option key={user.id}>{user.name}</option>
        ))}
      </select> */}
        <h1>Usuario</h1>
        <h2>Hasta tu puerta</h2>
        <button className="boton">Más información ></button>
      </div>
      <div className="usuarios">
        <div className="cliente">
          <h1>Cliente</h1>
          <button onClick={handlingLogin} className="boton">
            Log In >
          </button>
        </div>
        <div className="repartidor">
          <h1>Repartidor</h1>
          <button onClick={handlingLoginD} className="boton">
            Log In >
          </button>
        </div>
      </div>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  position: absolute;
  background: white;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;

  .infoPorta {
    background-repeat: no-repeat;
    background-position: center;
    text-align: center;
    color: rgb(29, 29, 31);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin-top: 5vh;
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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: transparent;
    border: none;
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
      height: 500px;
      background-image: url("/Porta3.png");
    }
    .infoPorta > h1 {
      font-size: 30px;
      letter-spacing: 2px;
      padding-top: 2.5rem;
    }
    .infoPorta > h2 {
      font-size: 18px;
      word-spacing: 3px;
      padding-top: 0.3rem;
    }
    .infoPorta > button {
      font-size: 15px;
      padding-top: 1rem;
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
