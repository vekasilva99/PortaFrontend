import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import {
  GET_USERS,
  GET_REPARTIDORES,
  NEW_USERS,
  NEW_REPARTIDORES,
} from "../helpers/graphql/queries";
import { useQuery } from "@apollo/react-hooks";

import PropTypes from 'prop-types'

/**
 * Lista con los repartidores
 */

export default function RepList(props) {
  const [sidebar, setSidebar] = React.useState(false);
  let [path, setPath] = React.useState("/user/driverprofile/");

  //Repartidores
  const { loading, error, data } = useQuery(GET_REPARTIDORES);
  console.log(data);

  const handlingSidebar = (e) => {
    setSidebar(!sidebar);
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  function handleClick(name) {
    alert(`hello, ${name}`);
  }

  return (
    <StyledRepList>
      <div className="container">
        {data.drivers.map((repartidor) => (
          <div className="repart">
            <h2>
              {repartidor.name} {repartidor.lastName}
            </h2>
            <NavLink to={path + repartidor._id} className="next">
              <img src="/nextblue.png" alt="Next" className="nextbut" />
            </NavLink>
          </div>
        ))}
      </div>
    </StyledRepList>
  );
}
const StyledRepList = styled.nav`
  margin: 0;
  padding: 0;
  display: flexbox;
  flex-direction: column;
  align-content: center;

  h2 {
    font-weight: 200;
    float: left;
  }

  .repart {
    padding: 5px;
    border-top: 1px solid #00507a;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 80vw;
  }

  .next {
    float: right;
    border: solid transparent;
    background-color: transparent;
  }

  @media only screen and (min-width: 970px) {
    h2 {
      margin-top: 15px;
      margin-bottom: 15px;
      font-size: 20px;
    }
    .repart {
      width: 80%;
    }
    .next {
      width: 50px;
      height: 50px;
    }
    .nextbut {
      width: 20px;
    }
  }
  @media only screen and (max-width: 969px) and (min-width: 735px) {
    h2 {
      margin-top: 15px;
      margin-bottom: 15px;
      font-size: 20px;
    }
    .repart {
      width: 90%;
    }
    .next {
      width: 50px;
      height: 50px;
    }
    .nextbut {
      width: 15px;
    }
  }
  @media only screen and (max-width: 734px) {
    h2 {
      margin-top: 15px;
      margin-bottom: 15px;
      font-size: 15px;
    }
    .repart {
      width: 90%;
    }
    .next {
      width: 50px;
      height: 50px;
    }
    .nextbut {
      width: 10px;
    }
  }
`;
