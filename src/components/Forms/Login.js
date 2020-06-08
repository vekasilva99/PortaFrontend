import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import Input from "../Input";
import Button from "../Button";
import { useLazyQuery } from "@apollo/react-hooks";
<<<<<<< HEAD
import { LOGIN_USER } from "../../helpers/graphql/queries";
=======
import { LOGIN_SESION } from "../../helpers/graphql/queries";
>>>>>>> 995e15369fbd49466f4314686a9465110aee7427
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
          console.log("sa");
        }
        if (!values.Password) {
          errors.Password = "Required Field";
          console.log("entra");
        } else if (values.Password.length < 9) {
          errors.Password = "Password too short";
          console.log("entra 2");
        }
        console.log(errors);
        return errors;
      }}
      onSubmit={async ({ Email, Password }, { setSubmitting, resetForm }) => {
        /// code here
        //event.preventDefault();

        if (Email.trim() === 0 || Password.trim() === 0) {
          return;
        }
        console.log("llega aca");
<<<<<<< HEAD
        /*   let requestBody = {
          query: `
            query{
              userLogin(mail: "${email}", password: "${password}"){
                userId
                token
                tokenExpiration
              }
            `,
          };
        } else {
          requestBody = {
            query: `
              query{
                adminLogin(mail: "${email}", password: "${password}"){
                  adminId
                  token
                  tokenExpiration
                }
              }
            `,
          };
        }

        fetch("https://porta-api.herokuapp.com/graphql/", {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error("Failed!");
            }
            return res.json();
          })
          .then((resData) => {
            console.log(resData);
          })
          .catch((err) => {
            console.log(err);
          });
   */
=======
        
>>>>>>> 995e15369fbd49466f4314686a9465110aee7427

        login({
          variables: {
            mail: Email,
            password: Password,
          },
        });
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
        /* and other goodies */
      }) =>
        loading ? (
          <Spinner></Spinner>
        )
        :data ? <Redirect to="/user"/>: (
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
        )
      }
    </Formik>
  );
}
