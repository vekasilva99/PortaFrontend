import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuardRoutesAdmin({
  component: Component,
  role,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        role === "ADMIN" ? (
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
