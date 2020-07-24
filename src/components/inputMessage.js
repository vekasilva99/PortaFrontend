import React, { useContext } from "react";
import { MDBBtn, MDBIcon, MDBRow } from "mdbreact";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { CREATE_MESSAGE } from "../helpers/graphql/mutations";
import { useSelector } from "react-redux";
import { FiSend } from "react-icons/fi";

import PropTypes from 'prop-types'

/**
 * 
 */

export default function InputMessage({ postId, color }) {
  const { _id, role, name, lastName, currentOrder } = useSelector((state) => ({
    ...state.User,
  }));
  // const alert = useAlert();
  const [CreateMessage, { data, loading, error }] = useMutation(CREATE_MESSAGE);
  // const [CreateNotification, { data: CreateNotificationData }] = useMutation(
  //   CREATE_NOTIFICATION
  // );
  return (
    <StyledInput color={color}>
      <MDBRow className="inputMessage">
        <Formik
          initialValues={{ message: "" }}
          validate={(values) => {
            var errors = {};
            if (values.message.trim().length > 255) {
              errors.username = "No more 255 characters";
              return errors;
            }

            if (values.message.trim().length === 0) {
              errors.username = "required";
              return errors;
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            let rece;
            if (_id === currentOrder.repartidor._id) {
              rece = currentOrder.user._id;
            } else {
              rece = currentOrder.repartidor._id;
            }
            console.log(rece);
            try {
              const { data } = await CreateMessage({
                variables: {
                  messageInput: {
                    content: values.message,
                    order: currentOrder._id,
                    sender: _id,
                    receiver: rece,
                  },
                },
              });

              console.log(values.message);
              setSubmitting(false);
            } catch (err) {
              alert.error("Error");
              setSubmitting(false);
            }
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
              <input
                id="message"
                name="message"
                value={values.message}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                disabled={isSubmitting}
              />
              {/* {loading ? (
              <Spinner />
            ) : ( */}
              <button type="submit" className="boton" disabled={isSubmitting}>
                <FiSend />
              </button>
              {/* )} */}
            </form>
          )}
        </Formik>
      </MDBRow>
    </StyledInput>
  );
}

const StyledInput = styled.div`
  display: flex;
  background: #fafafa;
  align-self: flex-end;
  width: 100%;
  height: 10vh;
  bottom: 0;
  left: 0;
  .inputMessage {
    display: flex;
    align-self: flex-end;
    position: relative;
    width: 100%;
    align-items: center;
    background: $background-sideBar;
    padding: 0 1rem 0 1rem;
    margin: 0;
    height: 4rem;
    form {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
    .spinner-border {
      width: 1.3em;
      height: 1.3em;
    }
    input {
      width: 100%;
      max-width: 80vw;
      margin: 0;

      height: 3.5rem;
      padding: 0.3rem;
      background: #202124;
      color: #fafafa;
      border: none;
      border-radius: 10px;
      padding-left: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      &:focus {
        opacity: 0.8;
        outline: none;
      }
    }
    .boton {
      border: solid 2px ${(props) => props.color};
      color: white;
      padding: 0.8em;
      font-size: 0.8em;
      display: flex;
      cursor: pointer;
      background: ${(props) => props.color};
      border-radius: 1000px;
      transition: all ease-in-out 0.3s;
      justify-content: center;
      margin-left: 0.2em;

      &:hover {
        opacity: 0.8;
        background: ${(props) => props.color};
        color: white;
        border-color: ${(props) => props.color};
      }
      &:focus {
        opacity: 0.8;
        outline: none;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      }
    }
  }
`;
