import React from "react";
import { Formik } from "formik";
import Input from "../Input";
import Button from "../Button";
export default function FormLogin() {
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
          />

          <Input
            value={values.Password}
            label="Enter your password"
            id="Password"
            type="password"
            name="Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button type="submit" block>
            {" "}
            SIGN IN{" "}
          </Button>
        </form>
      )}
    </Formik>
  );
}
