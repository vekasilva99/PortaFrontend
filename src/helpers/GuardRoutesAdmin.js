import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Route, Switch, Redirect } from "react-router-dom";

export default function GuardRoutesAdmin({
  component: Component,
  isAuth,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/adminlogin", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
