import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import delivery from "../assets/images/delivery.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ItemsCarousel from "react-items-carousel";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { MdStar } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import { Formik } from "formik";
import Input from "./Input";
import StarRating from "./StarRating";
import { useParams } from "react-router";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import { SELECTED_DRIVER } from "../helpers/graphql/queries/index";
import { CREATE_COMMENT } from "../helpers/graphql/mutations/index";
import { useSelector } from "react-redux";
import Card from "./Cards/Card";

export default function DriverProfile(props) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [ratingAll, setRatingAll] = useState(0);
  const chevronWidth = 60;

  let { id } = useParams();
  const [
    comment,
    { data: dataC, error: errorC, loading: loadingC },
  ] = useMutation(CREATE_COMMENT);

  const { loading, error, data } = useQuery(SELECTED_DRIVER, {
    variables: {
      driverId: id,
    },
  });

  const { _id, name, lastName, role } = useSelector((state) => ({
    ...state.User,
  }));

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log(data);
  let allComments = data.selectedDriver.comments;
  const getAllRatin = (rating) => {
    let content = 0;
    for (let item of rating) {
      content = content + item.score;
    }
    content = content / rating.length;
    return content;
  };

  const getUserRatin = (rating) => {
    let content = 0;
    for (let item of rating) {
      if (_id === item.user._id) {
        content = item.score;
      }
    }

    return content;
  };

  return (
    <FormStyle>
      <div className="navb"></div>
      <div className="driver-profile">
        <div className="profile">
          <div className="edit">
            {data.selectedDriver.userImageURL ? (
              <img className="photo" src={data.selectedDriver.userImageURL} />
            ) : (
              <img className="photo" src={delivery} />
            )}
          </div>
          <div className="Profile-name">
            <h1>
              {data.selectedDriver.name} {data.selectedDriver.lastName}
            </h1>
            <h2>{data.selectedDriver.cellphone}</h2>
            <div className="group">
              {getAllRatin(data.selectedDriver.rating) ? (
                <>
                  <h2>{getAllRatin(data.selectedDriver.rating)}</h2>
                  <MdStar className="star" color="#00507a" size="1.1em" />
                </>
              ) : null}
            </div>
          </div>
          <div className="rating-comp">
            {" "}
            <div className="star-comp">
              <StarRating rating={getUserRatin(data.selectedDriver.rating)} />
            </div>
          </div>
          <div></div>
        </div>
        <div className="comment-section">
          {allComments.length != 0 ? (
            <>
              <h1>Comments</h1>
              <div className="comment-cards">
                <Card comments={allComments} />
              </div>
            </>
          ) : null}
          <h2>Add Comment</h2>
          <Formik
            initialValues={{
              Comentario: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.Comentario) {
                errors.Comentario = "Required Field";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const { data: dataC } = await comment({
                variables: {
                  user: _id.toString(),
                  repartidor: data.selectedDriver._id.toString(),
                  content: values.Comentario,
                },
              });

              if (dataC && dataC.createComment) {
                allComments.push(dataC.createComment);
              }

              setSubmitting(true);
              console.log(values);
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
              <form className="comment" onSubmit={handleSubmit}>
                <textarea
                  value={values.Comentario}
                  id="Comentario"
                  name="Comentario"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="comment-input"
                  maxlength="50"
                />
                <div className="botonContainer2">
                  <button className="add" type="submit" block>
                    {" "}
                    ADD{" "}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </FormStyle>
  );
}
const FormStyle = styled.section`
  margin: 0;
  width: 100%;
  height: 100%;

  .navb {
    margin: 0;
    width: 100%;
    height: 10vh;
    display: none;
  }
  .driver-profile {
    width: 100%;
    height: 100%;
    max-height: 20vh;
    display: grid;
    grid-template-areas:
      "profile"
      "comment-section";
    .profile {
      margin-left: 0;
      margin-top: 0;
      display: grid;
      grid-template-areas: "photo info rating blank";
      .edit {
        width: 100%;
        display: grid;
        grid-template-areas: "photo";
        .photo {
          border-radius: 500px;
          border: solid 0.2em #00507a;
          width: 14vw;
          height: 14vw;
          display: block;
          margin: auto;
        }
      }

      .Profile-name {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h1 {
          font-size: 1.8em;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          font-weight: 600;
          margin-left: 0;
          margin-top: 0;
          margin-bottom: 0;
          padding-top: 0;
          padding-bottom: 0;
          height: 4vh;
          width: auto;
          color: #202124;
          display: inline-block;
        }

        h2 {
          font-size: 1.2em;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          font-weight: 300;
          margin-left: 0;
          margin-top: 0.2em;
          margin-bottom: 0;
          padding-top: 0;
          padding-bottom: 0;
          height: 4vh;
          width: auto;
          color: #202124;
        }
      }
      .rating-comp {
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        .star-comp {
          display: flex;
          width: 100%;
        }
      }
      .group {
        display: flex;
        flex-direction: row;
        .star {
          display: flex;
          align-self: center;
          margin-left: 0.2em;
        }
      }
    }
    .comment-section {
      width: 100%;
      display: grid;
      grid-template-areas: "title" "cards" "add" "addcomment";
      .comment {
        display: flex;
        flex-direction: column;
      }
      h1 {
        font-size: 2em;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-weight: 200;
        margin-left: 0;
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 0;
        padding-bottom: 0;
        height: 4vh;
        width: auto;
        color: #202124;
        display: inline-block;
      }
      h2 {
        font-size: 2em;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-weight: 200;
        margin-left: 0;
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 0;
        padding-bottom: 0;
        height: 4vh;
        width: auto;
        color: #202124;
        display: inline-block;
      }

      .comment-input {
        color: #202124;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        border: none;
        webkit-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
        moz-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
        box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
        outline: none;
        background: #fafafa;
        opacity: 0.8;
        margin-top: 1em;
        height: 15vh;
        width: 21vw;
        margin-left: 1em;
        vertical-align: baseline;
        transition: all ease-in-out 0.5s;
        border-radius: 0.2em;
        &:focus {
          opacity: 1;
          outline: none;
          webkit-box-shadow: 0px 0px 16px 1px rgba(0, 80, 120, 0.2);
          moz-box-shadow: 0px 0px 16px 1px rgba(0, 80, 120, 0.2);
          box-shadow: 0px 0px 16px 1px rgba(0, 80, 120, 0.2);
        }
      }
    }

    .add {
      border: solid 2px #00507a;
      color: white;
      padding: 0.6rem;
      font-size: 0.7em;
      width: 8vw;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      background: #00507a;
      border-radius: 500px;
      transition: all ease-in-out 0.3s;
      justify-content: center;
      margin-top: 1em;
      margin-left: 1em;

      &:hover {
        opacity: 0.8;
        background: #00507a;
        color: white;
        border-color: #00507a;
      }
      &:focus {
        opacity: 0.8;
        outline: none;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      }
    }
  }

  @media only screen and (max-width: 734px) {
    .navb {
      margin: 0;
      width: 100%;
      height: 14vh;
      display: flex;
    }

    .driver-profile {
      width: 100vw;
      display: grid;
      justify-content: center;
      grid-template-areas:
        "profile"
        "comment-section";

      .profile {
        margin-left: 0;
        width: 100vw;
        margin-top: 0;

        display: grid;
        justify-content: center;
        grid-template-areas: "photo" "info" "rating" "blank";

        .edit {
          width: 100vw;
          display: grid;
          grid-template-areas: "photo";
          .photo {
            border-radius: 500px;
            border: solid 0.2em #00507a;
            max-width: 100%;
            max-height: 100%;
            width: 30vw;
            height: 30vw;
            display: block;
            margin: auto;
          }
        }

        .Profile-name {
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          h1 {
            font-size: 1.5em;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 600;
            margin-left: 0;
            margin-top: 0;
            margin-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
            height: 4vh;
            width: auto;
            color: #202124;
            display: inline-block;
          }

          h2 {
            font-size: 1em;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 300;
            margin-left: 0;
            margin-top: 0.1em;
            margin-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
            height: 4vh;
            width: auto;
            color: #202124;
          }
        }
        .rating-comp {
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;

          .star-comp {
            display: block;
            margin: auto;
            width: auto;
          }
        }
        .group {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-top: 0;
          .star {
            display: flex;
            align-self: center;
            margin-left: 0.2em;
          }
        }
      }

      .botonContainer2 {
        width: 100%;
        background: #fafafa;
        height: 18vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      .add {
        border: solid 2px #00507a;
        color: white;
        padding: 0.9rem;
        font-size: 0.8em;
        width: 40vw;
        display: flex;
        font-weight: 600;
        cursor: pointer;
        background: #00507a;
        border-radius: 500px;
        transition: all ease-in-out 0.3s;
        justify-content: center;

        &:hover {
          opacity: 0.8;
          background: #00507a;
          color: white;
          border-color: #00507a;
        }
        &:focus {
          opacity: 0.8;
          outline: none;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        }
      }
      .comment-section {
        width: 100%;
        display: grid;
        text-align: center;
        grid-template-areas: "title" "cards" "add" "addcomment";
        .comment {
          display: flex;
          flex-direction: column;
        }
        h1 {
          font-size: 1.2em;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          font-weight: 200;
          padding-top: 0;
          padding-bottom: 0;
          height: 4vh;
          width: auto;
          color: #202124;
          display: inline-block;
        }
        h2 {
          font-size: 1.2em;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          font-weight: 200;
          margin-bottom: 0.4em;
          padding-top: 0;
          padding-bottom: 1em;
          height: 4vh;
          width: auto;
          color: #202124;
          display: inline-block;
        }

        .comment-input {
          color: #202124;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          border: none;
          webkit-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
          moz-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
          box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
          outline: none;
          opacity: 0.8;
          display: block;
          margin: auto;
          height: 12vh;
          width: 80vw;
          transition: all ease-in-out 0.5s;
          border-radius: 0.2em;
          &:focus {
            opacity: 1;
            outline: none;
            webkit-box-shadow: 0px 0px 16px 1px rgba(0, 80, 120, 0.2);
            moz-box-shadow: 0px 0px 16px 1px rgba(0, 80, 120, 0.2);
            box-shadow: 0px 0px 16px 1px rgba(0, 80, 120, 0.2);
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1069px) and (min-width: 735px) {
    .navb {
      margin: 0;
      width: 100%;
      height: 10vh;
      display: flex;
    }

    .driver-profile {
      width: 100vw;
      display: grid;
      justify-content: center;
      grid-template-areas:
        "profile"
        "comment-section";

      .profile {
        margin-left: 0;
        width: 100vw;
        margin-top: 0;

        display: grid;
        justify-content: center;
        grid-template-areas: "photo" "info" "rating" "blank";

        .edit {
          width: 100vw;
          display: grid;
          grid-template-areas: "photo";
          .photo {
            border-radius: 500px;
            border: solid 0.2em #00507a;
            max-width: 100%;
            max-height: 100%;
            width: 30vw;
            height: 30vw;
            display: block;
            margin: auto;
          }
        }

        .Profile-name {
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          h1 {
            font-size: 1.8em;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 600;
            margin-left: 0;
            margin-top: 0;
            margin-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
            height: 4vh;
            width: auto;
            color: #202124;
            display: inline-block;
          }

          h2 {
            font-size: 1.4em;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 300;
            margin-left: 0;
            margin-top: 0.1em;
            margin-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
            height: 4vh;
            width: auto;
            color: #202124;
          }
        }
        .rating-comp {
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;

          .star-comp {
            display: block;
            margin: auto;
            width: auto;
          }
        }
        .group {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-top: 0;
          .star {
            display: flex;
            align-self: center;
            margin-left: 0.2em;
          }
        }
      }
      .botonContainer2 {
        width: 100%;
        background: #fafafa;
        height: 18vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      .add {
        border: solid 2px #00507a;
        color: white;
        padding: 0.9rem;
        font-size: 0.8em;
        width: 40vw;
        display: flex;
        font-weight: 600;
        cursor: pointer;
        background: #00507a;
        border-radius: 500px;
        transition: all ease-in-out 0.3s;
        justify-content: center;

        &:hover {
          opacity: 0.8;
          background: #00507a;
          color: white;
          border-color: #00507a;
        }
        &:focus {
          opacity: 0.8;
          outline: none;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        }
      }
      .comment-section {
        width: 100%;
        display: grid;
        text-align: center;
        grid-template-areas: "title" "cards" "add" "addcomment";
        .comment {
          display: flex;
          flex-direction: column;
        }
        h1 {
          font-size: 1.8em;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          font-weight: 200;
          padding-top: 0;
          padding-bottom: 0;
          height: 4vh;
          width: auto;
          color: #202124;
          display: inline-block;
        }
        h2 {
          font-size: 1.8em;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          font-weight: 200;
          margin-bottom: 0.4em;
          padding-top: 0;
          padding-bottom: 1em;
          height: 4vh;
          width: auto;
          color: #202124;
          display: inline-block;
        }

        .comment-input {
          color: #202124;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          border: none;
          webkit-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
          moz-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
          box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
          outline: none;
          opacity: 0.8;
          display: block;
          margin: auto;
          height: 12vh;
          width: 80vw;
          transition: all ease-in-out 0.5s;
          border-radius: 0.2em;
          &:focus {
            opacity: 1;
            outline: none;
            webkit-box-shadow: 0px 0px 16px 1px rgba(0, 80, 120, 0.2);
            moz-box-shadow: 0px 0px 16px 1px rgba(0, 80, 120, 0.2);
            box-shadow: 0px 0px 16px 1px rgba(0, 80, 120, 0.2);
          }
        }
      }
    }
  }
`;
