import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Input from "../Input";
import Button from "../Button";
import { FaUserAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import user from "../../assets/images/user.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { IoIosArrowDropleftCircle } from "react-icons/io";

export default function UserProfileForm(props) {
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
        {/* <FaUserAlt className="photo" color="#00507a" /> */}
        <img className="photo" src={user} />
        <MdModeEdit className="settings" color="#00507a" />
      </div>
      <div className="Form">
        <Formik
          initialValues={{
            Email: "vekasilva99@gmail.com",
            Password: "211ce496Vale",
            Phone: "04241952718",
            FName: "Valeska",
            LName: "Silva",
            BDate: new Date(moment()),
            Region: "Hatillo",
          }}
          validate={(values) => {
            const errors = {};
            console.log(values);
            if (!values.Email) {
              errors.Email = "Required Field";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)
            ) {
              errors.Email = "Invalid Email";
              console.log("sa");
            }
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
              <div className="navb">
                <button className="saveB2" type="submit">
                  {" "}
                  <IoIosArrowDropleftCircle color="#00507a" size="4rem" />{" "}
                </button>
              </div>
              <div className="Profile-name">
                <h1>Valeska Silva</h1>
                <input
                  className="phone"
                  value={values.Phone}
                  label="Enter your Phone"
                  id="Phone"
                  name="Phone"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
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
                  <h2>Email</h2>
                  <div className="group">
                    <input
                      className="mail"
                      value={values.Email}
                      label="Enter your Email"
                      id="Email"
                      type="text"
                      name="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <MdKeyboardArrowRight className="icon" color="#00507a" />
                  </div>
                </div>
                <div className="label">
                  <h2>Birthdate</h2>
                  <div className="group">
                    <DatePicker
                      className="mail"
                      selected={values.BDate}
                      maxDate={new Date(moment())}
                      onChange={handleChange}
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
                <div className="label">
                  <button className="saveB" type="submit" block>
                    {" "}
                    SAVE CHANGES{" "}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
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
    border: solid 0.2em #00507a;
    width: 13vw;
    height: 13vw;
    margin-left: 1vw;
  }
  button {
    display: none;
  }
  .settings {
    border-radius: 500px;
    margin-left: 0;
    left: 0;
    margin-top: 8vw;
    display: flex;
    position: absolute;
    padding: 1em;
    border: solid 0.1em #00507a;
    width: 2vw;
    height: 2vw;
    background: white;
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
    margin-top: 6vh;
    margin-left: 15vw;
    width: 45vw;
    height: 20vh;
    display: flex;
    position: fixed;
    flex-direction: column;
  }

  .Profile-content {
    margin-top: 25vh;
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
  input {
    background: none;
    color: #202124;
    border: none;
    box-shadow: none;
    outline: none;
    opacity: 0.8;
    margin-top: 0;
  }
  .Fname-Lname {
    display: flex;
    flex-direction: row;
    height: 4vh;
  }
  .Profile-name > h1 {
    font-size: 1.8em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  .phone {
    font-size: 1.1em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    margin-left: 0;
    margin-top: 0.5em;
    padding-top: 0;
    padding-bottom: 0;
    height: 2.5vh;
    width: 25vw;
  }
  .mail {
    font-size: 1em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    margin-left: 2em;
    height: 6vh;
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
    background: none;
    font-size: 1em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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

  .label > h2 {
    display: flex;
    font-weight: 300;
    font-size: 1.2em;
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
    border: solid 2px #00507a;
    color: white;
    padding: 0.9rem;
    font-size: 0.8em;
    width: 15vw;
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
      border: solid 0.1em #00507a;
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
      border-top: solid 2px #00507a;
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
        border-bottom: solid 2px #00507a;
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
