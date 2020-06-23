import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

export default function Pedido(props) {
  const [sidebar, setSidebar] = React.useState(false);

  const handlingSidebar = (e) => {
    setSidebar(!sidebar);
  };

  return (
    <StyledPedido>
      <div className="order">
        <div className="textb">
          <h2>Pedido</h2>
          <h4>Origen</h4>
          <h3>Dirección</h3>
          <h4>Destino</h4>
          <h3>Dirección</h3>
        </div>
        <button className="next">
          <img src="/nextred.png" alt="Next" className="nextbut" />
        </button>
      </div>
    </StyledPedido>
  );
}
const StyledPedido = styled.nav`
  margin: 0;
  padding: 0;
  display: flexbox;
  justify-content: center;
  align-content: center;

  .order {
    padding: 0;
    margin: 0;
    border-top: 1px solid #ef0023;
    border-bottom: 1px solid #ef0023;
  }

  .textb {
    float: left;
  }
  .next {
    float: right;
    border: solid transparent;
    background-color: transparent;
  }

  @media only screen and (min-width: 735px) {
    .textb {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      padding: 10px;
      h2 {
        font-size: 20px;
        font-weight: 400;
        margin: 0;
        margin-bottom: 5px;
      }
      h3 {
        font-size: 15px;
        font-weight: 300;
        margin: 0;
        margin-left: 10px;
      }
      h4 {
        font-size: 10px;
        font-weight: 200;
        margin: 0;
        margin-left: 10px;
      }
    }
    .order {
      width: 80%;
      height: 115px;
    }
    .next {
      height: 110px;
    }
    .nextbut {
      margin-top: 10px;
      height: 30px;
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
