import React, { useEffect, useState } from "react";
import { MESSAGE_ADDED_SUBSCRIPTION } from "../../helpers/graphql/subscription";
import CardMessage from "./../Cards/CardMessage";
import { MDBBtn, MDBRow } from "mdbreact";
import { useSelector } from "react-redux";
import Spinner from "../spinner";
export default function Messages({
  messages,
  subscribeToMore,
  moreMessages,
  loading,
  hasNextPage,
  postId
}) {
  const { userId } = useSelector(state => ({
    ...state.User
  }));
  const messageRef = React.useRef();
  const options = {
    timeZone: "UTC",
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
  };

  useEffect(() => {
    const unsubscription = subscribeToMore({
      document: MESSAGE_ADDED_SUBSCRIPTION,
      variables: { postId: postId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAdded;
        if (!prev.messages.messages.find(msg => msg._id === newMessage._id)) {
          const res = Object.assign({}, prev, {
            messages: {
              ...prev.messages,
              messages: [newMessage, ...prev.messages.messages]
            }
          });
          return res;
        } else return prev;
      }
    });
    return () => {
      unsubscription();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const Message = ({ messages }) => {
    return messages.map(message => (
      <div key={message._id} className="d-flex flex-column w-100 ">
        <CardMessage userId={userId} options={options} {...message} />
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
