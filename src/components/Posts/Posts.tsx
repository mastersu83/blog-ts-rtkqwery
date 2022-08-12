import React, { FC, useEffect } from "react";
import classes from "./Posts.module.scss";
import Header from "../Header/Header";
import Post from "../Post/Post";
import ItemsList from "../ItemsList/ItemsList";
import {
  useGetAllPostsQuery,
  useLazyGetOnePostQuery,
  useRemovePostMutation,
} from "../../redux/api/postsApi";
import { useAppDispatch } from "../../hooks/appHooks";
import { setEditPost } from "../../redux/slices/postsSlice";

type PropsType = {
  handlePopup: () => void;
  openPopup: boolean;
};

const Posts: FC<PropsType> = ({ handlePopup, openPopup }) => {
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useGetAllPostsQuery({});
  const [removePost] = useRemovePostMutation();
  const [getEditedPost, { data: editPost }] = useLazyGetOnePostQuery();

  useEffect(() => {
    if (editPost) {
      dispatch(setEditPost(editPost));
    }
  }, [editPost]);

  return (
    <div className={classes.posts}>
      <Header handlePopup={handlePopup} openPopup={openPopup} />
      <ItemsList>
        {isSuccess &&
          data.map((post) => (
            <Post
              key={post._id}
              post={post}
              removePost={removePost}
              getEditedPost={getEditedPost}
            />
          ))}
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
