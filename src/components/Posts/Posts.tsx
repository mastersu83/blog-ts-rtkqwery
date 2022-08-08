import React from "react";
import classes from "./Posts.module.scss";
import Alert from "../Alert/Alert";
import Header from "../Header/Header";
import Post from "../Post/Post";
import ItemsList from "../ItemsList/ItemsList";

const Posts = () => {
  return (
    <div className={classes.posts}>
      <Alert />
      <Header />
      <ItemsList>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </ItemsList>
      {/*<div className={classes.posts__pagination}>*/}
      {/*  <Pagination*/}
      {/*    total={posts.totalPosts}*/}
      {/*    current={posts.currentPage}*/}
      {/*    showQuickJumper*/}
      {/*    pageSize={posts.pageSize}*/}
      {/*    onChange={onPageChanged}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

export default Posts;
