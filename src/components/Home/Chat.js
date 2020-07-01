import React, { useState, useEffect } from "react";
import InputMessage from "./inputMessage";
import BarLoad from "./barLoad";
import Navbar from "./NavBar";
import { useLazyQuery } from "@apollo/react-hooks";
import Messages from "./Messages";
import Spinner from "./../spinner";
import { QUERY_MESSAGES } from "../../helpers/graphql/querys";
import { useSelector, useDispatch } from "react-redux";

export default function Chat() {
  const { postId, title, urlImg, creator } = useSelector(state => ({
    ...state.Post
  }));
  const [
    MessagesQuery,
    { data, subscribeToMore, loading, error, fetchMore }
  ] = useLazyQuery(QUERY_MESSAGES, { fetchPolicy: "network-only" });

  const dispatch = useDispatch();
  const [loadingMore, setLoadingMore] = useState(false);

  const moreMessages = async cursor => {
    setLoadingMore(true);
    await fetchMore({
      variables: {
        postId: postId,
        first: 5,
        after: cursor
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          messages: {
            ...prev.messages,
            hasNextPage: fetchMoreResult.messages.hasNextPage,
            messages: [
              ...prev.messages.messages,
              ...fetchMoreResult.messages.messages
            ]
          }
        });
      }
    });
    setLoadingMore(false);
  };

  useEffect(() => {
    if (postId) {
      MessagesQuery({
        variables: {
          postId: postId,
          first: 20
        }
      });
    }
  }, [MessagesQuery, postId]);

  const onClick = () => {
    dispatch({
      type: "TOGGLE"
    });
  };
  return (
    <div className="chat">
      <Navbar title={title} urlImg={urlImg} onClick={onClick} />
      {data && (
        <Messages
          postId={postId}
          subscribeToMore={subscribeToMore}
          moreMessages={moreMessages}
          messages={data.messages.messages}
          loading={loadingMore}
          hasNextPage={data.messages.hasNextPage}
        />
      )}
      {!data && loading && (
        <div className="initMessage">
          {" "}
          <Spinner />
        </div>
      )}
      {!data && !loading && (
        <div className="initMessage">
          <div className="message">
            Welcome <img src={require("../../assets/img/graphql.svg")} alt="" />
          </div>
        </div>
      )}
      {postId && data ? <InputMessage postId={postId} /> : <BarLoad />}
    </div>
  );
}
