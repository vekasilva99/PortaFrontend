import React from "react";
import styled, { keyframes } from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { GET_ORDERS } from "../helpers/graphql/queries/index";
import { useQuery } from "@apollo/react-hooks";
import { useSubscription } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./Spinner";
import { NOTIFICATION_ADDED_SUSCRIPTION } from "../helpers/graphql/subscriptions/index";
import { ACCEPT_ORDER } from "../helpers/graphql/mutations/index";
import Checkbox from "@material-ui/core/Checkbox";

export default function Correo() {
  const [checked, setChecked] = React.useState(true);
  const [subject, setSubject] = React.useState("");
  const [text, setText] = React.useState("");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const handletextChange = (event) => {
    setText(event.target.value);
  };
  const handleSubmit = (event) => {
    console.log(text, subject);
  };

  return (
    <StyledCorreo>
      <form className="forma">
        <label className="lab">
          Subject
          <input className="sub" type="text" name="subject" value={subject} />
        </label>
        <label className="lab">
          Content
          <input className="cont" type="text" name="content" value={text} />
        </label>
        <input
          className="but"
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        />
        <div className="check">
          <h4>Correo recibido</h4>
          <Checkbox
            disabled
            checked
            inputProps={{ "aria-label": "disabled checked checkbox" }}
          />
        </div>
      </form>
    </StyledCorreo>
  );
}

const StyledCorreo = styled.nav`
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .forma {
    display: inline-grid;
  }

  .check {
    display: flex;
    /* h4 {
      margin-top: 10px;
    } */
  }

  .check {
    margin-top: 20px;
    align-items: center;
  }

  .lab {
    display: inline-grid;
  }
  .but {
    border: solid 2px #00507a;
    color: white;
    padding: 10px;
    font-size: 15px;
    width: 200px;
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

  @media only screen and (min-width: 970px) {
    .sub {
      width: 40rem;
    }
    .cont {
      width: 40rem;
      height: 300px;
    }
    .but {
      width: 200px;
    }
  }

  @media only screen and (max-width: 969px) and (min-width: 735px) {
  }

  @media only screen and (max-width: 734px) {
  }
`;
