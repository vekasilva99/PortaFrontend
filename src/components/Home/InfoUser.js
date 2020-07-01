import React, { useContext } from "react";
import { MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
export default function InfoUser({ toggle }) {
  const dispatch = useDispatch();
  const { userImg, name, username } = useSelector(state => ({
    ...state.User
  }));
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT"
    });
  };
  return (
    <footer>
      <MDBRow>
        <MDBCol>
          <img className="imgProfile" src={userImg} alt="" />
        </MDBCol>
        <MDBCol>
          <MDBRow>
            <p className="name"> {name}</p>
            <p className="username"> @{username}</p>
          </MDBRow>
          <MDBRow className="options">
            <MDBBtn className="btn-send" onClick={toggle}>
              <MDBIcon icon="cogs" />
            </MDBBtn>
            <MDBBtn className="btn-send">
              <MDBIcon icon="sign-out-alt" onClick={logout} />
            </MDBBtn>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </footer>
  );
}
