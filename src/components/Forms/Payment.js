import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
import { CARD_SAVED, SET_INTENT } from "../../helpers/graphql/mutations/index";

const stripePromise = loadStripe(
  "pk_test_51H4Vo7HrEh2luE8FIDf7KhmJwVc9l1YRxOeMYq8z1rTKQsysHj4CiR2xTLx54juBFQmGchi2rjEA2w4fgBqqJlko00TGMRLM9w"
);

export default function Payment() {
  const { _id, name, lastName, haveCard } = useSelector((state) => ({
    ...state.User,
  }));

  const dispatch = useDispatch();

  const [mensaje, setMensaje] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);

  const [cardSaved, { data, error, loading }] = useMutation(CARD_SAVED);

  const [
    setIntent,
    { data: dataS, error: errorS, loading: loadingS },
  ] = useMutation(SET_INTENT);

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#00507a",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "8vw",
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

  const CheckoutForm = (onSubmit) => {
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
      setSubmitted(true);
      let id = "";
      const { data: dataS } = await setIntent();
      if (paymentMethod) {
        id = paymentMethod.id;
      } else {
        setMensaje("Ups! Algo Salio Mal");
        setSubmitted(false);
      }
      if (error || id === "") {
        setMensaje("Ups! Algo Salio Mal");
        setSubmitted(false);
      } else {
        const { error2, result } = await stripe.confirmCardSetup(
          dataS.setUpIntent,
          {
            payment_method: id,
          }
        );
        if (error2) {
          setMensaje("Ups! Algo Salio Mal");
          setSubmitted(false);
        } else {
          setMensaje(
            "Proceso culminado con exito. Es hora de hacer su pedido!"
          );

          const { data } = await cardSaved();

          if (data && data.cardSaved) {
            dispatch({
              type: "UPDATE_USER",
              payload: {
                haveCard: true,
              },
            });
          }
        }
      }
    };

    return (
      <div className="pay">
        {!mensaje ? (
          <form className="form">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
            <button
              className="buttonS"
              onClick={handleSubmit}
              type="submit"
              disabled={!stripe || submitted}
            >
              SAVE CARD
            </button>
          </form>
        ) : (
          <div className="popUp">
            <img
              src={
                mensaje ==
                "Proceso culminado con exito. Es hora de hacer su pedido!"
                  ? "/checkcli.png"
                  : "/equiscli.png"
              }
              className="icon"
            ></img>
            <h2> {mensaje}</h2>
            {mensaje !=
            "Proceso culminado con exito. Es hora de hacer su pedido!" ? (
              <button
                disabled={submitted}
                onClick={() => {
                  setMensaje(null);
                }}
                className="buttonA"
              >
                ACEPTAR
              </button>
            ) : null}
          </div>
        )}
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

  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  h1 {
    color: #00507a;
  }
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-image: url("/Cliente3.png");
  background-size: 80% 70%;
  background-position: bottom center;
  background-repeat: no-repeat;

  .popUp {
    width: 400px;
    height: 250px;
    background: transparent;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    padding-bottom: 0;
    align-items: center;
    h2 {
      margin-top: 1em;
      font-size: 16px;
      color: #00507a;
    }
    .buttonA {
      margin-top: 0.2em;
      width: 30%;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      border: 1px solid #00507a;
      border-radius: 20px;
      margin-bottom: 0;
      font-size: 12px;
      font-weight: 300;
      background: #00507a;
      color: #fafafa;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    .icon {
      margin-top: 1em;

      width: 10vw;
    }
  }

  .form {
    background-image: url("/CardClient.png");
    background-size: 100% 100%;
    width: 400px;
    height: 250px;
    padding-bottom: 3em;
    padding-left: 3em;
    padding-right: 3em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    max-width: 400px;
    margin: 0 auto;
  }
  .pay {
    height: 100%;
    width: 100%;
    padding-top: 10vh;
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
    background-size: 100% 70%;
    .form {
      background-image: url("/CardClient.png");
      background-size: 100% 100%;
      width: 100vw;
      height: 30vh;
      padding-bottom: 2em;
      padding-left: 3em;
      padding-right: 3em;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      max-width: 400px;
      margin: 0 0;
      position: fixed;
      margin-top: 0;
      margin-left: 0;
      margin-right: 0;
    }
    .popUp {
      width: 100vw;
      height: 50vh;
      background: pink;
      h2 {
        margin-left: 0.5em;
        margin-right: 0.5em;
        margin-top: 0.2;
        font-size: 25px;
        color: #00507a;
      }
      .buttonA {
        margin-top: 0.2em;
        width: 80%;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        border: 1px solid #00507a;
        border-radius: 20px;
        margin-bottom: 0;
        font-size: 12px;
        font-weight: 300;
        background: #00507a;
        color: #fafafa;
        z-index: 300;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
      .icon {
        margin-top: 20%;
        width: 50vw;
      }
    }
    .pay {
      height: 100%;
      width: 100%;
      margin-top: 12vh;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
    }
    .buttonS {
      margin-top: 2vh;
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
  }

  @media only screen and (max-width: 1069px) and (min-width: 735px) {
    background-image: url("/Cliente2.png");
    background-size: 100% 70%;
    .form {
      background-image: url("/CardClient.png");
      background-size: 100% 100%;
      width: 100vw;
      height: 40vh;
      padding-bottom: 4em;
      padding-left: 3em;
      padding-right: 3em;
      display: flex;
      position: fixed;
      margin-top: 0;
      margin-left: 0;
      margin-right: 0;
      flex-direction: column;
      justify-content: flex-end;
      max-width: 600px;
      margin: 0 0;
    }
    .popUp {
      width: 100vw;
      height: 40vh;
      h2 {
        margin-left: 0.5em;
        margin-right: 0.5em;
        margin-top: 0.2;
        font-size: 25px;
        color: #00507a;
      }
      .buttonA {
        margin-top: 0.2em;
        width: 30%;
        padding-top: 0.3em;
        padding-bottom: 0.3em;
        border: 1px solid #00507a;
        border-radius: 20px;
        margin-bottom: 0;
        font-size: 3vw;
        font-weight: 300;
        background: #00507a;
        color: #fafafa;
        z-index: 300;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
      .icon {
        margin-top: 5%;
        width: 25vw;
      }
    }
    .pay {
      height: 100%;
      width: 100%;
      margin-top: 5vh;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
    }

    .buttonS {
      margin-top: 2em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      border: none;
      color: #00507a;
      font-size: 3vw;
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
  }
`;
