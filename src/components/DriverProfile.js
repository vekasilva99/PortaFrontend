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

export default function DriverProfile(props) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 50;

  let { id } = useParams();
  const [comment, { data: dataC, error: errorC, loading: loadingC }] = useMutation(CREATE_COMMENT);

  const { loading, error, data, } = useQuery(SELECTED_DRIVER, {
    variables: { 
      driverId: id
    }
  });

  const { _id, name, lastName, role } = useSelector((state) => ({
    ...state.User,
  }));

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;


  return (
    <FormStyle>
      <div className="edit">
        {/* <FaUserAlt className="photo" color="#00507a" /> */}
        <img className="photo" src={delivery} />
      </div>
      <div className="Form">
        <div className="navb">
          <button className="saveB2" type="submit">
            {" "}
            <IoIosArrowDropleftCircle color="#00507a" size="4rem" />{" "}
          </button>
        </div>
        <div className="Profile-name">
          <div className="group">
            <h1>{data.selectedDriver.name} {data.selectedDriver.lastName}</h1>
            <StarRating />
          </div>
          <h2>{data.selectedDriver.cellphone}</h2>
          <div className="group">
            <h2>4.50</h2>
            <MdStar className="star" color="#00507a" size="1.1em" />
          </div>
        </div>
        <div className="Profile-content">
          <h1>Comments</h1>
          <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={3}
              gutter={0}
              leftChevron={
                <button>
                  {/* <IoIosArrowDropleftCircle color="#ef0023" size="4rem" /> */}
                </button>
              }
              rightChevron={
                <button>
                  {/* <IoIosArrowDropleftCircle color="#ef0023" size="4rem" /> */}
                </button>
              }
              outsideChevron
              chevronWidth={chevronWidth}
              freeScrolling={true}
            >
              <div className="card">
                <FaQuoteLeft className="quote" color="#00507a" size="0.5em" />
                <h3>Great Service!</h3>
              </div>
              <div className="card">
                <FaQuoteLeft className="quote" color="#00507a" size="0.5em" />
                <h3>Amazing!</h3>
              </div>
              <div className="card">
                <FaQuoteLeft className="quote" color="#00507a" size="0.5em" />
                <h3>Thank you!</h3>
              </div>
              <div className="card">
                <FaQuoteLeft className="quote" color="#00507a" size="0.5em" />
                <h3>Great!</h3>
              </div>
            </ItemsCarousel>
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
                
                
                const { CREATE_COMENT } = await comment({
                  variables: {
                    user: _id,
                    repartidor: data.selectedDriver._id,
                    content: values.Comentario
                  },
                });


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
                  <input
                    value={values.Comentario}
                    id="Comentario"
                    name="Comentario"
                    type="textarea"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <button className="add" type="submit" block>
                    {" "}
                    ADD{" "}
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </FormStyle>
  );
}
const FormStyle = styled.section`
  display: flex;
  position: relative;
  width: 90vw;
  margin-left: 0;
  margin-top: 0;
  
  .photo {
    border-radius: 500px;
    border: solid 0.2em #00507a;
    width: 13vw;
    height: 13vw;
    margin-left: 1vw;
  }


  .edit {
    width: 15vw;
    height: 25vh;
    margin-top: 0;
    margin-left: 0;
    display: flex;
    position: relative;
  }

  

  .Form {
    width: 90vw;
    margin-left: 0;
    margin-top: 0;
    display: flex;
    position: absolute;
  }

  .Profile-name {
    margin-top: 6vh;
    margin-left: 15vw;
    width: 45vw;
    height: 20vh;
    display: flex;
    position: fixed;
    flex-direction: column;
  }

  .Profile-content {
    margin-top: 25vh;
    margin-left: 2em;
    width: 80vw;
    display: flex;
    position: fixed;
    flex-direction: column;
  }

  .icon {
    width: 2rem;
    height: 2rem;
  }

  .group > h1 {
    font-size: 1.8em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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

  .Profile-name > h2 {
    font-size: 1.2em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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

  .Profile-content > h1 {
    font-size: 1.8em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 200;
    margin-left: 2em;
    margin-top: 0;
    margin-bottom: 1em;
    padding-top: 0;
    padding-bottom: 0;
    height: 4vh;
    width: auto;
    color: #202124;
    display: inline-block;
  }

  .comment{
      display:flex;
      flex-direction:column;
      
  }
  input {

    color: #202124;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    border: none;
    webkit-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
    moz-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
    outline: none;
    opacity: 0.8;
    margin-top: 1em;
    height: 15vh;
    width: 21vw;
    margin-left:1em;
    transition: all ease-in-out 0.5s;
    border-radius:0.2em;
    &:focus {
        opacity: 1;
        outline: none;
        webkit-box-shadow: 0px 0px 16px 1px rgba(0, 80, 120, 0.2);
    moz-box-shadow: 0px 0px 16px 1px rgba(0, 80, 120, 0.2);
    box-shadow: 0px 0px 16px 1px rgba(0, 80, 120, 0.2);
      }
  }

  .add{
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
    margin-top:1em;
    margin-left:1em;

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
  
  h2 {
    font-size: 1.5em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 200;
    margin-left: 0.5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    padding-top: 0;
    padding-bottom: 0;
    height: 4vh;
    width: auto;
    color: #202124;
    display: inline-block;
   
  }
  .group > h2 {
    font-size: 1.2em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    height: 4vh;
    width: auto;
    color: #202124;
    display: flex;
    align-self:center;
  }

  .star{
      display:flex;
      align-self:center;
      margin-left:0.2em;
  }

  .card {
    height: 15vh;
    margin: 2vh;
    width: 20vw;
    padding-top:1vh;
    padding-left: 2vw;
    text-align: left;
    color: black;
    webkit-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
    moz-box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.2);
    font-size: 1em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    border-radius:0.2em;

  }

  .card > h3 {
    font-size: 0.9em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    margin-left: 0.5em;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    height: 4vh;
    width: auto;
    color: #202124;
    display: flex;
    align-self:center;
  }


  .edit > h2 {
    display: flex;
    font-weight: 300;
    font-size: 1.2em;
    color: #202124;
    margin: 0px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    width: 8vw;
    justify-self: center;
  }
  .edit > h1 {
    display: none;
  }

  .quote{
      margin-left:0;
      margin-top:0;

  }
  .saveB {
    border: solid 2px #00507a;
    color: white;
    padding: 0.9rem;
    font-size: 0.8em;
    width: 15vw;
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
    .group {
      display: flex;
      flex-direction: row;
      width: 60vw;
    }

    .nav {
      display: none;
    }
    .saveB2 {
      display: none;
      margin-left: 10vw;
    }
  }

  @media only screen and (min-width: 1070px) {
    .label {
      align-items: center;
    }
  }

  @media only screen and (max-width: 734px) {
    width: 100vw;
    height: 100vh;
    .photo {
      width: 20vw;
      height: 20vw;
      margin-left: 0;
    }
    .settings {
      margin-top: 7vw;
      margin-left: 40vw;
      padding: 0.1em;
      border: solid 0.1em #00507a;
      width: 8vw;
      height: 8vw;
      background: white;
      align-self: center;
      justify-self: center;
    }

    .edit {
      width: 100vw;
      height: 15vh;
      margin-top: 10vh;
      margin-left: 0;
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
    }

    .Profile-name {
      margin-top: 12vh;
      margin-left: 0;
      width: 100vw;
      height: 10vh;
      display: flex;
      position: fixed;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .Profile-content {
      margin-top: 28vh;
      margin-left: 0;
      width: 100vw;
      height: 70vh;
      display: flex;
      position: absolute;
      flex-direction: column;
    }

    .navb {
      width: 100vw;
      height: 10vh;
      margin-top: 0;
      display: flex;
      position: relative;
      align-items: center;
    }

    .label {
      display: flex;
      height: auto;
      width: 90vw;
      margin-left: 1em;
      margin-right: 1em;
      flex-direction: column;
      font-weight: 100;
      margin-bottom: 0;
      justify-self: none;
      align-self: left;
      align-items: left;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      border-top: solid 2px #00507a;
    }

    .label > h2 {
      display: flex;
      font-weight: 300;
      font-size: 1em;
      color: #202124;
      margin: 0px;
      margin-bottom: 0;
      margin-top: 0;
      margin-left: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      width: 90vw;
      height: 1vh;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      justify-self: none;
      align-self: left;
    }

    .mail {
      font-size: 1.5em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: 200;
      margin-left: 0;
      margin-right: 0;
      margin-top: 0.2em;
      height: 4vh;
      width: 90vw;
      padding-top: 0.2em;
      padding-bottom: 0.2em;
      transition: all ease-in-out 0.5s;
      border-bottom: none;
      border-top: none;
      color: #202124;
      display: flex;
      align-self: center;
      &:focus {
        opacity: 0.8;
        outline: none;
        broder: none;
      }
    }

    .select {
      color: #202124;
      background: none;
      font-size: 1.5em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: 200;
      margin-left: 0;
      margin-right: 0;
      margin-top: 0.2em;
      height: 5vh;
      width: 90vw;
      padding-top: 0.2em;
      padding-bottom: 0.2em;
      transition: all ease-in-out 0.5s;
      border-bottom: none;
      border-top: none;
      display: flex;
      align-self: center;
      &:focus {
        opacity: 0.8;
        outline: none;
        border-bottom: solid 2px #00507a;
      }
    }

    .icon {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-self: center;
    }
    .group {
      display: flex;
      flex-direction: row;
    }

    .saveB {
      display: none;
    }

    .saveB2 {
      border: none;
      color: white;
      padding-left: 1em;
      font-size: 1em;
      width: 50vw;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      background: none;
      border-radius: 500px;
      transition: all ease-in-out 0.3s;
      justify-self: center;
      align-self: center;
      margin-top: 0;

      &:focus {
        opacity: 0.8;
        outline: none;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      }
    }
  }
`;
