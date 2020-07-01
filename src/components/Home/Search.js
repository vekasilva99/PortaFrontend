import React, { useState } from "react";
import CardCategories from "../Cards/CardCategory";
import HeaderSearch from "./HeaderSearch";
import CardPosts from "../Cards/CardPost";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_SEARCH_POST } from "../../helpers/graphql/querys";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../pagination";
import Spinner from "../spinner";
export default function Conversations({ options, categories }) {
  const [categoriesSelected, setCatetories] = useState([]);
  const [search, setSearch] = useState("");
  const handlingChange = e => {
    if (e === null) setCatetories([]);
    else setCatetories(e);
  };
  const handlingSearch = e => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const { data, loading, error } = useQuery(QUERY_SEARCH_POST, {
    variables: {
      first: 10,
      after: 0,
      word: search,
      categories: categoriesSelected.map(e => e.value)
    }
  });
  const { postId } = useSelector(state => ({
    ...state.Post
  }));
  const dispatch = useDispatch();
  const closeSideBar = () => {
    dispatch({
      type: "CLOSE_SIDEBAR"
    });
  };
  const changePost = (postId, title, urlImg, creator) => {
    dispatch({
      type: "CHANGE_POST",
      payload: { postId, creator, urlImg, title }
    });
  };
  const Posts = ({ posts }) =>
    posts.map(post => (
      <CardPosts
        {...post}
        key={post._id}
        changePost={changePost}
        postId={postId}
        closeSideBar={closeSideBar}
      />
    ));

  return (
    <section
      className={
        options === 1 ? "categories active scroll" : "categories scroll"
      }
    >
      <HeaderSearch
        categories={categories}
        search={search}
        categoriesSelected={categoriesSelected}
        handlingChange={handlingChange}
        handlingSearch={handlingSearch}
      />
      <div id="posts" className="posts">
        {data && !loading && <Posts posts={data.searchPost} />}
        {loading && <Spinner />}
      </div>
    </section>
  );
}
