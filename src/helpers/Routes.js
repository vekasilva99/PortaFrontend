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
import Trips from "../views/Trips";
import AdminHome from "../views/AdminHome";
import AdminRequest from "../views/AdminRequest";
import UserHome from "../views/UserHome";
import UserProfile from "../views/UserProfile";
import DriverEditProfile from "../views/DriverEditProfile";
import DriverProfile from "../views/DriverProfile";
import Chat from "../views/Chat";
import ChatRep from "../views/ChatRep";
import DriverRequest from "../views/DriverRequest";
import { CURRENT_USER } from "./graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import GuardRoute from "./GuardRoutes";
import GuardRoutesAdmin from "./GuardRoutesAdmin";
import GuardRoutesDriver from "./GuardRoutesDriver";
import SeeDrivers from "../views/SeeDrivers";
import MapRep from "../views/MapRep";
import MapCli from "../views/MapCli";
import DeliveryCli from "../views/DeliveryCli";
import DeliveryRep from "../views/DeliveryRep";
import EmailCli from "../views/EmailCli";
import Payment from "../views/Payment";
import EmailRep from "../views/EmailRep";
import Spinner from "../components/Spinner";
import styled from "styled-components";
import AHome from "../views/AHome";
import AUsers from "../views/AUsers";
import ADrivers from "../views/ADrivers";
import ATrips from "../views/ATrips";
import ARequests from "../views/ARequests";
export default function Routes() {
  const { data, loading, error, refetch } = useQuery(CURRENT_USER, {
    fetchPolicy: "network-only",
  });

  const { token, name, role } = useSelector((state) => ({
    ...state.User,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !name) refetch();
  }, [name, refetch, token]);

  useEffect(() => {
    const tokenL = localStorage.getItem("token");
    if (tokenL && data && data.currentUser && !name) {
      dispatch({
        type: "CURRENT_USER",
        payload: {
          ...data.currentUser,
        },
      });
    }
  }, [data, dispatch, name]);

  return name && role ? (
    <Switch>
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

      <GuardRoutesAdmin exact path="/admin" role={role} component={AHome} />

      <GuardRoutesAdmin
        exact
        path="/admin/users"
        role={role}
        component={AUsers}
      />
      <GuardRoutesAdmin
        exact
        path="/admin/drivers"
        role={role}
        component={ADrivers}
      />
      <GuardRoutesAdmin
        exact
        path="/admin/trips"
        role={role}
        component={ATrips}
      />

      <GuardRoutesAdmin
        exact
        path="/admin/requests"
        role={role}
        component={ARequests}
      />

      <GuardRoutesDriver
        exact
        path="/driver/maprep"
        role={role}
        component={MapRep}
      />

      <GuardRoutesDriver
        exact
        path="/driver/driverprofile"
        role={role}
        component={DriverEditProfile}
      />

      <GuardRoutesDriver
        exact
        path="/driver/request"
        role={role}
        component={DriverRequest}
      />
      <GuardRoutesDriver
        exact
        path="/driver/chatrep"
        role={role}
        component={ChatRep}
      />
      <GuardRoutesDriver
        exact
        path="/driver/emailrep"
        role={role}
        component={EmailRep}
      />
      <GuardRoutesDriver
        exact
        path="/driver/mytrips"
        role={role}
        component={DeliveryRep}
      />

      <GuardRoute
        exact
        path="/user/userprofile"
        role={role}
        component={UserProfile}
      />

      <GuardRoute exact path="/user" role={role} component={MapCli} />

      <GuardRoute
        exact
        path="/user/seedrivers"
        role={role}
        component={SeeDrivers}
      />
      <GuardRoute exact path="/user/chat" role={role} component={Chat} />
      <GuardRoute
        exact
        path="/user/deliverycli"
        role={role}
        component={DeliveryCli}
      />
      <GuardRoute
        exact
        path="/user/emailcli"
        role={role}
        component={EmailCli}
      />

      <GuardRoute
        exact
        path="/user/driverprofile/:id"
        role={role}
        component={DriverProfile}
      />
      <GuardRoute exact path="/user/payment" role={role} component={Payment} />

      <GuardRoute exact path="/user/mapcli" role={role} component={Chat} />
      {role == "COSTUMER" ? (
        <Redirect exact from="*" to="/user" />
      ) : role == "DRIVER" ? (
        <Redirect exact from="*" to="/driver/maprep" />
      ) : (
        <Redirect exact from="*" to="/admin" />
      )}
    </Switch>
  ) : (!role && !loading && !data) ||
    (!role && !loading && data && !data.currentUser) ? (
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

      <Redirect exact from="*" to="/" />
    </Switch>
  ) : (
    <PageLoading>
      {" "}
      <Spinner></Spinner>
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
