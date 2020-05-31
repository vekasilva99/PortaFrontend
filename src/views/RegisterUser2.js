import React from "react";
import FormRegister from "../components/Forms/Register";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

export default function Register2() {
  const [on, setToggle] = React.useState(true);

  const handleToggle = (e) => setToggle(false);
  return (
    <div>
      {on ? (
        <RegisterView>
          <div className="login-box">
            <MdClose
              onClick={handleToggle}
              className="close"
              size="1.7rem"
              color="black"
            />
            <div className="container">
              <h2 className="h2">Register</h2>
              <FormRegister color="#0A95BF" />
              <h3 className="h3">Already have an account?</h3>
              <h4 className="h4">SIGN IN</h4>
            </div>
          </div>
        </RegisterView>
      ) : null}
    </div>
  );
}

const RegisterView = styled.div`
  background: url(${require("../assets/images/bg1.jpg")}) no-repeat center;
  background-size: cover;
  display: block;
  display: flex;
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    z-index: 1;
    height: 100%;
    background: white;
    opacity: 0.4;
  }
  .h2 {
    color: black;
    font-family: Roboto;
    font-size: 1.5em;
    position: absolute;
    top: 1.5rem;
  }
  .h3 {
    color: black;
    bottom: 2rem;
    position: absolute;
    font-family: Roboto;
    font-size: 0.9em;
  }
  .h4 {
    color: black;
    bottom: 0.5rem;
    position: absolute;
    font-family: Roboto;
    font-size: 0.8em;
    font-weight: 600;
    color: #0a95bf;
  }

  .login-box {
    width: 280px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #002e64;
    background: white;
    height: 75vh;
    width: 35vw;
    z-index: 2;
    align-items: center;
    justify-content: center;
  }

  .container {
    position: relative;
    z-index: 3;
    height: 75vh;
    width: 35vw;
    background: white;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close {
    margin-top: 2rem;
    margin-right: 2rem;
    z-index: 34;
    padding: 0;
    position: absolute;
    z-index: 4;
    right: 0;
  }
`;
