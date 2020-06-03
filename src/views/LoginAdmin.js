import React from "react";
import FormLogin from "../components/Forms/Login";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

export default function LoginAdmin() {
  const [on, setToggle] = React.useState(true);

  const handleToggle = (e) => setToggle(false);
  return (
    <div>
      {on ? (
        <LoginView>
          <div className="login-box">
            {/* <MdClose
              onClick={handleToggle}
              className="close"
              size="1.7rem"
              color="black"
            /> */}
            <div className="container">
              <h2 className="h2">Log In</h2>
              <FormLogin color="#F89262" />
            </div>
          </div>
        </LoginView>
      ) : null}
    </div>
  );
}

const LoginView = styled.div`
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
    height: 100vh;
    width: 100vw;
    z-index: 2;
    align-items: center;
    justify-content: center;
  }

  .container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    height: 100vh;
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
`;
