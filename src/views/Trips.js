import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminSidebar from "../components/AdminSidebar";
import AdminTable from "../components/AdminUserDashboardTable";
import AdminDriverTable from "../components/AdminDriverDashboardTable";
import RequestsTable from "../components/RequestsDashboardTable";
import DelivAdmin from "../components/DelivAdmin";

export default function AdminHome() {
  const [sidebar, setSidebar] = React.useState(true);

  const handlingSidebar = (e) => setSidebar(!sidebar);

  return (
    <HomeStyle>
      {" "}
      <NavbarAdmin togglerSidebar={handlingSidebar} />
      <AdminSidebar show={sidebar} />
      <div className="content">
        <h1>Trips</h1>
        <DelivAdmin />
      </div>
    </HomeStyle>
  );
}

const HomeStyle = styled.section`
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  position: absolute;
  overflow-x: hidden;
  background: #fafafa;
  .content {
    margin-top: 5rem;
    margin-left: 2rem;
    h1 {
      margin-left: 16rem;
      margin-bottom: 2rem;
    }
  }
`;
