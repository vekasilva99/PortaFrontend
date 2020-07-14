import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { loadStripe, StripeCardElement } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import {
  SET_CREDIT_CARD,
  SET_INTENT,
} from "../../helpers/graphql/mutations/index";

export default function Payment() {
  //   const { _id, name, lastName } = useSelector((state) => ({
  //     ...state.User,
  //   }));

  // const [
  //   setCreditCard,
  //   { data, error, loading },
  // ] = useMutation(SET_CREDIT_CARD);

  const [
    setIntent,
    { data: dataS, error: errorS, loading: loadingS },
  ] = useMutation(SET_INTENT);
  const stripePromise = loadStripe(
    "pk_test_51H4Vo7HrEh2luE8FIDf7KhmJwVc9l1YRxOeMYq8z1rTKQsysHj4CiR2xTLx54juBFQmGchi2rjEA2w4fgBqqJlko00TGMRLM9w"
  );
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#00507a",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#EE462F",
        iconColor: "#EE462F",
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

      const cardElement = elements.getElement(CardElement);
      console.log(cardElement);
      const { token, error } = await stripe.createToken(cardElement);

      //mutation to get the secret key
      const { data: dataS } = await setIntent();

      //the secret key
      console.log(token.card);

      //   const userName = `${name} ${lastName}`;
      //   console.log("Nombre: " + userName);

      if (error) {
        console.log("[error]", error);
      } else {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });
        const result = await stripe.confirmCardSetup(dataS.setUpIntent, {
          payment_method: paymentMethod.id,
        });
      }
    };

    return (
      <div className="pay">
        <h1>Payment</h1>
        <div>
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
      </div>
    );
  };
  return (
    <Elements stripe={stripePromise}>
      <StyledPayment>
        <CheckoutForm className="pay" />
      </StyledPayment>
    </Elements>
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
  background-image: url("/Cliente3.png");
  background-size: 80% 70%;
  background-position: bottom center;
  background-repeat: no-repeat;

  .form {
    background-image: url("/CardClient.png");
    background-size: 100% 100%;
    width: 600px;
    height: 250px;
    padding-bottom: 3em;
    padding-left: 3em;
    padding-right: 3em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .pay {
    height: 100%;
    width: 100%;
  }
  .buttonS {
    margin-top: 2em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    border: none;
    color: #00507a;
    font-size: 1em;
    width: auto;
    display: flex;
    font-weight: 600;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    justify-content: center;
    align-self: center;
    background: transparent;
    &:hover {
      opacity: 0.8;
      border-color: #00507a;
    }
    &:focus {
      opacity: 0.8;
      outline: none;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }
  }

  @media only screen and (max-width: 734px) {
    background-image: url("/Cliente2.png");
    background-size: 100% 60%;
    .form {
      background-image: url("/CardClient.png");
      background-size: 100% 100%;
      width: 100vw;
      height: 30vh;
      padding-bottom: 2em;
      padding-left: 3em;
      padding-right: 3em;
      display: flex;
      margin-top: 5vh;
      margin-left: 1em;
      margin-right: 1em;
      flex-direction: column;
      justify-content: flex-end;
    }
    .pay {
      height: 100%;
      width: 100%;
      margin-top: -15vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
`;
