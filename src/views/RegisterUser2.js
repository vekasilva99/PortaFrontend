import React from "react";
import FormRegister from "../components/Forms/Register";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

export default function Register2(props) {
  const [on, setToggle] = React.useState(true);

  const handleToggle = (e) => setToggle(false);
  return (
    <div>
      <RegisterView show={props.show}>
        <div className="login-box">
          <MdClose
            onClick={props.togglerRegister}
            className="close"
            size="1.7rem"
            color="#fafafa"
          />
          <div className="container-porta">
            <h2 className="h2">Register</h2>
            <FormRegister color="#0A95BF" />
            <h3 className="h3">Already have an account?</h3>
            <button onClick={props.togglerLogin} className="h4">
              SIGN IN
            </button>
          </div>
        </div>
      </RegisterView>
    </div>
  );
}

const RegisterView = styled.div`
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
  transition: all ease-in-out 0.3s;
  opacity: ${(props) => (props.show ? 1 : 0)};
  z-index: ${(props) => (props.show ? 300 : -1)};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    z-index: 1;
    height: 100%;
    background: #202124;
    opacity: 0.4;
  }
  .h2 {
    color: #fafafa;
    font-size: 2em;
    font-weight: 500;
    letter-spacing: 1px;
    position: absolute;
    top: 2rem;
  }
  .h3 {
    color: #fafafa;
    bottom: 3rem;
    position: absolute;
    font-size: 0.9em;
  }
  .h4 {
    bottom: 1.5rem;
    margin: 0;
    position: absolute;
    font-size: 0.8em;
    color: #00507a;
    font-weight: 300;
    border: none;
    cursor: pointer;
    background: #202124;
    &:focus {
      outline: none;
    }
  }

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transition: transform ease-in-out 0.3s;
    transform: translate(-50%, -50%)
      rotateY(${(props) => (props.show ? "0" : "90deg")});
    color: #002e64;
    background: white;
    height: 75vh;
    width: 70vw;
    z-index: 2;
    align-items: center;
    justify-content: center;
  }

  .container-porta {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    height: 75vh;
    width: inherit;
    background: #202124;
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
    cursor: pointer;
  }

  @media only screen and (max-width: 734px) {
    .login-box {
      height: 100vh;
      width: 100vw;
    }

    .container-porta {
      height: 100vh;
      width: 100vw;
    }
  }
`;
