import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavbarOn from "../components/NavOn";
import DriverMenu from "../components/DriverMenu";
import DriverProfileSidebar from "../components/DriverProfileSidebar";
import { useSelector } from "react-redux";
import DelivRep from "../components/DelivRep";

export default function DeliveryRep() {
  const [on, setToggle] = React.useState(false);
  const handleToggle = (e) => setToggle(!on);
  const { name, lastName, role } = useSelector((state) => ({
    ...state.User,
  }));
  return (
    <DeliveryCliStyle>
      <NavbarOn name={name} toggle={handleToggle} />
      <DriverMenu show={on} />
      <div className="page">
        <div className="sid">
          {/* <SideIn></SideIn> */}
          <DriverProfileSidebar />
        </div>
        <div className="deliveries">
          <h1>My Deliveries</h1>
          <DelivRep />
        </div>
      </div>
    </DeliveryCliStyle>
  );
}

const DeliveryCliStyle = styled.div`
  position: absolute;
  background: white;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;

  .page {
    margin-top: 80px;
  }

  .deliveries {
    margin-top: 70px;
    background-color: red;
    display: flex;
    position: relative;
    width: 60vw;
    height: 80vh;
    padding-left: 0;
    h1 {
      font-weight: 300;
      color: #ee462f;
      letter-spacing: 2px;
      margin-bottom: 40px;
    }
  }

  @media only screen and (min-width: 1069px) {
    .page {
      margin-top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .repartidores {
      h1 {
        font-weight: 300;
        color: #ee462f;
        letter-spacing: 2px;
      }
      h2 {
        margin-top: 15px;
        margin-bottom: 15px;
      }
      hr {
        border: 1px solid #00507a;
        width: 600px;
      }
    }
  }
  @media only screen and (max-width: 1069px) and (min-width: 735px) {
    .repartidores {
      height: 100vh;
      h1 {
        margin-top: 100px;
        font-weight: 300;
        color: #ee462f;
        letter-spacing: 2px;
      }
      h2 {
        margin-top: 15px;
        margin-bottom: 15px;
      }
      hr {
        border: 1px solid #ee462f;
        width: 600px;
      }
    }
    .sid {
      display: none;
    }
  }
  @media only screen and (max-width: 734px) {
    .page {
      margin-top: 50px;
    }
    .repartidores {
      height: 100vh;
      h1 {
        margin-top: 100px;
        font-size: 30px;
        font-weight: 300;
        color: #ee462f;
        letter-spacing: 2px;
      }
      h2 {
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: 15px;
      }
      hr {
        border: 1px solid #ee462f;
        width: 400px;
      }
    }
    .sid {
      display: none;
    }
  }
`;
