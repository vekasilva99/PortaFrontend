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
              <p className="user"> {"@" + name}</p>
              <p className="date">
                {new Date(date).toLocaleString("en-VE", options)}{" "}
              </p>
            </div>
            <Text> {content}</Text>
          </Col>
        </Body>
      </Card>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  height: 5vh;
  width: 50%;
  margin: 1em;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  .cardMessage {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    align-self: flex-end;
    justify-content: center;
    background: pink;
    max-width: 100%;
    min-width: 40%;
    border: 2px solid blue;
    border-radius: 15px;
    padding: 0;
    margin: 0;
    margin-bottom: 1rem;
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
      color: $color-primary;
      text-shadow: 0 0 1px rgba($color-primary, 0.3);
      font-weight: 900;
      font-size: 0.8em;
      text-transform: capitalize;
    }
    .date {
      font-size: 0.5em;
    }
    .card-text {
      padding-right: 0.5rem;
      font-size: 1em;
      line-height: 1em;
    }
    .info {
      position: relative;
      bottom: 0.5rem;
    }

    &.other {
      &:after {
        background: $color-secondary;
        box-shadow: 0 0 3px $color-secondary;
      }
      .user {
        color: $color-secondary;
        text-shadow: 0 0 1px rgba($color-secondary, 0.3);
      }
    }
  }
`;
