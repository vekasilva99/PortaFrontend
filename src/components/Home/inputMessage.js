import React, { useContext } from "react";
import { MDBBtn, MDBIcon, MDBRow } from "mdbreact";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_MESSAGE,
  CREATE_NOTIFICATION,
} from "../../helpers/graphql/mutations";

import Spinner from "../spinner";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
export default function InputMessage({ postId }) {
  const { userId, creator } = useSelector((state) => ({
    ...state.User,
    ...state.Post,
  }));
  const alert = useAlert();
  const [CreateMessage, { data, loading, error }] = useMutation(CREATE_MESSAGE);
  const [CreateNotification, { data: CreateNotificationData }] = useMutation(
    CREATE_NOTIFICATION
  );
  return (
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
          try {
            const { data } = await CreateMessage({
              variables: {
                messageInput: {
                  content: values.message,
                  postId,
                  userId,
                },
              },
            });
            if (userId != creator._id) {
              if (data) {
                const { data: dataNotification } = await CreateNotification({
                  variables: {
                    notificationInput: {
                      postId,
                      userId: creator._id,
                      messageId: data.createMessage._id,
                    },
                  },
                });
              }
            }
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
              placeholder="escribe tu mensaje"
              disabled={isSubmitting}
            />
            {loading ? (
              <Spinner />
            ) : (
              <MDBBtn
                type="submit"
                className="btn-send"
                disabled={isSubmitting}
              >
                <MDBIcon icon="paper-plane" />
              </MDBBtn>
            )}
          </form>
        )}
      </Formik>
    </MDBRow>
  );
}
