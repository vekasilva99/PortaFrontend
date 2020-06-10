import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import driver from "../assets/images/delivery.png";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";

export default function DriverRequestForm(props) {
  const [region, setRegion] = React.useState("");
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleFName = (e) => {
    setFName(e.target.value);
  };

  const handleLName = (e) => {
    setLName(e.target.value);
  };

  const handleRegion = (e) => {
    setRegion(e.target.value);
  };
  return (
    <FormStyle>
      <div className="edit">
        <img className="photo" src={driver} />
      </div>
      <div className="Form">
        <div className="navb">
          <button className="saveB2" type="submit">
            {" "}
            <IoIosArrowDropleftCircle color="#ef0023" size="4rem" />{" "}
          </button>
        </div>
        <div className="Profile-name">
          <h1>Valeska Silva</h1>
          <h2>04241952718</h2>
          <h2>27159591</h2>
        </div>
        <div className="Profile-content">
          <div className="label">
            <h2>Licencia</h2>
            <div className="group">
              <h2>Licencia</h2>
            </div>
          </div>
          <div className="label">
            <h2>Placa del Vehiculo</h2>
            <div className="group">
              <h2>Placa del Vehiculo</h2>
            </div>
          </div>
          <div className="label">
            <h2>Seguro del Vehiculo</h2>
            <div className="group">
              <h2>Seguro del Vehiculo</h2>
            </div>
          </div>
          <div className="label">
            <h2>Carnet de Circulación</h2>
            <div className="group">
              <h2>Carnet de Circulación</h2>
            </div>
          </div>
          <div className="label">
            <h2>Años de Experiencia</h2>
            <div className="group">
              <h2>Años de Experiencia</h2>
            </div>
          </div>
          <div className="label">
            <h2>Tipo de Vehiculo</h2>
            <div className="group">
              <h2>Tipo de Vehiculo</h2>
            </div>
          </div>
          <div className="solicitud">
            <button className="saveB" type="submit" block>
              {" "}
              ACCEPT{" "}
            </button>
            <button className="saveB" type="submit" block>
              {" "}
              DECLINE{" "}
            </button>
          </div>
        </div>
      </div>
    </FormStyle>
  );
}
const FormStyle = styled.section`
  display: flex;
  position: relative;
  width: 60vw;
  height: 80vh;
  margin-left: 0;
  margin-top: 0;

  .photo {
    border-radius: 500px;
    border: solid 0.2em #f28530;
    width: 10vw;
    height: 10vw;
    margin-left: 1vw;
  }
  button {
    display: none;
  }

  .edit {
    width: 15vw;
    height: 25vh;
    margin-top: 0;
    margin-left: 0;
    display: flex;
    position: relative;
  }

  .Form {
    width: 60vw;
    height: 80vh;
    margin-left: 0;
    margin-top: 0;
    display: flex;
    position: absolute;
  }

  .Profile-name {
    margin-top: 4vh;
    margin-left: 12vw;
    width: 45vw;
    height: 20vh;
    display: flex;
    position: fixed;
    flex-direction: column;
  }

  .Profile-content {
    margin-top: 20vh;
    margin-left: 2em;
    width: 60vw;
    height: 55vh;
    display: flex;
    position: fixed;
    flex-direction: column;
  }
  .icon {
    width: 2rem;
    height: 2rem;
  }

  .Profile-name > h1 {
    font-size: 1.8em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 600;
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 0.1em;
    padding-top: 0;
    padding-bottom: 0;
    height: 4vh;
    width: auto;
    color: #202124;
    display: inline-block;
  }

  .Profile-name > h2 {
    font-size: 1.2em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    height: 4vh;
    width: auto;
    color: #202124;
  
  }

  .group {
    font-size: 1em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    margin-left: 2em;
    height: 6vh;
    width: 40vw;
    transition: all ease-in-out 0.5s;
    border-bottom: solid 1px #202124;
    &:focus {
      opacity: 0.8;
      outline: none;
      border-bottom: solid 1px #f28530;
    }
  }

  .group > h2 {
    font-size: 1em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 200;
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    height: 4vh;
    width: auto;
    color: #202124;
    display: inline-block;
  }

  .label {
    display: flex;
    height: 6vh;
    flex-direction: row;
    font-weight: 100;
    justify-content: center;
    margin-bottom: 1.5em;
    justify-self: center;
    align-self: center;
  }
  .solicitud {
    display: flex;
    height: 6vh;
    flex-direction: row;
    justify-content:center;


  }
  .label > h2 {
    display: flex;
    font-weight: 300;
    font-size: 1em;
    color: #202124;
    margin: 0px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    width: 8vw;
    justify-self: center;
  }
  .edit > h1 {
    display: none;
  }
  .saveB {
    border: solid 2px #f28530;
    color: white;
    padding: 0.9rem;
    font-size: 0.8em;
    width: 12vw;
    display: flex;
    font-weight: 600;
    cursor: pointer;
    background: #f28530;
    border-radius: 500px;
    margin-right:1em;
    margin-left:1em;
    transition: all ease-in-out 0.3s;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    &:hover {
        background: #202124;
        color: #fafafa;
        border-color: #202124;
    }
    &:focus {
      outline: none;

    }
}

    .nav {
      display: none;
    }
    .saveB2 {
      display: none;
      margin-left: 10vw;
    }
  }

  @media only screen and (min-width: 1070px) {
    .label {
      align-items: center;
    }
  }

  @media only screen and (max-width: 734px) {
    width: 100vw;
    height: 100vh;
    .photo {
      width: 20vw;
      height: 20vw;
      margin-left: 0;
    }
    .settings {
      margin-top: 7vw;
      margin-left: 40vw;
      padding: 0.1em;
      border: solid 0.1em #ef0023;
      width: 8vw;
      height: 8vw;
      background: white;
      align-self: center;
      justify-self: center;
    }

    .edit {
      width: 100vw;
      height: 15vh;
      margin-top: 10vh;
      margin-left: 0;
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
    }

    .Profile-name {
      margin-top: 12vh;
      margin-left: 0;
      width: 100vw;
      height: 10vh;
      display: flex;
      position: fixed;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .Profile-content {
      margin-top: 28vh;
      margin-left: 0;
      width: 100vw;
      height: 70vh;
      display: flex;
      position: absolute;
      flex-direction: column;
    }

    .navb {
      width: 100vw;
      height: 10vh;
      margin-top: 0;
      display: flex;
      position: relative;
      align-items: center;
    }

    .label {
      display: flex;
      height: auto;
      width: 90vw;
      margin-left: 1em;
      margin-right: 1em;
      flex-direction: column;
      font-weight: 100;
      margin-bottom: 0;
      justify-self: none;
      align-self: left;
      align-items: left;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      border-top: solid 2px #ef0023;
    }

    .label > h2 {
      display: flex;
      font-weight: 300;
      font-size: 1em;
      color: #202124;
      margin: 0px;
      margin-bottom: 0;
      margin-top: 0;
      margin-left: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      width: 90vw;
      height: 1vh;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      justify-self: none;
      align-self: left;
    }

    .mail {
      font-size: 1.5em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: 200;
      margin-left: 0;
      margin-right: 0;
      margin-top: 0.2em;
      height: 4vh;
      width: 90vw;
      padding-top: 0.2em;
      padding-bottom: 0.2em;
      transition: all ease-in-out 0.5s;
      border-bottom: none;
      border-top: none;
      color: #202124;
      display: flex;
      align-self: center;
      &:focus {
        opacity: 0.8;
        outline: none;
        broder: none;
      }
    }

    .select {
      color: #202124;
      background: none;
      font-size: 1.5em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: 200;
      margin-left: 0;
      margin-right: 0;
      margin-top: 0.2em;
      height: 5vh;
      width: 90vw;
      padding-top: 0.2em;
      padding-bottom: 0.2em;
      transition: all ease-in-out 0.5s;
      border-bottom: none;
      border-top: none;
      display: flex;
      align-self: center;
      &:focus {
        opacity: 0.8;
        outline: none;
        border-bottom: solid 2px #ef0023;
      }
    }

    .icon {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-self: center;
    }
    .group {
      display: flex;
      flex-direction: row;
    }

    .saveB {
      display: none;
    }

    .saveB2 {
      border: none;
      color: white;
      padding-left: 1em;
      font-size: 1em;
      width: 50vw;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      background: none;
      border-radius: 500px;
      transition: all ease-in-out 0.3s;
      justify-self: center;
      align-self: center;
      margin-top: 0;

      &:focus {
        opacity: 0.8;
        outline: none;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      }
    }
  }
`;
