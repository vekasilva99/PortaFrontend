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

export default function Correo() {
  return (
    <StyledCorreo>
      <form className="forma">
        <label className="lab">
          Subject
          <input className="sub" type="text" name="subject" />
        </label>
        <label className="lab">
          Content
          <input className="cont" type="text" name="content" />
        </label>
        <input type="submit" value="Submit" />
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
  .lab {
    display: inline-grid;
  }

  @media only screen and (min-width: 970px) {
    /* .forma {
      width: 40rem;
    } */
  }

  @media only screen and (max-width: 969px) and (min-width: 735px) {
  }

  @media only screen and (max-width: 734px) {
  }
`;
