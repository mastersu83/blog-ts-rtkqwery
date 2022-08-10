import React, { FC } from "react";
import classes from "./Posts.module.scss";
import Header from "../Header/Header";
import Post from "../Post/Post";
import ItemsList from "../ItemsList/ItemsList";
import { useGetAllPostsQuery } from "../../redux/api/postsApi";

type PropsType = {
  handlePopup: () => void;
  openPopup: boolean;
};

const Posts: FC<PropsType> = ({ openPopup, handlePopup }) => {
  const { data, isSuccess } = useGetAllPostsQuery({});
  return (
    <div className={classes.posts}>
      <Header handlePopup={handlePopup} openPopup={openPopup} />
      <ItemsList>
        {isSuccess && data.map((post) => <Post key={post._id} {...post} />)}
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
