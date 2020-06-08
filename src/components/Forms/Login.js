import React, { useState } from "react";
import { Formik } from "formik";
import Input from "../Input";
import Button from "../Button";
import { useLazyQuery } from "@apollo/react-hooks";
import { LOGIN_SESION } from "../../helpers/graphql/queries";
import Spinner from "../Spinner";
export default function FormLogin(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [isRepartidor, setIsRepartidor] = useState(false);

  const [login, { data, loading, error }] = useLazyQuery(LOGIN_SESION);
  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.userLogin);
    }
  }, [data, loading]);
  return (
    <Formik
      initialValues={{
        Email: "",
        Password: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.Email) {
          errors.Email = "Required Field";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)
        ) {
          errors.Email = "Invalid Email";
        }
        if (!values.Password) {
          errors.Password = "Required Field";
        } else if (values.Password.length < 9) {
          errors.Password = "Password too short";
        }

        return console.log(errors);
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        /// code here
        //event.preventDefault();
        const email = values.Email;
        const password = values.Password;

        if (email.trim() === 0 || password.trim() === 0) {
          return;
        }
        console.log("llega aca");
        

        const { data } = await login({
          variables: {
            mail: email,
            password,
          },
        });
        console.log(data);
        setSubmitting(true);
        console.log(values, values.Password.length);

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
          <Button color={props.color} type="submit" block>
            {" "}
            SIGN IN{" "}
          </Button>
        </form>
      )}
    </Formik>
  );
}
