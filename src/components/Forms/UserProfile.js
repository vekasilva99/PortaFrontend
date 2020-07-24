import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Input from "../Input";
import Button from "../Button";
import axios from "axios";
import { FiLogIn } from "react-icons/fi";
import { MdSave } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import user from "../../assets/images/user.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER } from "../../helpers/graphql/mutations";
import { UPDATE_PROFILE_PIC } from "../../helpers/graphql/mutations";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { storage } from "../firebaseconfig";
import Spinner from "../Spinner";

export default function UserProfileForm(props) {
  const [region, setRegion] = React.useState("");
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [photo1, setPhoto] = React.useState(null);
  const [url, setUrl] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [photo1E, setPhotoE] = React.useState(null);
  const [log, setLog] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const logOut = (e) => {
    console.log("log Out");
    setLog(true);
    console.log(log);
  };

  React.useEffect(() => {
    if (log) {
      localStorage.clear();
      dispatch({
        type: "LOGOUT",
      });
    }
  }, [log]);

  const {
    _id,
    role,
    name,
    lastName,
    birthdate,
    mail,
    zone,
    cellphone,
    userImageURL,
  } = useSelector((state) => ({
    ...state.User,
  }));

  const dispatch = useDispatch();
  const [
    updateProfilePic,
    { data: dataP, error: errorP, loading: loadingP },
  ] = useMutation(UPDATE_PROFILE_PIC);
  const [
    update,
    { data: dataU, loading: loadingU, error: errorU },
  ] = useMutation(UPDATE_USER);

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
      {photo1E ? (
        <div className="error">
          <div className="error-message">
            <h4>{photo1E}</h4>
            <button
              className="boton-error"
              onClick={() => {
                setPhotoE(null);
              }}
            >
              ACCEPT
            </button>
          </div>
        </div>
      ) : null}
      {dataP && dataP.updateProfilePic ? (
        <div className="error">
          <div className="error-message">
            <h4>Your Profile Picture Has Been Updated</h4>
            <button
              className="boton-error"
              onClick={() => {
                window.location.reload(true);
              }}
            >
              ACCEPT
            </button>
          </div>
        </div>
      ) : null}
      {dataU && dataU.updateUser ? (
        <div className="error">
          <div className="error-message">
            <h4>Your Profile Has Been Updated</h4>
            <button
              className="boton-error"
              onClick={() => {
                window.location.reload(true);
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
            <Formik
              initialValues={{
                photo: null,
              }}
              validate={(values) => {
                const errors = {};

                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                /// code here
                //event.preventDefault();
                setSubmitting(true);
                console.log(photo1);
                let image = new FormData();
                let file = document.querySelector("#photoId");
                image.append("image", file.files[0]);
                console.log(image);
                const userId = _id;
                if (photo1) {
                  const uploadTask = storage
                    .ref(`images/${photo1.name}`)
                    .put(photo1);
                  uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                      const progress = Math.round(
                        (snapshot.bytesTransfered / snapshot.totalBytes) * 100
                      );
                      setProgress(progress);
                    },
                    (error) => {
                      setPhotoE(error);
                      console.log(error);
                    },
                    () => {
                      storage
                        .ref("images")
                        .child(photo1.name)
                        .getDownloadURL()
                        .then(async (url) => {
                          const { data: dataP } = await updateProfilePic({
                            variables: {
                              imageURL: url,
                            },
                          });
                          if (dataP && dataP.updateProfilePic) {
                            dispatch({
                              type: "UPDATE_USER",
                              payload: {
                                userImageURL: url,
                              },
                            });
                          }

                          setProgress(0);
                          setPhoto(null);
                        });
                    }
                  );
                } else {
                  setPhotoE("Please Select An Image to Upload");
                }

                setSubmitting(false);
                resetForm();
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                /* and other goodies */
              }) => (
                <>
                  <Form
                    onSubmit={handleSubmit}
                    className="formP"
                    encType="multipart/form-data"
                  >
                    <div className="edit">
                      {userImageURL ? (
                        <img className="photo" src={userImageURL} />
                      ) : (
                        <img className="photo" src={user} />
                      )}

                      <Field
                        className="inputPhoto"
                        type="file"
                        name="image"
                        id="photoId"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];

                          if (file) {
                            const fileType = file["type"];
                            const validImageTypes = [
                              "image/gif",
                              "image/jpeg",
                              "image/png",
                            ];
                            if (validImageTypes.includes(fileType)) {
                              setPhotoE(null);
                              setPhoto(event.currentTarget.files[0]);
                            } else {
                              setPhotoE("Please Select An Image to Upload");
                              console.log("Please Select An Image to Upload");
                            }
                          } else {
                          }
                        }}
                      />

                      <label
                        htmlFor="photoId"
                        className="settings"
                        type="button"
                      >
                        <MdModeEdit
                          className="pen"
                          color="#00507a"
                          size="1em"
                        />
                      </label>

                      {photo1 ? (
                        <button type="submit" className="saveP">
                          <MdSave
                            className="save"
                            color="#00507a"
                            size="1.5em"
                          />
                        </button>
                      ) : null}
                    </div>
                  </Form>
                </>
              )}
            </Formik>
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
              Password: "211ce496Vale",
              Phone: cellphone,
              FName: name,
              LName: lastName,
              BDate: new Date(moment(birthdate)),
              Region: zone,
            }}
            validate={(values) => {
              const errors = {};
              console.log(values);

              if (!values.Password) {
                errors.Password = "Required Field";
              } else if (values.Password.length < 9) {
                errors.Password = "Password too short";
                console.log("entra 2");
              }
              if (
                values.Phone.slice(0, 4) == "0424" ||
                values.Phone.slice(0, 4) == "0414" ||
                values.Phone.slice(0, 4) == "0412" ||
                values.Phone.slice(0, 4) == "0416"
              ) {
                console.log("entra 2");
              } else {
                errors.Phone = "Invalid Phone Code";
              }
              if (
                !/^\+?([0-9]{4})?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(
                  values.Phone
                ) ||
                values.Phone == ""
              ) {
                errors.Phone = "Invalid Phone Number";
              }
              console.log(errors);
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              if (selectedDate === null) {
                const { data: dataU } = await update({
                  variables: {
                    updateInput: {
                      id: _id,
                      name: values.FName,
                      lastName: values.LName,
                      mail: values.Email,
                      birthdate: new Date(moment(birthdate)),
                      zone: values.Region,
                    },
                  },
                });

                if (dataU && dataU.updateUser) {
                  dispatch({
                    type: "UPDATE_USER",
                    payload: {
                      name: values.FName,
                      lastName: values.LName,
                      mail: values.Email,
                      birthdate: new Date(moment(birthdate)),
                      zone: values.Region,
                    },
                  });
                }
              } else {
                const { data: dataU } = await update({
                  variables: {
                    updateInput: {
                      id: _id,
                      name: values.FName,
                      lastName: values.LName,
                      mail: values.Email,
                      birthdate: new Date(moment(selectedDate)),
                      zone: values.Region,
                    },
                  },
                });

                if (dataU && dataU.createUser) {
                  dispatch({
                    type: "UPDATE_USER",
                    payload: {
                      name: values.FName,
                      lastName: values.LName,
                      mail: values.Email,
                      birthdate: new Date(moment(selectedDate)),
                      zone: values.Region,
                    },
                  });
                }
              }

              console.log(values.BDate);

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
                    <h2>First Name</h2>
                    <div className="group">
                      <input
                        className="mail"
                        value={values.FName}
                        label="Enter your First Name"
                        id="FName"
                        name="FName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <MdKeyboardArrowRight color="#00507a" className="icon" />
                    </div>
                  </div>
                  <div className="label">
                    <h2>Last Name</h2>
                    <div className="group">
                      <input
                        className="mail"
                        value={values.LName}
                        label="Enter your Last Name"
                        id="LName"
                        name="LName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <MdKeyboardArrowRight color="#00507a" className="icon" />
                    </div>
                  </div>
                  <div className="label">
                    <h2>Birthdate</h2>
                    <div className="group">
                      <DatePicker
                        className="mail"
                        selected={
                          !selectedDate
                            ? new Date(moment(birthdate))
                            : selectedDate
                        }
                        maxDate={new Date(moment())}
                        onChange={(date) => setSelectedDate(date)}
                        placeholderText="Choose a Date"
                      />
                      <MdKeyboardArrowRight className="icon" color="#00507a" />
                    </div>
                  </div>
                  <div className="label">
                    <h2>Region</h2>
                    <div className="group">
                      <select
                        className="select"
                        name="Region"
                        value={values.Region}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="" label="Choose a Region" />
                        <option value="Hatillo" label="El Hatillo" />
                        <option value="Baruta" label="Baruta" />
                      </select>
                      <MdKeyboardArrowRight color="#00507a" className="icon" />
                    </div>
                  </div>
                  <div className="botonContainer2">
                  {!loadingU ? (
                    <button className="boton" type="submit">
                      {" "}
                      SAVE CHANGES{" "}
                    </button>
                  ) : (
                    <Spinner color={"#00507a"}></Spinner>
                  )}
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </FormStyle>
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
        color:#00507a;
        font-size:1em;

  
      }
      .boton-error{
        border: solid 2px #00507a;
        color: white;
        padding: 0.6rem;
        font-size: 0.8em;
        width: 10vw;
        display: flex;
        font-weight: 600;
        cursor: pointer;
        background: #00507a;
        border-radius: 500px;
        transition: all ease-in-out 0.3s;
        justify-content: center;
        &:hover {
          opacity: 0.8;
          background: #00507a;
          color: white;
          border-color: #00507a;
        }
        &:focus {
          opacity: 0.8;
          outline: none;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        }

      }
    }}
  

  .boton {
    border: solid 2px #00507a;
    color: white;
    padding: 0.9rem;
    font-size: 0.8em;
    width: 20vw;
    display: flex;
    font-weight: 600;
    cursor: pointer;
    background: #00507a;
    border-radius: 500px;
    transition: all ease-in-out 0.3s;
    justify-content: center;

    &:hover {
      opacity: 0.8;
      background: #00507a;
      color: white;
      border-color: #00507a;
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
          border: solid 0.2em #00507a;
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
          border: solid 0.1em #00507a;
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
          border: solid 0.1em #00507a;
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

      .Profile-content {
        display: grid;
        width: 100%;
        height: 100%;
        grid-area: Profile-content;
        grid-template-areas: "label" "label" "label" "label" "label" "button";

        .label {
          display: flex;
          flex-direction: row;
          width: 100%;

          h2 {
            display: grid;
            grid-area: title;
            font-weight: 300;
            font-size: 1.2em;
            color: #202124;
            margin: 0px;
            width: 5vw;
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
              background: #fafafa;
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
              background: #fafafa;
              width: 40vw;
              transition: all ease-in-out 0.5s;
              border-bottom: solid 2px #202124;
              &:focus {
                opacity: 0.8;
                outline: none;
                border-bottom: solid 2px #00507a;
              }
            }

            .select {
              color: #202124;
              background: #fafafa;
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
                border-bottom: solid 2px #00507a;
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
          color:#00507a;
          font-size:1em;
  
    
        }
        .boton-error{
          border: solid 2px #00507a;
          color: white;
          padding: 0.6rem;
          font-size: 0.8em;
          width: 30vw;
          display: flex;
          font-weight: 600;
          cursor: pointer;
          background: #00507a;
          border-radius: 500px;
          transition: all ease-in-out 0.3s;
          justify-content: center;
          &:hover {
            opacity: 0.8;
            background: #00507a;
            color: white;
            border-color: #00507a;
          }
          &:focus {
            opacity: 0.8;
            outline: none;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
          }
  
        }
      }}
    .boton {
      border: solid 2px #00507a;
      color: white;
      padding: 0.9rem;
      font-size: 0.8em;
      width: 40vw;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      background: #00507a;
      border-radius: 500px;
      transition: all ease-in-out 0.3s;
      justify-content: center;

      &:hover {
        opacity: 0.8;
        background: #00507a;
        color: white;
        border-color: #00507a;
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
        grid-template-areas: "edit" "Profile-name" ;

        .edit {
          display: grid;
          grid-area: edit;
          .photo {
            border-radius: 500px;
            border: solid 0.2em #00507a;
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
            border: solid 0.1em #00507a;
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
            border: solid 0.1em #00507a;
            width: 8vw;
            height: 8vw;
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
          .save{
            width:7vw;
            height:7vw;
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
          grid-template-areas: "label" "label" "label" "label" "label" "button";

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
              font-size: 1.2em;
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
                  border-bottom: solid 2px #00507a;
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
                  border-bottom: solid 2px #00507a;
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
      background:#fafafa;
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
        background: #fafafa;
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
          color:#00507a;
          font-size:1em;
  
    
        }
        .boton-error{
          border: solid 2px #00507a;
          color: white;
          padding: 0.6rem;
          font-size: 0.8em;
          width: 30vw;
          display: flex;
          font-weight: 600;
          cursor: pointer;
          background: #00507a;
          border-radius: 500px;
          transition: all ease-in-out 0.3s;
          justify-content: center;
          &:hover {
            opacity: 0.8;
            background: #00507a;
            color: white;
            border-color: #00507a;
          }
          &:focus {
            opacity: 0.8;
            outline: none;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
          }
  
        }
      }}
    .boton {
      border: solid 2px #00507a;
      color: white;
      padding: 0.9rem;
      font-size: 0.6em;
      width: 40vw;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      background: #00507a;
      border-radius: 500px;
      transition: all ease-in-out 0.3s;
      justify-content: center;

      &:hover {
        opacity: 0.8;
        background: #00507a;
        color: white;
        border-color: #00507a;
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
      align-items: flex-start;
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
        grid-template-areas: "edit" "Profile-name" ;

        .edit {
          display: grid;
          grid-area: edit;
          .photo {
            border-radius: 500px;
            border: solid 0.2em #00507a;
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
            border: solid 0.1em #00507a;
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
            margin-top: 23vw;
            margin-left: 49%;
            transform: translateX(-49%);
            display: flex;
            position: absolute;
            padding: 0.2em;
            border: solid 0.1em #00507a;
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
            height: 10vw;
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
            height: 8vw;
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
          grid-template-areas: "label" "label" "label" "label" "label" "button";

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
                height: 10vw;
                width: 80vw;
                transition: all ease-in-out 0.5s;
                border-bottom: solid 2px #202124;
                &:focus {
                  opacity: 0.8;
                  outline: none;
                  border-bottom: solid 2px #00507a;
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
                height: 10vw;
                width: 80vw;
                transition: all ease-in-out 0.5s;
                border: none;
                outline: none;
                border-bottom: solid 2px #202124;
                &:focus {
                  opacity: 0.8;
                  outline: none;
                  border-bottom: solid 2px #00507a;
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
