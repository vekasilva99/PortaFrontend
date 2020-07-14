import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { loadStripe, StripeCardElement } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function Payment(props) {
  const stripePromise = loadStripe(
    "pk_test_51H4Vo7HrEh2luE8FIDf7KhmJwVc9l1YRxOeMYq8z1rTKQsysHj4CiR2xTLx54juBFQmGchi2rjEA2w4fgBqqJlko00TGMRLM9w"
  );
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        zIndex: "200",
        color: "#fafafa",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      if (!error) {
        const { id } = paymentMethod;
      }
      try {
        //ACA VA PARA MANDAR AL BACKEND
        console.log("amount: 10000");
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className="pay">
        <h1>Payment</h1>
        <form
          className="form"
          style={{ maxWidth: "400px", margin: "0 auto" }}
          onSubmit={handleSubmit}
        >
          <CardElement options={CARD_ELEMENT_OPTIONS} />
          <button className="buttonS" type="submit" disabled={!stripe}>
            SAVE CARD
          </button>
        </form>
      </div>
    );
  };
  return (
    <StyledPayment>
      <Elements stripe={stripePromise}>
        <CheckoutForm className="pay" />
      </Elements>
    </StyledPayment>
  );
}

const StyledPayment = styled.nav`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  h1 {
    color: #00507a;
  }

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  .form {
    background: #00507a;
    width: 600px;
    padding: 4em;
    border: 1px solid #00507a;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
  }
  .pay {
    height: 100%;
    width: 100%;
  }
  .buttonS {
    margin-top: 2em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    border: solid 2px #00507a;
    color: white;
    padding: 0.7rem;
    font-size: 0.8em;
    width: 15vw;
    display: flex;
    font-weight: 600;
    cursor: pointer;
    background: #00507a;
    border-radius: 500px;
    transition: all ease-in-out 0.3s;
    justify-content: center;
    align-self: center;

    &:hover {
      opacity: 0.8;
      background: #00507a;
      color: white;
      border-color: #00507a;
    }
    &:focus {
      opacity: 0.8;
      outline: none;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }
  }
`;
