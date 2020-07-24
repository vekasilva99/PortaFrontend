import React from "react";
import { Formik } from "formik";
import Button from "../Button";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER } from "../../helpers/graphql/mutations";
import Spinner from "../Spinner";

export default function FormRegister(props) {
  const [register, { data, loading, error }] = useMutation(REGISTER_USER);
  const [step1, setStep1] = React.useState(true);
  const [step2, setStep2] = React.useState(true);
  const [step3, setStep3] = React.useState(true);
  const [phone, setPhone] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const [passwordE, setPasswordE] = React.useState(null);
  const [passwordCE, setPasswordCE] = React.useState(null);
  const [phoneE, setPhoneE] = React.useState(null);
  const [regionE, setRegionE] = React.useState(null);
  const [emailE, setEmailE] = React.useState(null);
  const [selectedDateE, setSelectedDateE] = React.useState(null);
  const [fNameE, setFNameE] = React.useState(null);
  const [lNameE, setLNameE] = React.useState(null);
  const [cedula, setCedula] = React.useState("");
  const [cedulaE, setCedulaE] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [errorF, setErrorF] = React.useState(true);
  //const [regionE, setRegionE] = React.useState(false);
  //const [emailE, setEmailE] = React.useState(false);
  //const [passwordE, setPasswordE] = React.useState(false);
  //const [passwordCE, setPasswordCE] = React.useState(false);
  //const [selectedDateE, setSelectedDateE] = React.useState(false);
  //const [phoneE, setPhoneE] = React.useState(null);
  //const [cedulaE, setCedulaE] = React.useState(null);

  const handleStep1 = (e) => {
    console.log(props.color);
    let codigos = false;
    if (
      phone.slice(0, 4) == "0424" ||
      phone.slice(0, 4) == "0414" ||
      phone.slice(0, 4) == "0412" ||
      phone.slice(0, 4) == "0416"
    ) {
      codigos = true;
    } else {
      codigos = false;
    }

    if (
      (phone &&
        !/^\+?([0-9]{4})?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(phone)) ||
      phone == "" ||
      codigos === false
    ) {
      setStep1(true);
      if (
        codigos === false ||
        (phone &&
          !/^\+?([0-9]{4})?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(phone))
      ) {
        setPhoneE("Invalid  Phone  Number");
      }
      if (phone === "") {
        setPhoneE("Required Field");
      }
    } else {
      setStep1(false);
    }
  };

  const handleStep3 = (e) => {
    if (!fName || !lName || !selectedDate || !region) {
      setStep3(true);
      if (!selectedDate) {
        setSelectedDateE("Required Field");
      }
      if (!region) {
        setRegionE("Required Field");
      }
      if (!region) {
        setFNameE("Required Field");
      }
      if (!region) {
        setLNameE("Required Field");
      }
    } else {
      setStep3(false);
    }
  };

  const handleStep2 = (e) => {
    if (!cedula || cedula < 1000000 || cedula > 100000000) {
      setStep2(true);
      if (!cedula) {
        setCedulaE("Required Field");
      }
      if (cedula < 1000000 || cedula > 100000000) {
        setCedulaE("Invalid ID");
      }
    } else {
      setStep2(false);
    }
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleCedula = (e) => {
    setCedula(e.target.value);
  };

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
    <RegisterView>
      <>
        {data && data.createUser ? (
          <div className="error-m">
            <div className="error-message">
              <h4>User Has Been Created!</h4>
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

        <Formik
          initialValues={{
            Email: "",
            Password: "",
            Password2: "",
            Phone: "",
            FName: "",
            LName: "",
            BDate: "",
            Region: "",
            Cedula: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.Email) {
              errors.Email = "Required Field";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)
            ) {
              errors.email = "Invalid Email";
              setEmailE("Invalid Email");
            }
            if (
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)
            ) {
              setEmailE(null);
            }
            if (!values.Password) {
              errors.Password = "Required Field";
              setPasswordCE("Required Field");
            } else if (values.Password.length < 9) {
              errors.Password = "Password too short";
              setPasswordE("Password too short");
            } else if (values.Password !== values.Password2) {
              errors.Password = "Password doesn't match";
              setPasswordCE("Password doesn't match");
            }
            if (values.Password.length >= 9) {
              setPasswordE(null);
            }
            if (values.Password === values.Password2) {
              setPasswordCE(null);
            }
            if (!errors.Password && !errors.Email) {
              setErrorF(false);
            }
            return console.log(errors);
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            /// code here
            console.log(phone);
            let submitUser = [
              {
                UserPhone: phone,
                FirstName: fName,
                LastName: lName,
                Password: values.Password,
                Email: values.Email,
                Birthdate: selectedDate,
                Region: region,
                Cedula: cedula,
              },
            ];

            const { data } = await register({
              variables: {
                userInput: {
                  name: submitUser[0].FirstName,
                  lastName: submitUser[0].LastName,
                  birthdate: submitUser[0].Birthdate,
                  mail: submitUser[0].Email,
                  password: submitUser[0].Password,
                  zone: submitUser[0].Region,
                  cellphone: submitUser[0].UserPhone,
                  cedula: submitUser[0].Cedula,
                  role: "DRIVER",
                },
              },
            });

            setSubmitting(true);
            console.log(submitUser);
            setStep1(true);
            setStep2(true);
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              {step3 ? (
                <div>
                  {step2 ? (
                    <div>
                      {step1 ? (
                        <div>
                          <div className="inputG">
                            <label>Enter your phone number</label>
                            <input
                              value={phone}
                              label="Enter your phone number"
                              id="Phone"
                              name="Phone"
                              type="text"
                              onChange={handlePhone}
                              onBlur={handleBlur}
                              color={props.color}
                            />
                          </div>
                          {phoneE ? (
                            <div className="error">
                              <h4>{phoneE}</h4>
                            </div>
                          ) : null}

                          <div className="buttonS">
                            <Button
                              color={props.color}
                              onClick={handleStep1}
                              block
                              style={{ margin: "0 auto" }}
                            >
                              {" "}
                              CONTINUE{" "}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="inputG">
                            <label>Enter your ID</label>
                            <input
                              value={cedula}
                              label="Enter your ID"
                              id="Cedula"
                              name="Cedula"
                              type="number"
                              min="1000000"
                              max="100000000"
                              onChange={handleCedula}
                              onBlur={handleBlur}
                              color={props.color}
                            />
                          </div>
                          {phoneE ? (
                            <div className="error">
                              <h4>{cedulaE}</h4>
                            </div>
                          ) : null}

                          <div className="buttonS">
                            <Button
                              color={props.color}
                              onClick={handleStep2}
                              block
                              style={{ margin: "0 auto" }}
                            >
                              {" "}
                              CONTINUE{" "}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="step2">
                      <div className="info">
                        <div className="FName">
                          <div className="inputP">
                            <label>Enter your First Name</label>
                            <input
                              value={fName}
                              label="Enter your First Name"
                              id="FName"
                              name="FName"
                              type="text"
                              onChange={handleFName}
                              onBlur={handleBlur}
                              color={props.color}
                              className="nInput"
                            />
                          </div>
                          {fNameE ? (
                            <div className="error">
                              <h4>{fNameE}</h4>
                            </div>
                          ) : null}
                        </div>
                        <div className="LName">
                          <div className="inputP">
                            <label>Enter your Last Name</label>
                            <input
                              value={lName}
                              label="Enter your Last Name"
                              id="LName"
                              name="LName"
                              type="text"
                              onChange={handleLName}
                              onBlur={handleBlur}
                              color={props.color}
                              className="nInput"
                            />
                          </div>
                          {lNameE ? (
                            <div className="error">
                              <h4>{lNameE}</h4>
                            </div>
                          ) : null}
                        </div>

                        <div className="bday">
                          <div className="inputP">
                            <label>Choose Birthdate</label>
                            <DatePicker
                              className="picker"
                              selected={selectedDate}
                              maxDate={new Date(moment())}
                              onChange={(date) => setSelectedDate(date)}
                              placeholderText=""
                            />
                          </div>
                          {selectedDateE ? (
                            <div className="error">
                              <h4>{selectedDateE}</h4>
                            </div>
                          ) : null}
                        </div>

                        <div className="region">
                          <div className="inputP">
                            <label>Select your Region</label>
                            <select
                              name="region"
                              value={region}
                              onChange={handleRegion}
                              onBlur={handleBlur}
                              className="select"
                            >
                              <option value="" label="" />
                              <option value="Hatillo" label="El Hatillo" />
                              <option value="Baruta" label="Baruta" />
                            </select>
                          </div>
                          {regionE ? (
                            <div className="error">
                              <h4>{regionE}</h4>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="buttonC">
                        <Button color={props.color} onClick={handleStep3} block>
                          {" "}
                          CONTINUE{" "}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="step3">
                  <div className="email">
                    <div className="inputG">
                      <label>Enter your Email</label>
                      <input
                        value={values.Email}
                        label="Enter your email"
                        id="Email"
                        name="Email"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color={props.color}
                      />
                    </div>
                    {emailE ? (
                      <div className="error">
                        <h4>{emailE}</h4>
                      </div>
                    ) : null}
                  </div>
                  <div className="pass">
                    <div className="password">
                      <div className="inputP">
                        <label>Enter your Password</label>
                        <input
                          value={values.Password}
                          label="Enter your password"
                          id="Password"
                          type="password"
                          name="Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          color={props.color}
                        />
                      </div>
                      {passwordE ? (
                        <div className="error">
                          <h4>{passwordE}</h4>
                        </div>
                      ) : null}
                    </div>

                    <div className="passwordC">
                      <div className="inputP">
                        <label>Confirm password</label>
                        <input
                          value={values.Password2}
                          label="Confirm password"
                          id="Password2"
                          type="password"
                          name="Password2"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          color={props.color}
                        />
                      </div>
                      {passwordCE ? (
                        <div className="error">
                          <h4>{passwordCE}</h4>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="buttonF">
                    {error ? (
                      <div className="error">
                        {error.graphQLErrors[0] ? (
                          <h4>{error.graphQLErrors[0].message}</h4>
                        ) : (
                          <h4>There was an Error! Please Try Again.</h4>
                        )}
                      </div>
                    ) : null}
                    {!loading ? (
                        <Button disabled={errorF} color={props.color} type="submit">
                          {" "}
                          SIGN UP{" "}
                        </Button>
                    ) : (
                          <Spinner color={"#ef0023"}></Spinner>
                    )}
                    
                  </div>
                </div>
              )}
            </form>
          )}
        </Formik>
      </>
    </RegisterView>
  );
}
const RegisterView = styled.div`
display: flex;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
justify-content: center;
align-items: center;
width: 100%;
.error-m{
  display: flex;
  position: fixed;
  top:0;
  left:0;
  height: 100%;
  width: 100%;
  justify-content:center;
  align-items:center;
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
    height: 50vh;
    width: 35vw;
    background:#202124;
    z-index: 3000;
    
    padding-left:0.5em;
    padding-right:0.5em;
    text-align:center;
    
    flex-direction:column;
    justify-content:center;
    align-items:center;
    h4{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      color:#fafafa;
      font-size:1em;
    }
    .boton-error{
      border: solid 2px #ebebeb;
      color: #202124;
      padding: 0.6rem;
      font-size: 0.8em;
      width: 10vw;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      background: #ebebeb;
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
.buttonS {
  margin-top: 3em;
}
.step2 {
  margin-top: 1vh;
  width: 100%;
  display: grid;
  grid-template-areas:
    "info"
    "button";
  .info {
    margin-top: 0;
    width: 100%;
    display: grid;
    grid-template-areas:
      "name lname"
      "date region";
    .FName {
      margin: 0;
      padding-top: 10%;
      padding-bottom: 15%;
      padding-left: 9%;
      padding-right: 9%;
      width: 100%;
      height: 20vh;
      display: grid;
      grid-template-areas: "name" "error";
    }
    .bday {
      margin: 0;
      padding-top: 5%;
      padding-bottom: 15%;
      padding-left: 9%;
      padding-right: 9%;
      width: 100%;
      height: 20vh;
      display: grid;
      grid-template-areas: "date" "error";
    }
    .region {
      margin: 0;
      padding-top: 5%;
      padding-bottom: 15%;
      padding-left: 9%;
      padding-right: 9%;
      width: 100%;
      height: 20vh;
      display: grid;
      grid-template-areas: "region" "error";
    }
    .LName {
      margin: 0;
      padding-top: 10%;
      padding-bottom: 15%;
      padding-left: 9%;
      padding-right: 9%;
      width: 100%;
      height: 20vh;
      display: grid;
      grid-template-areas: "lname" "error";
    }
  }
}
.step3 {
  margin-top: 1vh;
  width: 100%;
  display: grid;
  grid-template-areas:
    "email"
    "pass"
    "button";
  .pass {
    margin: 0;
    width: 100%;
    height: 20vh;
    display: grid;
    grid-template-areas: "password  passwordC";
  }
  .email {
    margin: 0;
    padding-top: 5%;
    padding-bottom: 15%;
    padding-left: 9%;
    padding-right: 9%;
    width: 100%;
    height: 20vh;
    display: grid;
    grid-template-areas: "email" "error";
  }
  .password {
    margin: 0;
    padding-top: 5%;
    padding-bottom: 15%;
    padding-left: 9%;
    padding-right: 9%;
    width: 100%;
    height: 20vh;
    display: grid;
    grid-template-areas: "password " "error";
  }
  .passwordC {
    margin: 0;
    padding-top: 5%;
    padding-bottom: 15%;
    padding-left: 9%;
    padding-right: 9%;
    width: 100%;
    height: 20vh;
    display: grid;
    grid-template-areas: "passwordC" "error";
  }
}
.buttonC {
  width: 100%
  margin: 0;
  display: grid;
  justify-content: center;
  grid-template-areas: "error" "button ";
}
.buttonF {
  width: 100%
  margin: 0;
  display: grid;
  justify-content: center;
  grid-template-areas: "error" "button ";
}
.inputG {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  label {
    font-size: 1em;
    font-weight: 200;
    color: #fafafa;
    margin: 0.2rem;
    cursor: pointer;
    margin-top: 1rem;
  }
  input {
    background: none;
    font-size: 1em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    color: #fafafa;
    border: none;
    border-bottom: solid 2px #ebebeb;
    box-shadow: none;
    outline: none;
    transition: all ease-in-out 0.5s;
    opacity: 0.8;
    margin-top: 1.5rem;
    padding: 0.3rem 0.5rem;
    margin-left: 0;
    width: 25vw;
    &:focus {
      opacity: 1;
      outline: none;
      box-shadow: none;
      border-bottom: solid 2px #ef0023;
    }
  }
}
.error {
  width: 100%;
  margin-top: 0.1em;
  margin-bottom: 0.1em;
  display: grid;
  text-align: center;
  h4 {
    color: #ef0023;
    font-size: 12px;
  }
}
.inputP {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  label {
    font-size: 1em;
    font-weight: 200;
    color: #fafafa;
    margin: 0.2rem;
    cursor: pointer;
    margin-top: 1rem;
  }
  input {
    background: none;
    font-size: 1em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    color: #fafafa;
    border: none;
    border-bottom: solid 2px #ebebeb;
    box-shadow: none;
    outline: none;
    transition: all ease-in-out 0.5s;
    opacity: 0.8;
    margin-top: 1.5rem;
    padding: 0.3rem 0.5rem;
    margin-left: 0;
    width: 12.5vw;
    &:focus {
      opacity: 1;
      outline: none;
      box-shadow: none;
      border-bottom: solid 2px #ef0023;
    }
  }
  select {
    background: none;
    font-size: 1em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    color: #fafafa;
    border: none;
    border-bottom: solid 2px #ebebeb;
    box-shadow: none;
    outline: none;
    transition: all ease-in-out 0.5s;
    opacity: 0.8;
    margin-top: 1.5rem;
    padding: 0.4rem 0.5rem;
    margin-left: 0;
    width: 12.5vw  ;
    bottom: 0;
    padding-bottom: 0.35rem;
    width: 12.5vw  ;
    &:focus {
      opacity: 1;
      outline: none;
      box-shadow: none;
      border-bottom: solid 2px #ef0023;
    }
  }
}
@media only screen and (max-width: 734px) {
  .buttonS {
    margin-top: 2em;
  }
  .error-m{
    display: flex;
    position: fixed;
    height: 100%;
    width: 100%;
    justify-content:center;
    align-items:center;
    background:transparent;
    z-index: 3000;
    transition: all ease-in-out 0.3s;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    &:after {
      position:  fixed;
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
      height: 70vh;
      width: 100vw;
      background:#202124;
      z-index: 3000;
      margin:0 auto;
      padding-left:0.5em;
      padding-right:0.5em;
      text-align:center;
      
      flex-direction:column;
      justify-content:center;
      align-items:center;
      h4{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        color:#fafafa;
        font-size:1em;
  
      }
      .boton-error{
        border: solid 2px #ebebeb;
        color: #202124;
        padding: 0.6rem;
        font-size: 0.8em;
        width: 30vw;
        display: flex;
        font-weight: 600;
        cursor: pointer;
        background: #ebebeb;
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
  .step2 {
    margin-top: 0;
    width: 100%;
    display: grid;
    grid-template-areas:
      "info"
      "button";
    .info {
      margin-top: 0;
      width: 100%;
      display: grid;
      justify-content: center;
      margin-top:2vh;
      margin-bottom:0;
      grid-template-areas:
        "name" "lname"
        "date" "region";
      .FName {
        margin: 0;
        margin-top:1em;
        padding-top: 0;
        padding-bottom: 0;
        width: 100%;
        height: 10vh;
        display: grid;
        grid-template-areas: "name" "error";
      }
      .bday {
        margin: 0;
        margin-top:1em;
        padding-top: 0;
        padding-bottom: 0;
        width: 100%;
        height: 10vh;
        display: grid;
        grid-template-areas: "date" "error";
      }
      .region {
        margin: 0;
        margin-top:1em;
        padding-top: 0;
        padding-bottom: 0;
        width: 100%;
        height: 10vh;
        display: grid;
        grid-template-areas: "region" "error";
      }
      .LName {
        margin: 0;
        margin-top:1em;
        padding-top: 0;
        padding-bottom: 0;
        width: 100%;
        height: 10vh;
        display: grid;
        grid-template-areas: "lname" "error";
      }
    }
  }
  .step3 {
    margin-top: 2vh;
    width: 100%;
    display: grid;
    justify-content: center;
  
   
    grid-template-areas:
      "email"
      "pass"
      "buttonC";
    .pass {
      margin: 0;
      width: 100%;
      height: auto;
      display: grid;
      margin-bottom:8vh;
  
      justify-content: center;
      grid-template-areas: "password" "passwordC";
    }
    .email {
      margin: 0;
      padding-top: 5%;
      padding-bottom: 15%;
      width: 100%;
      height: 15vh;
      display: grid;
      justify-content: center;
      grid-template-areas: "email" "error";
    }
    .password {
      margin: 0;
      padding-top: 5%;
      padding-bottom: 15%;
      padding-left: 0;
      padding-right: 0;
      width: 100%;
      height: 15vh;
      display: grid;
      grid-template-areas: "password " "error";
    }
    .passwordC {
      margin: 0;
      padding-top: 5%;
      padding-bottom: 15%;
      padding-left: 0;
      padding-right: 0;
      width: 100%;
      height: 15vh;
      display: grid;
      grid-template-areas: "passwordC" "error";
    }
  
  }
  .buttonC {
    width: 100%;
    margin: 0;
    padding-top:8vh;
    margin-top: 0;
    display: grid;
    justify-content: center;
    grid-template-areas: "error" "button";
   
  }
  .buttonF {
    width: 100%;
    margin: 0;
    margin-top: 2vh;
    display: grid;
    justify-content: center;
    grid-template-areas: "error" "button";
  }
  .inputG {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    label {
      display: block;
      text-align: center;
      font-size: 0.8em;
      font-weight: 200;
      color: #fafafa;
      margin: 0.2em;
      cursor: pointer;
      margin-top: 1em;
    }
    input {
      background: none;
      font-size: 1em;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      color: #fafafa;
      border: none;
      border-bottom: solid 2px #ebebeb;
      box-shadow: none;
      outline: none;
      transition: all ease-in-out 0.5s;
      opacity: 0.8;
      margin-top: 0em;
      padding: 0.3rem 0.5rem;
      margin-left: 0;
      width: 80vw;
      &:focus {
        opacity: 1;
        outline: none;
        box-shadow: none;
        border-bottom: solid 2px #ef0023;
      }
    }
  }
  .error {
    width: 100%;
    margin-top: 0.1em;
    margin-bottom: 0.5em;
    display: grid;
    text-align: center;
    h4 {
      color: #ef0023;
      font-size: 12px;
    }
  }
  .inputP {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    label {
      display: block;
      text-align: center;
      font-size: 0.8em;
      font-weight: 200;
      color: #fafafa;
      margin: 0.2rem;
      cursor: pointer;
      margin-top: 1em;
    }
    input {
      background: none;
      font-size: 1em;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      color: #fafafa;
      border: none;
      border-bottom: solid 2px #ebebeb;
      box-shadow: none;
      outline: none;
      transition: all ease-in-out 0.5s;
      opacity: 0.8;
      margin-top: 0em;
      padding: 0.3rem 0.5rem;
      margin-left: 0;
      width: 80vw;
      &:focus {
        opacity: 1;
        outline: none;
        box-shadow: none;
        border-bottom: solid 2px #ef0023;
      }
    }
    select {
      background: none;
      font-size: 1em;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      color: #fafafa;
      border: none;
      border-bottom: solid 2px #ebebeb;
      box-shadow: none;
      outline: none;
      transition: all ease-in-out 0.5s;
      opacity: 0.8;
      margin-top: 0em;
      padding: 0.4rem 0.5rem;
      margin-left: 0;
      width: 80vw;
      &:focus {
        opacity: 1;
        outline: none;
        box-shadow: none;
        border-bottom: solid 2px #ef0023;
      }
    }
  }
}
@media only screen and (min-width: 735px) and (max-width: 1069px)  {
  
  .inputP{
    text-align:center;
    width:100%;
    input{
       width:25vw;
    }
    select{
      width:25vw;
    }
    .picker{
      width:25vw;
      margin-left:0;
    }
   
      
    }
  .inputG{
    text-align:center;
    input{
      width:80%;
    }
    select{
      width:100%;
    }
  }
  form{
    width:100%;
  }
  .error-m{
    display: flex;
    position: fixed;
    top:0;
    left:0;
    height: 100%;
    width: 100%;
    justify-content:center;
    align-items:center;
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
      height: 55vh;
      width: 100%;
      background:#202124;
      z-index: 3000;
      
      padding-left:0.5em;
      padding-right:0.5em;
      text-align:center;
      
      flex-direction:column;
      justify-content:center;
      align-items:center;
      h4{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        color:#fafafa;
        font-size:1em;
  
      }
      .boton-error{
        border: solid 2px #ebebeb;
        color: #202124;
        padding: 0.6rem;
        font-size: 0.8em;
        width: 10vw;
        display: flex;
        font-weight: 600;
        cursor: pointer;
        background: #ebebeb;
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
 
}
`;