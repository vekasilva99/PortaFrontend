import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import Input from "../Input";
import Button from "../Button";
import styled from "styled-components";
import { useLazyQuery } from "@apollo/react-hooks";
//import { LOGIN_USER } from "../../helpers/graphql/queries";
import { LOGIN_USER } from "../../helpers/graphql/mutations";
import { useMutation } from "@apollo/react-hooks";
import Spinner from "../Spinner";
import { useDispatch, useSelector } from "react-redux";

/**
 * Componente para loguear como Repartidor
 */

export default function FormLoginDriver(props) {
  //const [login, { data, loading, error }] = useLazyQuery(LOGIN_USER);

  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const { name, role } = useSelector((state) => ({
    ...state.User,
  }));
  const [log, setLog] = useState(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (data && !log) {
  //     localStorage.setItem("token", data.userLogin.token);
  //     dispatch({
  //       type: "LOGIN",
  //       payload: {
  //         token: data.userLogin.token,
  //         role: "DRIVER",
  //       },
  //     });
  //     setLog(true);
  //   }
  // }, [data, dispatch, log]);

  return log ? (
    <Redirect to="maprep" />
  ) : (
    <>
      <StyledForm>
        <Formik
          initialValues={{
            Email: "",
            Password: "",
          }}
          validate={(values) => {
            const errors = {};

            console.log(errors);
            return errors;
          }}
          onSubmit={async (
            { Email, Password },
            { setSubmitting, resetForm }
          ) => {
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
            //     role: "DRIVER",
            //   },
            // });

            const { data } = await login({
              variables: {
                mail: Email,
                password: Password,
                role: "DRIVER",
              },
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
                {error ? (
                  <div className="error">{error.graphQLErrors[0].message}</div>
                ) : null}
                <div className="buttonC">
                  <Button color={props.color} type="submit" block>
                    {" "}
                    SIGN IN{" "}
                  </Button>
                </div>
              </form>
            )
          }
        </Formik>
      </StyledForm>
    </>
  );
}

FormLoginDriver.propTypes = {
  /** Mutation */
  LOGIN_USER:PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
  name:PropTypes.string.isRequired,
  password:PropTypes.string.isRequired,
  mail:PropTypes.string.isRequired,
  color:PropTypes.string.isRequired,
}

const StyledForm = styled.div`
  .error {
    width: 100%;
    text-align: center;
    margin-top: 1em;
    color: #ef0023;
  }
  .buttonC {
    margin-top: 3em;
  }
`;
