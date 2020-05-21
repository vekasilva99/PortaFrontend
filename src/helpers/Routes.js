import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <Redirect exact from="*" to="/" />
    </Switch>
  );
}
