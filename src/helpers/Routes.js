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
import GuardRoute from "./GuardRoutes";
import GuardRoutesAdmin from "./GuardRoutesAdmin";
import GuardRoutesDriver from "./GuardRoutesDriver";
import SeeDrivers from "../views/SeeDrivers";
import MapRep from "../views/MapRep";
import Spinner from "../components/Spinner";
import styled from "styled-components";
export default function Routes() {
  const [CurrentUser, { data, loading, error, called }] = useLazyQuery(
    CURRENT_USER,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const { token } = useSelector((state) => ({
    ...state.User,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const response = localStorage.getItem("token");
    if (response) {
      console.log("llega Response");
      CurrentUser();
    }
  }, [CurrentUser, token]);

  useEffect(() => {
    if (data && data.currentUser) {
      console.log("llega Use effect");
      const response = localStorage.getItem("token");
      CurrentUser();
      dispatch({
        type: "CURRENT_USER",
        payload: {
          token: response,
          ...data.currentUser,
        },
      });
    }
  }, [data, dispatch]);

  return token && called && !loading ? (
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      

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

      <GuardRoutesAdmin
        exact
        path="/admin"
        isAuth={token}
        isLoading={called && loading}
        component={AdminHome}
      />

      <GuardRoutesAdmin
        exact
        path="/admin/users"
        isAuth={token}
        isLoading={called && loading}
        component={AdminUsers}
      />

      <GuardRoutesAdmin
        exact
        path="/admin/requests"
        isAuth={token}
        isLoading={called && loading}
        component={AdminRequests}
      />

      <GuardRoutesAdmin
        exact
        path="/admin/requests/:id"
        isAuth={token}
        isLoading={called && loading}
        component={AdminRequest}
      />

      <GuardRoutesDriver
        exact
        path="/maprep"
        isAuth={token}
        isLoading={called && loading}
        component={MapRep}
      />

      <GuardRoutesDriver
        exact
        path="/driver/driverprofile"
        isAuth={token}
        isLoading={called && loading}
        component={DriverEditProfile}
      />

      <GuardRoutesDriver
        exact
        path="/driver/request"
        isAuth={token}
        isLoading={called && loading}
        component={DriverRequest}
      />

      <GuardRoute
        exact
        path="/user/userprofile"
        isAuth={token}
        isLoading={called && loading}
        component={UserProfile}
      />

      <GuardRoute
        exact
        path="/user"
        isAuth={token}
        isLoading={called && loading}
        component={UserHome}
      />

      <GuardRoute
        exact
        path="/user/seedrivers"
        isAuth={token}
        isLoading={called && loading}
        component={SeeDrivers}
      />

      <GuardRoute
        exact
        path="/user/driverprofile/:id"
        isAuth={token}
        isLoading={called && loading}
        component={DriverProfile}
      />

      <Redirect exact from="*" to="/" />
    </Switch>
  ) : called && !loading && data && !data.currentUser ? (
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route exact path="/login" render={(props) => <Login {...props} />} />
    
      {/* <Route exact path="/maprep" render={(props) => <MapRep {...props} />} /> */}
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
      {/* <Route exact path="/admin" render={(props) => <AdminHome {...props} />} />
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
        path="/admin/requests/:id"
        render={(props) => <AdminRequest {...props} />}
      />

      <Route
        exact
        path="/user/seedrivers"
        render={(props) => <SeeDrivers {...props} />}
      />

      <Route
        exact
        path="/user/driverprofile/:id"
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
      /> */}

      {/* <Route
        exact
        path="/user/userprofile"
        render={(props) => <UserProfile {...props} />}
      /> */}

      <Redirect exact from="*" to="/" />
    </Switch>
  ) : (
    <PageLoading>
      {" "}
      <Spinner color="blue"></Spinner>
    </PageLoading>
  );
}
const PageLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;
