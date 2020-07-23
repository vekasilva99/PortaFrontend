import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminSidebar from "../components/AdminSidebar";
import AdminTable from "../components/AdminUserDashboardTable";
import AdminDriverTable from "../components/AdminDriverDashboardTable";
import RequestsTable from "../components/RequestsDashboardTable";
import CardMessage from "../components/Cards/CardMessage";
import Messages from "../components/Messages";
import NavbarIn from "../components/NavIn";
import UserMenu from "../components/UserMenu";
import UserProfileSidebar from "../components/UserProfileSidebar";
import UserProfileForm from "../components/Forms/UserProfile";
import { useSelector } from "react-redux";
import Deliv from "../components/Deliv";

export default function DeliveryCli() {
  const [on, setToggle] = React.useState(false);
  const handleToggle = (e) => setToggle(!on);
  const { name, lastName, role } = useSelector((state) => ({
    ...state.User,
  }));
  return (
    <DeliveryCliStyle>
      <NavbarIn name={name} toggle={handleToggle} />
      <UserMenu show={on} />
      <div className="page">
        <div className="sid">
          {/* <SideIn></SideIn> */}
          <UserProfileSidebar />
        </div>
        <div className="deliveries">
          <h1>My Deliveries</h1>
          <Deliv />
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
    display: flex;
    position: relative;
    width: 60vw;
    height: 80vh;
    padding-left: 0;
    h1 {
      font-weight: 300;
      color: #00507a;
      letter-spacing: 2px;
      margin-bottom: 40px;
      margin-left: 3rem;
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
        color: #00507a;
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
        color: #00507a;
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
    .sid {
      display: none;
    }
    .deliveries {
      margin-top: 70px;
      display: flex;
      position: relative;
      width: 100vw;
      height: 100vh;
      padding-left: 0;
      h1 {
        display: flex;
        justify-self: center;
        font-weight: 300;
        color: #00507a;
        letter-spacing: 2px;
        margin-bottom: 40px;
        margin-left: 0;
      }
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
        color: #00507a;
        letter-spacing: 2px;
      }
      h2 {
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: 15px;
      }
      hr {
        border: 1px solid #00507a;
        width: 400px;
      }
    }
    .sid {
      display: none;
    }
    .deliveries {
      margin-top: 70px;
      display: flex;
      position: relative;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      padding-left: 0;
      h1 {
        display: flex;
        justify-self: center;
        font-weight: 300;
        color: #00507a;
        letter-spacing: 2px;
        margin-bottom: 40px;
        margin-left: 0;
      }
    }
  }
`;
