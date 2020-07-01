import React from "react";
import styled from "styled-components";

export default function ChatClient(props) {
  return (
    <ChatClientStyle>
      <h1>Hi</h1>
    </ChatClientStyle>
  );
}

const ChatClientStyle = styled.div`
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
`;
