import React from "react";
import { Formik } from "formik";
import Input from "../Input";
import Button from "../Button";
import styled from "styled-components";
import DatePicker from "react-datepicker";
// import DatePicker from "../DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function FormRegister() {
  const [step1, setStep1] = React.useState(true);
  const [step2, setStep2] = React.useState(true);
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleStep1 = (e) => {
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
          } else if (values.Password != values.Password2) {
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
                    />

                    <div className="button">
                      <Button onClick={handleStep1} block>
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
                      />
                      <Input
                        value={lName}
                        label="Enter your Last Name"
                        id="LName"
                        name="LName"
                        type="text"
                        onChange={handleLName}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="input2">
                      <div className="picker">
                        <div>
                          <label className="dos">Select your Birthdate</label>
                          <DatePicker
                            selected={selectedDate}
                            maxDate={new Date(moment())}
                            onChange={(date) => setSelectedDate(date)}
                            placeholderText="Choose a Date"
                          />
                        </div>
                      </div>
                      <div className="picker">
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
                    </div>
                    <div className="button">
                      <Button onClick={handleStep2} block>
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
                  />
                  <Input
                    value={values.Password2}
                    label="Confirm password"
                    id="Password2"
                    type="password"
                    name="Password2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="button">
                  <Button type="submit" block>
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
  justify-content: space-between;
  label {
    font-size: 1em;
    font-weight: 600;
    color: black;
    margin: 0.2rem;
    cursor: pointer;
    margin-top: 2rem;
  }
  input {
    background: none;
    font-size: 1em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    color: black;
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
      border-bottom: solid 2px #29e2f3;
    }
  }

  .input2 {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: auto;
  }

  .button {
    margin-top: 2rem;
    margin-bottom: -3rem;
  }

  .dos {
    font-size: 1em;
    font-weight: 600;
    color: black;
    cursor: pointer;
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .picker {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: auto;
    align-items: center;
    justify-content: center;
    font-family: Roboto;
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
    margin-top: 1rem;
    padding: 0.3rem 0.5rem;
    width: 100%;
  }
`;
