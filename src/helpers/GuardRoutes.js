import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuardRoutes({ component: Component, isAuth, ...rest }) {
  
  const { role } = useSelector((state) => ({
    ...state.User,
  }));

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth && role === "COSTUMER" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}
