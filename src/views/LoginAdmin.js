import React from "react";
import FormLoginAdmin from "../components/Forms/LoginAdmin";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

export default function LoginAdmin() {
  return (
    <div>
      <LoginView>
        <div className="login-box">
          <div className="container">
            <h2 className="h2">Log In</h2>
            <FormLoginAdmin color="#F89262" />
          </div>
        </div>
      </LoginView>
    </div>
  );
}

const LoginView = styled.div`
  background-size: cover;
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
  z-index: 300;
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
  }
  .h3 {
    color: #fafafa;
    bottom: 3rem;
    position: absolute;
    font-size: 0.9em;
  }
  .h4 {
    bottom: 1.5rem;
    position: absolute;
    font-size: 0.8em;
    font-weight: 600;
    color: #f89262;
  }

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #002e64;
    background: white;
    background: #202124;
    min-height: 100vh;
    width: 100vw;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .container {
    position: relative;
    padding: auto;
    max-width: 100%;
    z-index: 3;
    min-height: 50vh;
    width: inherit;
    color: black;
    display: flex;
    flex-direction: column;
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
`;
