import React from "react";
import styled from "styled-components";
export default function Input({
  label,
  name,
  id,
  type,
  value,
  onChange,
  onBlur,
  color,
  min,
  max,
}) {
  return (
    <StyleInput color={color}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        required
        autoComplete="off"
        onBlur={onBlur}
        placeholder={name}
        id={id}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
      />
    </StyleInput>
  );
}
const StyleInput = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  label {
    font-size: 1em;
    font-weight: 200;
    color: #fafafa;
    margin: 0.2rem;
    cursor: pointer;
    margin-top: 1rem;
  }
  input {
    background: none;
    font-size: 1em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    color: #fafafa;
    border: none;
    border-bottom: solid 2px #ebebeb;
    box-shadow: none;
    outline: none;
    transition: all ease-in-out 0.5s;
    opacity: 0.8;
    margin: 0.3rem;
    margin-top: 1.5rem;
    padding: 0.3rem 0.5rem;
    width: 25vw;

    &:focus {
      opacity: 1;
      outline: none;
      box-shadow: none;
      border-bottom: solid 2px ${(props) => props.color} !important;
    }
  }

  @media only screen and (max-width: 734px) {
    input {
      width: 80vw;
    }
  }
`;
