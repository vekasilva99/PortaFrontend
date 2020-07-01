import React from "react";
import Toggle from "../toggle.js";
import Notification from "./Notification";
import { MDBRow, MDBCol } from "mdbreact";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { QUERY_NOTIFICATIONS } from "../../helpers/graphql/querys";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
export default function HeaderSideBar({ onClick, userId }) {
  const { data, loading, error, subscribeToMore, refetch } = useQuery(
    QUERY_NOTIFICATIONS,
    {
      variables: {
        userId: userId
      }
    }
  );

  return (
    <header>
      <MDBCol size="9" className="logo">
        <img src={require("../../assets/img/graphql.svg")} alt="" />
        <h1> GraphQL </h1>
      </MDBCol>

      <MDBCol size="2">
        {data && (
          <Notification
            subscribeToMore={subscribeToMore}
            notifications={data.notifications}
            update={refetch}
          />
        )}
      </MDBCol>

      <MDBCol size="1">
        <Toggle onClick={onClick} />
      </MDBCol>
    </header>
  );
}
