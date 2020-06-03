import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Route, Switch, Redirect } from "react-router-dom";
import { CURRENT_USER } from "../helpers/graphql/queries";
export default function GuardRoutes({ component: Component, ...rest }) {
  const { data, loading, error } = useQuery(CURRENT_USER);
  return (
    <Route
      {...rest}
      render={(props) =>
        data.currentUser ? (
          <Component {...props} user={data.currentUser} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
