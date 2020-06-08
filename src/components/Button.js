import React from "react";
import styled from "styled-components";
export default function Button({ color, children, ...rest }) {
  return (
    <ButtonS color={color} {...rest}>
      {children}
    </ButtonS>
  );
}
const ButtonS = styled.button`
  border: solid 2px #ebebeb;
  color: #202124;
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
    background: ${(props) => props.color};
    color: white;
    border-color: ${(props) => props.color};
  }
  &:focus {
    opacity: 0.8;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }
`;
