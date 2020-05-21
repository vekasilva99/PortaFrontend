import React from "react";
import { Formik } from "formik";
import Input from "../Input";
import Button from "../Button";
export default function FormLogin() {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Campo requerido";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Email Inválido";
        }
        if (!values.password) {
          errors.nombre = "Campo Requerido";
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        /// code here

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
            value={values.nombre}
            label="nombre"
            id="nombre"
            name="nombre"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Input
            value={values.password}
            label="password"
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button type="submit" block>
            {" "}
            Enviar{" "}
          </Button>
        </form>
      )}
    </Formik>
  );
}
