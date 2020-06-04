import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Route, Switch, Redirect } from "react-router-dom";
import { CURRENT_ADMIN } from "../helpers/graphql/queries";

export default function GuardRoutesAdmin({ component: Component, ...rest }) {
  const { data, loading, error } = useQuery(CURRENT_ADMIN);
  return (
    <Route
      {...rest}
      render={(props) =>
        data.currentAdmin ? (
          <Component {...props} user={data.currentAdmin} />
        ) : (
          <Redirect
            to={{ pathname: "/adminlogin", state: { from: props.location } }}
          />
        )
      }
    />
  );
}