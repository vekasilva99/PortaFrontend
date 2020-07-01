import React, { useState, useContext } from "react";
import { MDBModal, MDBModalHeader, MDBModalBody } from "mdbreact";
import { Formik } from "formik";
import { MDBBtn, MDBIcon } from "mdbreact";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER } from "../../helpers/graphql/mutations";
import UploadImage from "../uploadImage.js";

import Spinner from "../spinner.js";
import { useDispatch, useSelector } from "react-redux";

export default function Settings({ isOpen, toggle }) {
  const { username, name, userImg, userId } = useSelector(state => ({
    ...state.User
  }));
  const dispatch = useDispatch();
  const [updateUserr, { data, loading, error }] = useMutation(UPDATE_USER);

  const [urlImg1, setUrlImg] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const updateUser = (username, name, userImg) => {
    dispatch({
      type: "UPDATE_USER",
      payload: {
        username,
        name,
        userImg
      }
    });
  };
  React.useEffect(() => {
    setUrlImg(userImg);
  }, [userImg]);
  const handlingLoadImage = value => {
    setIsLoad(value);
  };
  const onImageUrl = url => {
    setUrlImg(url);
  };
  return (
    <MDBModal className="settings" size="fluid" isOpen={isOpen} toggle={toggle}>
      <MDBModalHeader toggle={toggle}> Settings</MDBModalHeader>

      <MDBModalBody>
        <Formik
          initialValues={{ username: username, name: name, password: "" }}
          validate={values => {
            var errors = {};
            if (values.username.length > 30)
              errors.username = "No more 30 characters";
            if (values.username.length <= 0) {
              errors.username = "rellene el campo";
            }
            if (values.name.length > 30) errors.name = "No more 30 characters";
            if (values.name.length <= 0) {
              errors.name = "rellene el campo";
            }
            if (values.password.length > 30)
              errors.password = "No more 30 characters";
            if (values.password.length <= 0) {
              errors.password = "rellene el campo";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            const { data } = await updateUserr({
              variables: {
                userInput: {
                  _id: userId,
                  name: values.name,
                  username: values.username,
                  password: values.password,
                  urlImg: urlImg1
                }
              }
            });
            if (data) {
              updateUser(values.username, values.name, urlImg1);
              toggle();
            }

            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              {urlImg1.length > 0 && !isLoad && (
                <MDBBtn
                  htmlFor="uploadImage"
                  className="loadPhoto"
                  tag={props => <label {...props} />}
                >
                  <img src={urlImg1} alt="" />
                </MDBBtn>
              )}
              {urlImg1.length > 0 && isLoad && (
                <MDBBtn
                  htmlFor="uploadImage"
                  className="loadPhoto"
                  tag={props => <label {...props} />}
                >
                  <Spinner />
                </MDBBtn>
              )}
              {urlImg1.length <= 0 && isLoad && (
                <MDBBtn
                  htmlFor="uploadImage"
                  className="loadPhoto"
                  tag={props => <label {...props} />}
                >
                  <Spinner />
                </MDBBtn>
              )}
              {urlImg1.length <= 0 && !isLoad && (
                <MDBBtn
                  htmlFor="uploadImage"
                  className="loadPhoto"
                  tag={props => <label {...props} />}
                >
                  <MDBIcon icon="upload" />
                </MDBBtn>
              )}

              <UploadImage
                id="uploadImage"
                onImageUrl={onImageUrl}
                handlingLoadImage={handlingLoadImage}
              />
              <div
                className={
                  values.username.length > 0
                    ? "form-group not-empty form-icon"
                    : "form-group form-icon"
                }
              >
                <input
                  className="form-control"
                  id="username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                <label className="animated-label" htmlFor="username">
                  {" "}
                  Username{" "}
                </label>
                <MDBIcon icon="user" />
              </div>
              <div
                className={
                  values.name.length > 0
                    ? "form-group not-empty form-icon"
                    : "form-group form-icon"
                }
              >
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <label className="animated-label" htmlFor="name">
                  {" "}
                  Name{" "}
                </label>
                <MDBIcon icon="user" />
              </div>
              <div
                className={
                  values.password.length > 0
                    ? "form-group not-empty form-icon"
                    : "form-group form-icon"
                }
              >
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <label className="animated-label" htmlFor="password">
                  {" "}
                  Password{" "}
                </label>
                <MDBIcon icon="lock" />
              </div>

              <MDBBtn
                className="btn-primary-color"
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </MDBBtn>
              {error && (
                <span>
                  {" "}
                  {error.graphQLErrors.map(({ message }) => message)}{" "}
                </span>
              )}
            </form>
          )}
        </Formik>
      </MDBModalBody>
    </MDBModal>
  );
}
