import React, { useEffect, useState } from "react";
import { NEW_MESSAGE } from "../helpers/graphql/subscriptions/index";
import { MESSAGES } from "../helpers/graphql/queries/index";
import CardMessage from "../components/Cards/CardMessage";
import { MDBBtn, MDBRow } from "mdbreact";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useQuery } from "@apollo/react-hooks";
export default function Messages({
  messages,
  subscribeToMore,
  moreMessages,
  loading1,
  hasNextPage,
  postId,
}) {
  const { _id, name, currentOrder } = useSelector((state) => ({
    ...state.User,
  }));

  console.log(currentOrder);
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
      orders: currentOrder._id,
    },
  });
  // useEffect(() => {
  //   const unsubscription = subscribeToMore({
  //     document: MESSAGE_ADDED_SUBSCRIPTION,
  //     variables: { postId: postId },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       const newMessage = subscriptionData.data.messageAdded;
  //       if (!prev.messages.messages.find((msg) => msg._id === newMessage._id)) {
  //         const res = Object.assign({}, prev, {
  //           messages: {
  //             ...prev.messages,
  //             messages: [newMessage, ...prev.messages.messages],
  //           },
  //         });
  //         return res;
  //       } else return prev;
  //     },
  //   });
  //   return () => {
  //     unsubscription();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [postId]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const Message = ({ messages }) => {
    return data.messages.map((message) => (
      <div key={message._id} className="d-flex flex-column w-100 ">
        <CardMessage
          userId={_id}
          options={options}
          name={name}
          content={message.content}
        />
      </div>
    ));
  };

  // React.useEffect(() => {
  //   scrollBottom();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [messages[0]]);

  const scrollBottom = () =>
    (messageRef.current.scrollTop = messageRef.current.scrollHeight);

  return (
    <>
      <div className="messages scroll" ref={messageRef}>
        <div className="inner">
          {messages && (
            <>
              <Message messages={messages} />{" "}
              <MDBRow style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                {loading && <Spinner />}
                {!loading && hasNextPage && (
                  <MDBBtn
                    className="btn-view-more"
                    onClick={() =>
                      moreMessages(messages[messages.length - 1]._id)
                    }
                  >
                    Ver más
                  </MDBBtn>
                )}
              </MDBRow>
            </>
          )}
        </div>
      </div>
    </>
  );
}
