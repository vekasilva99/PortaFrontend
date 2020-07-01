import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuardRoutesDriver({
  component: Component,
  role,
  ...rest
}) {
  console.log("Rol guardianUsuario " + role);
  return (
    <Route
      {...rest}
      render={(props) =>
        role == "DRIVER" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}
