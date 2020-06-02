import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminSidebar from "../components/AdminSidebar";
import AdminTable from "../components/AdminTable";

export default function AdminUsers() {
  const [sidebar, setSidebar] = React.useState(false);

  const handlingSidebar = (e) => setSidebar(!sidebar);

  return (
    <HomeStyle>
      {" "}
      <NavbarAdmin togglerSidebar={handlingSidebar} />
      <AdminSidebar show={sidebar} />
      <div className="content">
        <AdminTable />
        <AdminTable />
      </div>
    </HomeStyle>
  );
}

const HomeStyle = styled.section`
  height: 100%;
  width: 100%;
  .content {
    margin-top: 5rem;
  }
`;
