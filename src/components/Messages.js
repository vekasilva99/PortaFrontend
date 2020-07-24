import React, { useEffect, useState } from "react";
import { NEW_MESSAGE } from "../helpers/graphql/subscriptions/index";
import { MESSAGES } from "../helpers/graphql/queries/index";
import CardMessage from "../components/Cards/CardMessage";
import { MDBBtn, MDBRow } from "mdbreact";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useQuery } from "@apollo/react-hooks";

import PropTypes from 'prop-types'

/**
 * Componenete para los mensajes
*/

export default function Messages({
  messages,
  subscribeToMore,
  currentOrder,
  color,
}) {
  const { _id, name } = useSelector((state) => ({
    ...state.User,
  }));

  const messageRef = React.useRef();
  const options = {
    timeZone: "UTC",
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const { data, error, loading } = useQuery(MESSAGES, {
    fetchPolicy: "network-only",
    variables: {
      order: currentOrder._id,
    },
  });

  useEffect(() => {
    const unsubscription = subscribeToMore({
      document: NEW_MESSAGE,
      variables: { orderId: currentOrder },
      updateQuery: (prev, { subscriptionData }) => {
        console.log("entra");
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.newMessage;
        if (!prev.messages.find((msg) => msg._id === newMessage._id)) {
          const res = Object.assign({}, prev, {
            messages: [...prev.messages, newMessage],
          });
          return res;
        } else return prev;
      },
    });
    return () => {
      unsubscription();
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrder]);

  const Message = ({ messages }) => {
    return messages.map((message) => (
      <div key={message._id} className="d-flex flex-column w-100 ">
        <CardMessage
          userId={_id}
          options={options}
          name={message.sender.name}
          content={message.content}
          message={message}
          color={color}
        />
      </div>
    ));
  };

  React.useEffect(() => {
    scrollBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages[0]]);

  const scrollBottom = () =>
    (messageRef.current.scrollTop = messageRef.current.scrollHeight);

  return (
    <>
      <div className="messages scroll" ref={messageRef}>
        <div className="inner">
          {messages && (
            <>
              <Message messages={messages} />{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
}
