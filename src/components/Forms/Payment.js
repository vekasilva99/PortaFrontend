import React, { useState, useEffect } from "react";
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
      <form
        style={{ maxWidth: "400px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <h2>Price: 100$</h2>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          PAY
        </button>
      </form>
    );
  };
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
