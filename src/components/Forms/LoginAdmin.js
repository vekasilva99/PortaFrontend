import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import Input from "../Input";
import Button from "../Button";
import { useLazyQuery } from "@apollo/react-hooks";
//import { LOGIN_USER } from "../../helpers/graphql/queries";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../../helpers/graphql/mutations";
import Spinner from "../Spinner";
import { useDispatch, useSelector } from "react-redux";

export default function FormLoginAdmin(props) {
  //const [login, { data, loading, error }] = useLazyQuery(LOGIN_USER);

  const [
    login,
    { data, loading, error },
  ] = useMutation(LOGIN_USER);

  const { name, role } = useSelector((state) => ({
    ...state.User,
  }));
  const dispatch = useDispatch();
  const [log, setLog] = useState(false);

  // useEffect(() => {
  //   if (data && !log) {
  //     localStorage.setItem("token", data.userLogin.token);

  //     dispatch({
  //       type: "LOGIN",
  //       payload: {
  //         token: data.userLogin.token,
  //         role: "ADMIN",
  //       },
  //     });
  //     setLog(true);
  //   }
  // }, [data, dispatch, loading, log]);

  return log && name ? (
    <Redirect to="/admin" />
  ) : (
    <>
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

          // login({
          //   variables: {
          //     mail: Email,
          //     password: Password,
          //     role: "ADMIN",
          //   },
          // });

          const { data } = await login({
            variables:{
              mail: Email,
              password: Password,
              role: "ADMIN",
            }
          });

          if (data && data.userLogin) {
            localStorage.setItem("token", data.userLogin.token);
            dispatch({
              type: "CURRENT_USER",
              payload: {
                token: data.userLogin.token,
                ...data.userLogin.user,
              },
            });
            
            setLog(true);
          }
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
            <Spinner color={props.color} />
          ) : (
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
              <div>{error  ? error.graphQLErrors[0].message : ""}</div>

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
    </>
  );
}
