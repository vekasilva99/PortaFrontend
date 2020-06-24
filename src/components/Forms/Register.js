import React from "react";
import { Formik } from "formik";
import Input from "../Input";
import Button from "../Button";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER } from "../../helpers/graphql/mutations";

export default function FormRegister(props) {
  const [register, { data, loading, error }] = useMutation(REGISTER_USER);
  const [step1, setStep1] = React.useState(true);
  const [step2, setStep2] = React.useState(true);
  const [phone, setPhone] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);

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
    } else {
      setStep1(false);
    }
  };

  const handleStep2 = (e) => {
    if (!fName || !lName || !selectedDate || !region) {
      setStep2(true);
      console.log(phone, "telefono");
    } else {
      setStep2(false);
      console.log(phone, "telefono");
    }
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
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
        }}
        validate={(values) => {
          const errors = {};
          if (!values.Email) {
            errors.Email = "Required Field";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)
          ) {
            errors.email = "Invalid Email";
          }
          if (!values.Password) {
            errors.Password = "Required Field";
          } else if (values.Password.length < 9) {
            errors.Password = "Password too short";
          } else if (values.Password !== values.Password2) {
            errors.Password = "Password doesn't match";
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
                role: "COSTUMER",
              },
            },
          });

          console.log(data);
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
            {step2 ? (
              <div>
                {step1 ? (
                  <div>
                    <Input
                      value={phone}
                      label="Enter your phone number"
                      id="Phone"
                      name="Phone"
                      type="text"
                      onChange={handlePhone}
                      onBlur={handleBlur}
                      color={props.color}
                    />

                    <div className="button">
                      <Button color={props.color} onClick={handleStep1} block>
                        {" "}
                        CONTINUE{" "}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="input2">
                      <Input
                        value={fName}
                        label="Enter your First Name"
                        id="FName"
                        name="FName"
                        type="text"
                        onChange={handleFName}
                        onBlur={handleBlur}
                        color={props.color}
                      />
                      <Input
                        value={lName}
                        label="Enter your Last Name"
                        id="LName"
                        name="LName"
                        type="text"
                        onChange={handleLName}
                        onBlur={handleBlur}
                        color={props.color}
                      />
                    </div>
                    <div className="input2">
                      <div>
                        <label className="dos">Choose Birthdate</label>
                        <DatePicker
                          className="picker"
                          selected={selectedDate}
                          maxDate={new Date(moment())}
                          onChange={(date) => setSelectedDate(date)}
                          placeholderText="Choose a Date"
                        />
                      </div>

                      <div>
                        <label className="dos">Select your Region</label>
                        <select
                          name="region"
                          value={region}
                          onChange={handleRegion}
                          onBlur={handleBlur}
                          className="select"
                        >
                          <option value="" label="Choose a Region" />
                          <option value="Hatillo" label="El Hatillo" />
                          <option value="Baruta" label="Baruta" />
                        </select>
                      </div>
                    </div>
                    <div className="button">
                      <Button color={props.color} onClick={handleStep2} block>
                        {" "}
                        CONTINUE{" "}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Input
                  value={values.Email}
                  label="Enter your email"
                  id="Email"
                  name="Email"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  color={props.color}
                />
                <div className="input2">
                  <Input
                    value={values.Password}
                    label="Enter your password"
                    id="Password"
                    type="password"
                    name="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color={props.color}
                  />
                  <Input
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

                <div className="button">
                  <Button color={props.color} type="submit" block>
                    {" "}
                    SIGN UP{" "}
                  </Button>
                </div>
              </div>
            )}
          </form>
        )}
      </Formik>
    </RegisterView>
  );
}
const RegisterView = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  justify-content: space-between;
  label {
    font-size: 1em;
    font-weight: 200;
    color: ${(props) => props.color};
    margin: 0.2rem;
    cursor: pointer;
    margin-top: 2rem;
  }
  input {
    background: none;
    font-size: 1em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    color: ${(props) => props.color};
    border: none;
    border-bottom: solid 2px #ebebeb;
    box-shadow: none;
    outline: none;
    transition: all ease-in-out 0.5s;
    opacity: 0.8;
    margin: 0;
    margin-top: 1rem;
    padding: 0.3rem 0.5rem;
    width: 80%;

    &:focus {
      opacity: 1;
      outline: none;
      box-shadow: none;
      border-bottom: solid 2px ${(props) => props.color};
    }
  }

  .input2 {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 600px;
    align-items: center;
    justify-content: center;
  }

  .button {
    margin-top: 2rem;
    margin-bottom: -3rem;
  }

  .dos {
    font-size: 1em;
    font-weight: 200;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: #fafafa;
    cursor: pointer;
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    width: inerit;
  }

  .picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Roboto;
    margin-bottom: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    &:focus {
      opacity: 1;
      outline: none;
      box-shadow: none;
      border-bottom: solid 2px #0a95bf;
    }
  }

  .select {
    background: none;
    font-size: 1em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    color: grey;
    border: none;
    border-bottom: solid 2px #ebebeb;
    box-shadow: none;
    outline: none;
    transition: all ease-in-out 0.5s;
    opacity: 0.8;
    margin-top: 1.1rem;
    margin-bottom: 0;
    margin-left: 0;
    bottom: 0;
    padding-bottom: 0.35rem;
    &:focus {
      opacity: 1;
      outline: none;
      box-shadow: none;
      border-bottom: solid 2px #0a95bf;
    }
  }
`;
