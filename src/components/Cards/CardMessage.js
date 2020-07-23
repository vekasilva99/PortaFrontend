import React from "react";
import styled from "styled-components";

import {
  MDBCard as Card,
  MDBCardBody as Body,
  MDBCol as Col,
  MDBCardText as Text,
  MDBRow as Row,
} from "mdbreact";
import moment from "moment";
export default function CardMessage({
  content,
  date,
  name,
  user,
  userId,
  options,
  color,
  message,
}) {
  let style;
  if (message.sender._id === userId) {
    style = "open";
  } else {
    style = "receive";
  }

  return (
    <StyledCard color={color}>
      <div className={style}>
        <Card
          className={
            "cardMessage" + (userId === message.sender._id ? "Send" : "Receive")
          }
        >
          <Body>
            <Col></Col>
            <Col size="10" sm="11">
              <div className="info">
                <p className="user"> {name}</p>
              </div>
              <p className="cont"> {content}</p>
              <div className="info2">
                <p className="date">{moment(message.createdAt).fromNow()} </p>
              </div>
            </Col>
          </Body>
        </Card>
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  height: fit-content;
  background: #fafafa;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-bottom: 1rem;
  display: flex;
  position: relative;
  align-items: center;

  .open {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
  }
  .receive {
    width: 100%;
    display: flex;
    margin-left: 1rem;
    justify-content: flex-start;
  }

  .cardMessageReceive {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-content: center;
    background: #202124;
    max-width: 60%;
    min-width: 50%;
    border: 2px solid #202124;
    border-radius: 15px;
    padding: 0;
    margin: 0;
    @media screen and (min-width: 992px) {
      max-width: 40rem;
    }

    &:after {
      content: "";
      height: 2px;

      width: 100%;
      background: $color-primary;
      box-shadow: 0 0 3px $color-primary;
    }

    .cont {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      color: #fafafa;
    }
    img {
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
      box-shadow: 0 0 1px #ffffff;
    }
    p {
      margin: 0;
      padding: 0;
    }

    .card-body {
      display: flex;
      padding: 0.5rem;
      width: 100%;
    }
    .user {
      color: #fafafa;
      text-shadow: 0 0 1px rgba($color-primary, 0.3);
      font-weight: 500;
      font-size: 0.8em;
      text-transform: capitalize;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    .date {
      font-size: 0.5em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      color: #fafafa;
      display: flex;
      align-self: flex-end;
      justify-self: flex-end;
    }
    .card-text {
      padding-right: 0.5rem;
      font-size: 1em;
      line-height: 1em;
      color: #fafafa;
    }
    .info {
      display: flex;
      position: relative;
      color: #fafafa;
      flex-direction: column;
      width: 100%;
      bottom: 0.5rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    .info2 {
      display: flex;
      position: relative;
      color: #fafafa;
      flex-direction: column;
      width: 100%;
      bottom: 0.1rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    &.other {
      &:after {
        background: $color-secondary;
        box-shadow: 0 0 3px $color-secondary;
      }
      .user {
        color: $color-secondary;
        text-shadow: 0 0 1px rgba($color-secondary, 0.3);
        color: #fafafa;
      }
    }
  }

  .cardMessageSend {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-content: center;
    background: ${(props) => props.color};
    max-width: 60%;
    min-width: 50%;
    border: 2px solid ${(props) => props.color};
    border-radius: 15px;
    padding: 0;
    margin: 0;
    @media screen and (min-width: 992px) {
      max-width: 40rem;
    }

    &:after {
      content: "";
      height: 2px;

      width: 100%;
      background: $color-primary;
      box-shadow: 0 0 3px $color-primary;
    }

    .cont {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      color: #fafafa;
    }
    img {
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
      box-shadow: 0 0 1px #ffffff;
    }
    p {
      margin: 0;
      padding: 0;
    }

    .card-body {
      display: flex;
      padding: 0.5rem;
      width: 100%;
    }
    .user {
      color: #fafafa;
      text-shadow: 0 0 1px rgba($color-primary, 0.3);
      font-weight: 500;
      font-size: 0.8em;
      text-transform: capitalize;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    .date {
      font-size: 0.5em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      color: #fafafa;
      display: flex;
      align-self: flex-end;
      justify-self: flex-end;
    }
    .card-text {
      padding-right: 0.5rem;
      font-size: 1em;
      line-height: 1em;
      color: #fafafa;
    }
    .info {
      display: flex;
      position: relative;
      color: #fafafa;
      flex-direction: column;
      width: 100%;
      bottom: 0.5rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    .info2 {
      display: flex;
      position: relative;
      color: #fafafa;
      flex-direction: column;
      width: 100%;
      bottom: 0.1rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    &.other {
      &:after {
        background: $color-secondary;
        box-shadow: 0 0 3px $color-secondary;
      }
      .user {
        color: $color-secondary;
        text-shadow: 0 0 1px rgba($color-secondary, 0.3);
        color: #fafafa;
      }
    }
  }

  @media only screen and (max-width: 734px) {
  }
`;
