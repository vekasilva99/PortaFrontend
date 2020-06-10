import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import LoginAdmin from "../views/LoginAdmin";
import LoginDriver from "../views/LoginDriver";
import RegisterUser2 from "../views/RegisterUser2";
import RegisterDriver from "../views/RegisterDriver";
import AdminUsers from "../views/AdminUsers";
import AdminRequests from "../views/AdminRequests";
import AdminHome from "../views/AdminHome";
import AdminRequest from "../views/AdminRequest";
import UserHome from "../views/UserHome";
import UserProfile from "../views/UserProfile";
import DriverEditProfile from "../views/DriverEditProfile";
import DriverProfile from "../views/DriverProfile";
import DriverRequest from "../views/DriverRequest";
import { CURRENT_USER } from "./graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import GuardRoute from "./GuardRoutes";
import SeeDrivers from "../views/SeeDrivers";
import MapRep from "../views/MapRep";

export default function Routes() {
  const [CurrentUser, { data, loading }] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: "cache-and-network",
  });

  const { token } = useSelector((state) => ({
    ...state.User,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const response = localStorage.getItem("token");
    if (response) {
      CurrentUser();
    }
  }, [CurrentUser, token]);

  useEffect(() => {
    if (data && data.currentUser) {
      const response = localStorage.getItem("token");
      dispatch({
        type: "CURRENT_USER",
        payload: {
          token: response,
          ...data.currentUser,
        },
      });
    }
  }, [data, dispatch, token]);

  return !loading ? (
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
      <Route
        exact
        path="/admin/requests"
        render={(props) => <AdminRequests {...props} />}
      />
      <Route
        exact
        path="/admin/requests/1"
        render={(props) => <AdminRequest {...props} />}
      />
      <Route exact path="/user" render={(props) => <UserHome {...props} />} />
      <Route
        exact
        path="/user/userprofile"
        render={(props) => <UserProfile {...props} />}
      />
      
      
      <Route
        exact
        path="/user/driverprofile/1"
        render={(props) => <DriverProfile {...props} />}
      />
      <Route
        exact
        path="/driver/driverprofile"
        render={(props) => <DriverEditProfile {...props} />}
      />
      <Route
        exact
        path="/driver/request"
        render={(props) => <DriverRequest {...props} />}
      />

      <GuardRoute
        exact
        path="/user"
        isAuth={data && data.currentUser ? data.currentUser : null}
        component={UserHome}
      />
      <Redirect exact from="*" to="/" />
    </Switch>
  ) : (
    <Spinner />
  );
}
