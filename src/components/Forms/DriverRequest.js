import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Input from "../Input";
import Button from "../Button";
import { FaUserAlt } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import styled from "styled-components";
import driver from "../../assets/images/delivery.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { storage } from "../firebaseconfig";
import { useMutation } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MdSave } from "react-icons/md";
import { DRIVER_REQUEST } from "../../helpers/graphql/mutations/index";
import { Redirect } from "react-router-dom";

export default function DriverRequestForm(props) {
  const [region, setRegion] = React.useState("");
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [error1, setError1] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);
  const [
    makeRequest,
    { data: dataU, loading: loadingU, error: errorU },
  ] = useMutation(DRIVER_REQUEST);

  const {
    _id,
    name,
    mail,
    lastName,
    cellphone,
    workingStatus,
    userImageURL,
  } = useSelector((state) => ({
    ...state.User,
  }));

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
    <>
      {updated ? (
        <Redirect to="/driver/maprep" />
      ) : (
        <FormStyle>
          {dataU && dataU.createSolicitud ? (
            <div className="error">
              <div className="error-message">
                <h4>Su solicitud ha sido enviada</h4>
                <button
                  className="boton-error"
                  onClick={() => {
                    setUpdated(true);
                  }}
                >
                  ACCEPT
                </button>
              </div>
            </div>
          ) : null}
          {error ? (
            <div className="error">
              <div className="error-message">
                <h4>Su solicitud ha sido enviada</h4>
                <button
                  className="boton-error"
                  onClick={() => {
                    setError(null);
                  }}
                >
                  ACCEPT
                </button>
              </div>
            </div>
          ) : null}
          {errorU && errorU.graphQLErrors ? (
            <div className="error">
              <div className="error-message">
                {errorU.graphQLErrors[0].message ? (
                  <h4>{errorU.graphQLErrors[0].message}</h4>
                ) : (
                  <h4>Ha ocurrido un error</h4>
                )}
                <button
                  className="boton-error"
                  onClick={() => {
                    window.location.reload(false);
                  }}
                >
                  ACCEPT
                </button>
              </div>
            </div>
          ) : null}
          {errorU && errorU.networkError ? (
            <div className="error">
              <div className="error-message">
                {errorU.graphQLErrors[0].message ? (
                  <h4>{errorU.graphQLErrors[0].message}</h4>
                ) : (
                  <h4>Ha ocurrido un error de red</h4>
                )}
                <button
                  className="boton-error"
                  onClick={() => {
                    window.location.reload(false);
                  }}
                >
                  ACCEPT
                </button>
              </div>
            </div>
          ) : null}
          <div className="navb"></div>
          <div className="driver-profile">
            <div className="profile">
              <div className="edit">
                {userImageURL ? (
                  <img className="photo" src={userImageURL} />
                ) : (
                  <img className="photo" src={driver} />
                )}
              </div>
              <div className="Profile-name">
                <h1>
                  {name} {lastName}
                </h1>
                <h2>{mail}</h2>
                <h2>{cellphone}</h2>
              </div>
            </div>
            <div className="edit-section">
              <Formik
                initialValues={{
                  Licencia: "170202476964",
                  Seguro: "8Z1TJ29667V372989",
                  Placa: "FBW54R",
                  Vehiculo: "carro",
                  Carnet: "1801051029170359ZG688W39",
                  Experiencia: "1 año",
                }}
                validate={(values) => {
                  const errors = {};
                  console.log(values);
                  if (!values.Licencia) {
                    errors.Licencia = "Required Field";
                  } else if (values.Licencia.length != 12) {
                    errors.Licencia = "Invalid License";
                  } else if (
                    !/^\+?([0-9]{4})?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/i.test(
                      values.Licencia
                    )
                  ) {
                    errors.Licencia = "Invalid License";
                  }
                  if (!values.Seguro) {
                    errors.Seguro = "Required Field";
                  } else if (values.Seguro.length != 17) {
                    errors.Seguro = "Invalid Security";
                  }
                  if (!values.Placa) {
                    errors.Placa = "Required Field";
                  } else if (values.Placa.length != 6) {
                    errors.Phone = "Invalid License Plate";
                  }
                  if (!values.Vehiculo) {
                    errors.Vehiculo = "Required Field";
                  }
                  if (!values.Carnet) {
                    errors.Carnet = "Required Field";
                  } else if (values.Carnet.length != 24) {
                    errors.Carnet = "Invalid License";
                  }
                  if (!values.Experiencia) {
                    errors.Experiencia = "Required Field";
                  }
                  console.log(errors);
                  if (errors) {
                    setError1(true);
                  }
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  console.log("entre", error1);

                  setSubmitted(true);

                  const { data: dataU } = await makeRequest({
                    variables: {
                      solicitudInput: {
                        repartidorID: _id,
                        vehiculo: values.Vehiculo,
                        licencia: values.Licencia,
                        experience: values.Experiencia,
                        carnetCirculacion: values.Carnet,
                        seguroVehiculo: values.Seguro,
                        placaVehiculo: values.Placa,
                      },
                    },
                  });

                  setSubmitting(true);
                  console.log(values);
                  setSubmitting(false);
                  resetForm();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="Profile-content">
                      <div className="label">
                        <h2>Licencia</h2>
                        <div className="group">
                          <input
                            className="mail"
                            value={values.Licencia}
                            id="Licencia"
                            name="Licencia"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <MdKeyboardArrowRight
                            color="#ef0023"
                            className="icon"
                          />
                        </div>
                      </div>
                      <div className="label">
                        <h2>Placa del Vehiculo</h2>
                        <div className="group">
                          <input
                            className="mail"
                            value={values.Placa}
                            id="Placa"
                            name="Placa"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <MdKeyboardArrowRight
                            color="#ef0023"
                            className="icon"
                          />
                        </div>
                      </div>
                      <div className="label">
                        <h2>Seguro del Vehiculo</h2>
                        <div className="group">
                          <input
                            className="mail"
                            value={values.Seguro}
                            id="Seguro"
                            type="text"
                            name="Seguro"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <MdKeyboardArrowRight
                            className="icon"
                            color="#ef0023"
                          />
                        </div>
                      </div>
                      <div className="label">
                        <h2>Carnet de Circulación</h2>
                        <div className="group">
                          <input
                            className="mail"
                            value={values.Carnet}
                            id="Carnet"
                            name="Carnet"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <MdKeyboardArrowRight
                            className="icon"
                            color="#ef0023"
                          />
                        </div>
                      </div>
                      <div className="label">
                        <h2>Años de Experiencia</h2>
                        <div className="group">
                          <select
                            className="select"
                            name="Experiencia"
                            value={values.Experiencia}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="" label="Choose a Experience Time" />
                            <option value="6 meses" label="6 months" />
                            <option value="1 año" label="1 year" />
                            <option
                              value="Mas de 1 año"
                              label="More than a year"
                            />
                          </select>
                          <MdKeyboardArrowRight
                            color="#ef0023"
                            className="icon"
                          />
                        </div>
                      </div>
                      <div className="label">
                        <h2>Tipo de Vehiculo</h2>
                        <div className="group">
                          <select
                            className="select"
                            name="Vehiculo"
                            value={values.Vehiculo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="" label="Choose a Vehicle" />
                            <option value="carro" label="Car" />
                            <option value="moto" label="Motorcycle" />
                          </select>
                          <MdKeyboardArrowRight
                            color="#ef0023"
                            className="icon"
                          />
                        </div>
                      </div>
                      <div className="botonContainer2">
                        <button
                          className="boton"
                          type="submit"
                          disabled={submitted}
                        >
                          {" "}
                          SEND REQUEST{" "}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </FormStyle>
      )}
    </>
  );
}
const FormStyle = styled.section`
  margin: 0;
  width: 100%;
  height: 100%;

  .navb {
    margin: 0;
    width: 100%;
    height: 20vh;
    display: none;
  }

  .error{
    display: flex;
    position: fixed;
    top:0;
    left:0;
    height: 100vh;
    width: 100vw;
    background:transparent;
    z-index: 3000;
    transition: all ease-in-out 0.3s;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    &:after {
      position: fixed;
      top: 0;
      left: 0;
      content: "";
      width: 100%;
      z-index: 1;
      height: 100%;
      background: #202124;
      opacity: 0.4;
    }

    .error-message{
      display: flex;
      position: absolute;
      height: 20vh;
      width: 30vw;
      background:#fafafa;
      z-index: 3000;
      top:50%;
      left:50%;
      transform:translate(-50%);
      padding-left:0.5em;
      padding-right:0.5em;
      text-align:center;
      
      flex-direction:column;
      justify-content:center;
      align-items:center;
      h4{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        color:#ef0023;
        font-size:1em;

  
      }
      .boton-error{
        border: solid 2px #ef0023;
        color: white;
        padding: 0.6rem;
        font-size: 0.8em;
        width: 10vw;
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
    }}
  

  .boton {
    border: solid 2px #ef0023;
    color: white;
    padding: 0.9rem;
    font-size: 0.8em;
    width: 20vw;
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
    padding-top: 0;
    padding-bottom: 0.1vh;
  }

  .driver-profile {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas:
      "profile"
      "edit-section"
      "edit-section";

    .profile {
      display: grid;
      grid-area: profile;
      grid-template-areas: "edit Profile-name Profile-name Profile-name Profile-name ";

      .edit {
        display: grid;
        grid-area: edit;
        .photo {
          border-radius: 500px;
          border: solid 0.2em #ef0023;
          width: 14vw;
          height: 14vw;
          display: relative;
          margin: auto;
          background: #fafafa;
        }
        .settings {
          border-radius: 500px;
          display: flex;
          position: absolute;
          margin-top: 9vw;
          padding: 0.2em;
          border: solid 0.1em #ef0023;
          width: 5vw;
          height: 5vw;
          background: white;
          cursor: pointer;
          cursor: pointer;
          outline: none;
          margin-left: 4vw;

          z-index: 100;
          &:hover {
            cursor: pointer;
            outline: none;
          }
        }
        .saveP {
          border-radius: 500px;
          margin-left: 0;
          left: 0;
          margin-top: 11vw;
          margin-left: 6.5vw;
          display: flex;
          position: absolute;
          padding: 0.2em;
          border: solid 0.1em #ef0023;
          width: 3.5vw;
          height: 3.5vw;
          background: white;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;

          z-index: 2000;
          &:hover {
            cursor: pointer;
            outline: none;
          }
        }
        .inputPhoto {
          z-index: 3000;
        }

        .pen {
          border-radius: 500px;
          left: 0;
          width: 4vw;
          height: 4vw;
          background: none;
          align-self: center;
        }
      }
      .Profile-name {
        display: grid;
        grid-area: Profile-name;
        display: flex;
        flex-direction: column;
        padding-top: 3em;
        h1 {
          font-size: 1.8em;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          font-weight: 600;
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
        h2 {
          font-size: 1.2em;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          font-weight: 300;
          margin-left: 0;
          margin-top: 0.2em;
          margin-bottom: 0;
          padding-top: 0;
          padding-bottom: 0;
          height: 4vh;
          width: auto;
          color: #202124;
        }
      }
    }

    .edit-section {
      display: grid;
      grid-area: edit-section;
      width: 100%;
      grid-template-areas: "Profile-content";
      padding-top:1em;
      padding-left:1em;
      

      .Profile-content {
        
        display: grid;
        width: 100%;
        height: 100%;
        grid-area: Profile-content;
        grid-template-areas: "label" "label" "label" "label" "label" "label" "button";

        .label {
          display: flex;
          flex-direction: row;
          width: 100%;
          margin-top:0.5em;
       

          h2 {
            display: flex;
            font-weight: 300;
            font-size: 1em;
            color: #202124;
            margin: 0px;
            width: 7vw;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            justify-self: center;
          }

          .group {
            display: grid;
            grid-area: group;
            grid-template-areas: "input input input input input arrow";
            width: 100%;

            input {
              background: none;
              color: #202124;
              border: none;
              box-shadow: none;
              outline: none;
              opacity: 0.8;
              margin-top: 0;
            }

            .mail {
              font-size: 1em;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
                sans-serif;
              font-weight: 300;
              margin-left: 2em;
              height: 6vh;
              width: 40vw;
              transition: all ease-in-out 0.5s;
              border-bottom: solid 2px #202124;
              &:focus {
                opacity: 0.8;
                outline: none;
                border-bottom: solid 2px #ef0023;
              }
            }

            .select {
              color: #202124;
              background: none;
              font-size: 1em;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
                sans-serif;
              font-weight: 300;
              margin-left: 2em;
              height: 6vh;
              width: 40vw;
              transition: all ease-in-out 0.5s;
              border: none;
              outline: none;
              border-bottom: solid 2px #202124;
              &:focus {
                opacity: 0.8;
                outline: none;
                border-bottom: solid 2px #ef0023;
              }
            }

            .icon {
              display: flex;
              align-self: center;
            }
          }
        }
      }
    }
  }



  @media only screen and (max-width: 1069px) and (min-width: 735px) {
    .navb {
      margin: 0;
      width: 100%;
      height: 12vh;
      display: flex;
    }

    .error{
      display: flex;
      position: absolute;
      height: 100vh;
      width: 100vw;
      background:transparent;
      z-index: 3000;
      transition: all ease-in-out 0.3s;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      &:after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        z-index: 1;
        height: 100%;
        background: #202124;
        opacity: 0.4;
      }
  
      .error-message{
        display: flex;
        position: absolute;
        height: 20vh;
        width: 80vw;
        background:#fafafa;
        z-index: 3000;
        top:50%;
        left:50%;
        transform:translate(-50%);
        padding-left:0.5em;
        padding-right:0.5em;
        text-align:center;
        
        flex-direction:column;
        justify-content:center;
        align-items:center;
        h4{
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          color:#ef0023;
          font-size:1em;
  
    
        }
        .boton-error{
          border: solid 2px #ef0023;
          color: white;
          padding: 0.6rem;
          font-size: 0.8em;
          width: 30vw;
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
      }}
    .boton {
      border: solid 2px #ef0023;
      color: white;
      padding: 0.9rem;
      font-size: 0.8em;
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
      align-items: flex-start;
      padding-top: 0.2vh;
      padding-bottom: 0.1vh;
    }

    .driver-profile {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-areas:
        "profile"
        "edit-section"
        "edit-section";

      .profile {
        display: grid;
        grid-area: profile;
        grid-template-areas: "edit" "Profile-name" ;

        .edit {
          display: grid;
          grid-area: edit;
          .photo {
            border-radius: 500px;
            border: solid 0.2em #ef0023;
            width: 20vw;
            height: 20vw;
            display: relative;
            margin: auto;
            background: #fafafa;
          }
          .settings {
            border-radius: 500px;
            display: flex;
            position: absolute;
            margin-top: 12vw;
            padding: 0.2em;
            border: solid 0.1em #ef0023;
            width: 8vw;
            height: 8vw;
            background: white;
            cursor: pointer;
            cursor: pointer;
            outline: none;
            margin-left: 42%;
            transform: translateX(-42%);

            z-index: 100;
            &:hover {
              cursor: pointer;
              outline: none;
            }
          }
          .saveP {
            border-radius: 500px;
            margin-left: 0;
            left: 0;
            margin-top: 16vw;
            margin-left: 46%;
            transform: translateX(-46%);
            display: flex;
            position: absolute;
            padding: 0.2em;
            border: solid 0.1em #ef0023;
            width: 6vw;
            height: 6vw;
            background: white;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            outline: none;

            z-index: 2000;
            &:hover {
              cursor: pointer;
              outline: none;
            }
          }
          .inputPhoto {
            z-index: 3000;
            background: blue;
          }

          .pen {
            border-radius: 500px;
            left: 0;
            width: 7vw;
            height: 7vw;
            background: none;
            align-self: center;
          }
        }
        .Profile-name {
          display: grid;
          grid-area: Profile-name;
          display: flex;
          flex-direction: column;
          justify-content:flex-start;
          align-items:center;
          padding-top: 0;
          h1 {
            font-size: 1.8em;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 600;
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
          h2 {
            font-size: 1.2em;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 300;
            margin-left: 0;
            margin-top: 0.2em;
            margin-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
            height: 4vh;
            width: auto;
            color: #202124;
          }
        }
      }

      .edit-section {
        display: grid;
        grid-area: edit-section;
        width: 100%;
        grid-template-areas: "Profile-content";

        .Profile-content {
          display: grid;
          width: 100%;
          height: 100%;
          grid-area: Profile-content;
          grid-template-areas: "label" "label" "label" "label" "label" "label" "label" "button";

          .label {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-left:2vw;
            margin-right:2vw;
            margin-top:0;


            h2 {
              display: grid;
              grid-area: title;
              font-weight: 300;
              font-size: 1em;
              color: #202124;
              margin: 0px;
              width: 100%;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
                sans-serif;
              justify-self: center;
            }

            .group {
              display: grid;
              grid-area: group;
              grid-template-areas: "input arrow";
              width: 100%;

              input {
                background: none;
                color: #202124;
                border: none;
                box-shadow: none;
                outline: none;
                opacity: 0.8;
                margin-top: 0;
              }

              .mail {
                font-size: 1em;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                  "Helvetica Neue", sans-serif;
                font-weight: 300;
                margin-left: 2em;
                height: 6vh;
                width: 80vw;
                transition: all ease-in-out 0.5s;
                border-bottom: solid 2px #202124;
                &:focus {
                  opacity: 0.8;
                  outline: none;
                  border-bottom: solid 2px #ef0023;
                }
              }

              .select {
                color: #202124;
                background: none;
                font-size: 1em;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                  "Helvetica Neue", sans-serif;
                font-weight: 300;
                margin-left: 2em;
                height: 6vh;
                width: 80vw;
                transition: all ease-in-out 0.5s;
                border: none;
                outline: none;
                border-bottom: solid 2px #202124;
                &:focus {
                  opacity: 0.8;
                  outline: none;
                  border-bottom: solid 2px #ef0023;
                }
              }

              .icon {
                display: flex;
                align-self: center;
                font-size:5vw;
              }
            }
          }
        }
      }
    }
  }}
  @media only screen and (max-width: 735px)  {
    .navb {
      margin: 0;
      width: 100%;
      height: 14vh;
      display: flex;
    }

    .error{
      display: flex;
      position: absolute;
      height: 100vh;
      width: 100vw;
      background:transparent;
      z-index: 3000;
      transition: all ease-in-out 0.3s;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      &:after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        z-index: 1;
        height: 100%;
        background: #202124;
        opacity: 0.4;
      }
  
      .error-message{
        display: flex;
        position: absolute;
        height: 20vh;
        width: 80vw;
        background:#fafafa;
        z-index: 3000;
        top:50%;
        left:50%;
        transform:translate(-50%);
        padding-left:0.5em;
        padding-right:0.5em;
        text-align:center;
        
        flex-direction:column;
        justify-content:center;
        align-items:center;
        h4{
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          color:#ef0023;
          font-size:1em;
  
    
        }
        .boton-error{
          border: solid 2px #ef0023;
          color: white;
          padding: 0.6rem;
          font-size: 0.8em;
          width: 30vw;
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
      }}
    .boton {
      border: solid 2px #ef0023;
      color: white;
      padding: 0.9rem;
      font-size: 0.6em;
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
      height: 20vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 0;
      padding-bottom: 0.1vh;
    }
    overflow-y:scroll;

    .driver-profile {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-areas:
        "profile"
        "edit-section"
        "edit-section";

      .profile {
        display: grid;
        grid-area: profile;
        grid-template-areas: "edit" "Profile-name" ;

        .edit {
          display: grid;
          grid-area: edit;
          .photo {
            border-radius: 500px;
            border: solid 0.2em #ef0023;
            width: 30vw;
            height: 30vw;
            display: relative;
            margin: auto;
            background: #fafafa;
          }
          .settings {
            border-radius: 500px;
            display: flex;
            position: absolute;
            margin-top: 18vw;
            padding: 0.2em;
            border: solid 0.1em #ef0023;
            width: 15vw;
            height: 15vw;
            background: white;
            cursor: pointer;
            cursor: pointer;
            outline: none;
            margin-left: 42%;
            transform: translateX(-42%);

            z-index: 100;
            &:hover {
              cursor: pointer;
              outline: none;
            }
          }
          .saveP {
            border-radius: 500px;
            margin-left: 0;
            left: 0;
            margin-top: 4vw;
            margin-left: 49%;
            transform: translateX(-49%);
            display: flex;
            position: absolute;
            padding: 0.2em;
            border: solid 0.1em #ef0023;
            width: 12vw;
            height: 12vw;
            background: white;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            outline: none;

            z-index: 2000;
            &:hover {
              cursor: pointer;
              outline: none;
            }
          }
          .inputPhoto {
            z-index: 3000;
            background: blue;
          }

          .pen {
            border-radius: 500px;
            left: 0;
            width: 14vw;
            height: 14vw;
            background: none;
            align-self: center;
          }
        }
        .Profile-name {
          display: grid;
          grid-area: Profile-name;
          display: flex;
          flex-direction: column;
          justify-content:flex-start;
          align-items:center;
          padding-top: 0;
          h1 {
            font-size: 1.4em;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 600;
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
          h2 {
            font-size: 1em;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 300;
            margin-left: 0;
            margin-top: 0.2em;
            margin-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
            height: 4vh;
            width: auto;
            color: #202124;
          }
        }
      }

      .edit-section {
        display: grid;
        grid-area: edit-section;
        width: 100%;
        grid-template-areas: "Profile-content";
        padding-left:0;
        padding-top:0;
       

        .Profile-content {
          display: grid;
          width: 100%;
          height: 100%;
          grid-area: Profile-content;
          grid-template-areas: "label" "label" "label" "label" "label" "label""label""button";

          .label {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-left:2vw;
            margin-right:2vw;


            h2 {
              display: grid;
              grid-area: title;
              font-weight: 300;
              font-size: 0.8em;
              color: #202124;
              margin: 0px;
              width: 100%;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
                sans-serif;
              justify-self: center;
            }

            .group {
              display: grid;
              grid-area: group;
              grid-template-areas: "input arrow";
              width: 100%;

              input {
                background: none;
                color: #202124;
                border: none;
                box-shadow: none;
                outline: none;
                opacity: 0.8;
                margin-top: 0;
              }

              .mail {
                font-size: 1em;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                  "Helvetica Neue", sans-serif;
                font-weight: 300;
                margin-left: 2em;
                height: 6vh;
                width: 80vw;
                transition: all ease-in-out 0.5s;
                border-bottom: solid 2px #202124;
                &:focus {
                  opacity: 0.8;
                  outline: none;
                  border-bottom: solid 2px #ef0023;
                }
              }

              .select {
                color: #202124;
                background: none;
                font-size: 1em;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                  "Helvetica Neue", sans-serif;
                font-weight: 300;
                margin-left: 2em;
                height: 6vh;
                width: 80vw;
                transition: all ease-in-out 0.5s;
                border: none;
                outline: none;
                border-bottom: solid 2px #202124;
                &:focus {
                  opacity: 0.8;
                  outline: none;
                  border-bottom: solid 2px #ef0023;
                }
              }

              .icon {
                display: flex;
                align-self: center;
                font-size:5vw;
              }
            }
          }
        }
      }
    }
  }}

 
`;
