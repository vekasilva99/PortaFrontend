import React from "react";
import styled from "styled-components";

import {
  MDBCard as Card,
  MDBCardBody as Body,
  MDBCol as Col,
  MDBCardText as Text,
  MDBRow as Row,
} from "mdbreact";

export default function CardMessage({
  content,
  date,
  name,
  user,
  userId,
  options,
}) {
  return (
    <StyledCard>
      <Card className="cardMessage">
        <Body>
          <Col></Col>
          <Col size="10" sm="11">
            <div className="info">
              <p className="user"> {name}</p>
              <p className="date">
                {new Date(date).toLocaleString("en-VE", options)}{" "}
              </p>
            </div>
            <p className="cont"> {content}</p>
          </Col>
        </Body>
      </Card>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  height: fit-content;
  background: #fafafa;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  .cardMessage {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    align-self: flex-end;
    justify-content: center;
    background: #00507a;
    max-width: 50%;
    min-width: 40%;
    border: 2px solid #00507a;
    border-radius: 15px;
    padding: 0;
    margin: 0;
    margin-bottom: 1rem;
    margin-left: 1rem;
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
    }
    .card-text {
      padding-right: 0.5rem;
      font-size: 1em;
      line-height: 1em;
      color: #fafafa;
    }
    .info {
      position: relative;
      color: #fafafa;
      bottom: 0.5rem;
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
`;
