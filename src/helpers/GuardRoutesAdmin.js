import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuardRoutesAdmin({ component: Component, isAuth, ...rest }) {

  const { role } = useSelector((state) => ({
    ...state.User,
  }));

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth && role === "ADMIN" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/adminlogin", state: { from: props.location } }} />
        )
      }
    />
  );
}

