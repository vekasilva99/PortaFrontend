import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Route, Switch, Redirect } from "react-router-dom";

export default function GuardRoutes({ component: Component, isAuth, ...rest }) {
  console.log("Guardian " + isAuth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
