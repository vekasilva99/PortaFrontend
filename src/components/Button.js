import React from "react";
import styled from "styled-components";
export default function Button({ children, onClick, block }) {
  return (
    <ButtonS block={block} onClick={onClick}>
      {children}{" "}
    </ButtonS>
  );
}
const ButtonS = styled.button`
  border: solid 2px #ebebeb;
  color: white;
  padding: 0.9rem;
  font-size: 1em;
  margin: 0.3rem;
  margin-top: 3rem;
  width: 30vw;
  display: ${(props) => (props.block ? "block" : "inline-block")};
  font-weight: 600;
  cursor: pointer;
  background: #ebebeb;
  border-radius: 500px;
  transition: all ease-in-out 0.3s;

  &:hover {
    opacity: 0.8;
    background: #29e2f3;
    color: white;
    border-color: #29e2f3;
  }
  &:focus {
    opacity: 0.8;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }
`;
