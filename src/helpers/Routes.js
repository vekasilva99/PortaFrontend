import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import LoginAdmin from "../views/LoginAdmin";
import LoginDriver from "../views/LoginDriver";
import RegisterUser2 from "../views/RegisterUser2";
import RegisterDriver from "../views/RegisterDriver";
import AdminUsers from "../views/AdminUsers";
import AdminHome from "../views/AdminHome";
import UserHome from "../views/UserHome";
import SeeDrivers from "../views/SeeDrivers";
import MapRep from "../views/MapRep";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <Route
        exact
        path="/seedrivers"
        render={(props) => <SeeDrivers {...props} />}
      />
      <Route exact path="/maprep" render={(props) => <MapRep {...props} />} />
      <Route
        exact
        path="/register"
        render={(props) => <RegisterUser2 {...props} />}
      />
      <Route
        exact
        path="/registerdriver"
        render={(props) => <RegisterDriver {...props} />}
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
      <Route exact path="/admin" render={(props) => <AdminHome {...props} />} />
      <Route
        exact
        path="/admin/users"
        render={(props) => <AdminUsers {...props} />}
      />
      <Route exact path="/user" render={(props) => <UserHome {...props} />} />

      <Redirect exact from="*" to="/" />
    </Switch>
  );
}
