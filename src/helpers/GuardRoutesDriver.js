import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuardRoutesDriver({ component: Component, isAuth, ...rest }) {
  
  const { role } = useSelector((state) => ({
    ...state.User,
  }));
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth && role === "DRIVER" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}