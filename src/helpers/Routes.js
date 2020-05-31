import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import LoginAdmin from "../views/LoginAdmin";
import LoginDriver from "../views/LoginDriver";
import RegisterUser2 from "../views/RegisterUser2";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <Route
        exact
        path="/register"
        render={(props) => <RegisterUser2 {...props} />}
      />
      <Route
        exact
        path="/adminlogin"
        render={(props) => <LoginAdmin {...props} />}
      />
      <Route
        exact
        path="/driverlogin"
        render={(props) => <LoginDriver {...props} />}
      />
      <Redirect exact from="*" to="/" />
    </Switch>
  );
}
