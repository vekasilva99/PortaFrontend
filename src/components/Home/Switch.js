import React from "react";
import Conversation from "./Conversations";
import Search from "./Search";
import CreatePost from "./CreatePost";
import { useQuery } from "@apollo/react-hooks";
import {
  QUERY_CATEGORY,
  QUERY_POST_BY_CREATOR
} from "../../helpers/graphql/querys";
import { useSelector } from "react-redux";
export default function Switch(props) {
  const { data, loading, error } = useQuery(QUERY_CATEGORY);
  const { userId } = useSelector(state => ({ ...state.User }));
  const { data: dataPosts, loading: loadingPosts, updateQuery } = useQuery(
    QUERY_POST_BY_CREATOR,
    {
      variables: {
        userId
      }
    }
  );

  const addPostUser = post => {
    updateQuery(({ postsByCreator }) => {
      const res = Object.assign({}, postsByCreator, {
        postsByCreator: [...postsByCreator, post]
      });
      return res;
    });
  };

  return (
    <div className="switch">
      <Conversation {...props} posts={dataPosts && dataPosts.postsByCreator} />

      <Search
        {...props}
        categories={
          data &&
          data.__type.enumValues.map(e => {
            return { value: e.name, label: e.description };
          })
        }
      />
      <CreatePost
        {...props}
        updatePost={addPostUser}
        categories={
          data &&
          data.__type.enumValues.map(e => {
            return { value: e.name, label: e.description };
          })
        }
      />
    </div>
  );
}
