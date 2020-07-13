import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default class SubscribeUser extends React.Component {
  render() {
    return (
      // ...
      <StripeCheckout
        token={(token) => {
          console.log(token);
        }}
        stripeKey="pk_test_51H4Vo7HrEh2luE8FIDf7KhmJwVc9l1YRxOeMYq8z1rTKQsysHj4CiR2xTLx54juBFQmGchi2rjEA2w4fgBqqJlko00TGMRLM9w"
      />
    );
  }
}
