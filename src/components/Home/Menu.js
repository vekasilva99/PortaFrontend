import React from "react";
import { MDBIcon, MDBNav, MDBNavItem, MDBNavLink, MDBBtn } from "mdbreact";
export default function SideBar({ options, changeOption }) {
  return (
    <nav>
      <ul>
        <li
          className={options === 0 ? "option_1 active" : "option_1"}
          onClick={() => changeOption(0)}
        >
          <MDBBtn className="item">
            {" "}
            <MDBIcon icon="comments" /> My posts{" "}
          </MDBBtn>
        </li>

        <li
          className={options === 1 ? "option_2 active" : "option_2"}
          onClick={() => changeOption(1)}
        >
          <MDBBtn className="item">
            {" "}
            <MDBIcon icon="search" /> Search{" "}
          </MDBBtn>
        </li>
        <li
          className={options === 2 ? "option_3 active" : "option_3"}
          onClick={() => changeOption(2)}
        >
          <MDBBtn className="item">
            {" "}
            <MDBIcon icon="plus" /> Create
          </MDBBtn>
        </li>
      </ul>
    </nav>
  );
}
