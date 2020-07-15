import React from "react";
import styled, { keyframes } from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { GET_ORDERS } from "../helpers/graphql/queries/index";
import { useQuery } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./Spinner";
import { NOTIFICATION_ADDED_SUSCRIPTION } from "../helpers/graphql/subscriptions/index";
import { useMutation } from "@apollo/react-hooks";
import { CONTACT_US } from "../helpers/graphql/mutations/index";
import Checkbox from "@material-ui/core/Checkbox";

export default function Correo({ color }) {
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

  const { _id, mail, name, lastName, role } = useSelector((state) => ({
    ...state.User,
  }));

  const [contactUs, { data, error, loading }] = useMutation(CONTACT_US);

  const sendMail = async (e) => {
    e.preventDefault();

    const { data } = await contactUs({
      variables: {
        contactInput: {
          name: name,
          lastName: lastName,
          from: mail,
          subject: subject,
          text: text,
          role: role,
        },
      },
    });
  };

  return (
    <StyledCorreo color={color}>
      <form className="forma">
        <label className="lab">
          Subject
          <input
            className="sub"
            type="text"
            name="subject"
            value={subject}
            onChange={handleSubjectChange}
          />
        </label>
        <label className="lab">
          Content
          <textarea className="cont" value={text} onChange={handletextChange} />
        </label>
        <input
          className="but"
          type="submit"
          value="Submit"
          onClick={sendMail}
        />
        <div className="check">
          <h4>{data && data.contactUs ? "Correo recibido" : ""}</h4>
          <h4>{data && !data.contactUs ? "Network error" : ""}</h4>
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
    border: solid 2px ${(props) => props.color};
    color: white;
    padding: 10px;
    font-size: 15px;
    width: 200px;
    display: flex;
    font-weight: 600;
    cursor: pointer;
    background: ${(props) => props.color};
    border-radius: 500px;
    transition: all ease-in-out 0.3s;
    justify-content: center;
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

  @media only screen and (min-width: 970px) {
    .sub {
      width: 40rem;
    }
    .cont {
      width: 40rem;
      height: 300px;
      display: flex;
      vertical-align: text-top;
      &:focus {
        border: 1px solid ${(props) => props.color};
      }
    }
    .but {
      width: 200px;
    }
  }

  @media only screen and (max-width: 969px) and (min-width: 735px) {
    .forma {
      width: 100%;
      padding: 2em;
      margin: 0;
    }

    .lab {
      margin-left: 0;
      width: 100%;
      font-size: 20px;
    }

    .cont {
      height: 40vh;
    }
    .sub {
      height: 5vh;
    }

    .but {
      width: 80%;
      display: flex;
      align-self: center;
      justify-self: center;
      margin-top: 1vh;
      font-size: 22px;
    }
  }
  }

  @media only screen and (max-width: 734px) {
    .forma {
      width: 100vw;
      padding: 1em;
      margin: 0;
    }

    .lab {
      margin-left: 0;
      width: 100%;
      font-size: 20px;
    }

    .cont {
      height: 40vh;
    }
    .sub {
      height: 5vh;
    }

    .but {
      width: 80vw;
      display: flex;
      align-self: center;
      justify-self: center;
      margin-top: 1vh;
      font-size: 22px;
    }
  }
`;
