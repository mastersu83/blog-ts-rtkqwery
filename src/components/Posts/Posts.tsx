import React, { FC, useEffect, useState } from "react";
import classes from "./Posts.module.scss";
import Header from "../Header/Header";
import Post from "../Post/Post";
import ItemsList from "../ItemsList/ItemsList";
import {
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useRemovePostMutation,
} from "../../redux/api/postsApi";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { setAllPost, setEditPost } from "../../redux/slices/postsSlice";
import PostSkeleton from "../Preloader/PostSkeleton";
import { Pagination } from "antd";

type PropsType = {
  handlePopup: () => void;
};

const Posts: FC<PropsType> = ({ handlePopup }) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { editPost, searchPost } = useAppSelector((state) => state.post);

  const [getAllPost, { data, isSuccess, isFetching }] =
    useLazyGetAllPostsQuery();

  const { data: test, isSuccess: isSuccessTest } = useGetAllPostsQuery({
    currentPage,
    search: "",
  });

  console.log(test);

  const [removePost] = useRemovePostMutation();

  const onPagePostChanged = (e: number) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (editPost._id) {
      dispatch(setEditPost(editPost));
    }
  }, [editPost._id]);

  useEffect(() => {
    getAllPost({ currentPage, search: "" });
    dispatch(setAllPost(test ? test.items : []));
  }, [currentPage, isSuccessTest]);

  return (
    <>
      <div className={classes.posts}>
        <Header handlePopup={handlePopup} currentPage={currentPage} />
        {isFetching ? (
          <PostSkeleton />
        ) : searchPost.length ? (
          <ItemsList>
            {searchPost.map((post) => (
              <Post key={post._id} post={post} removePost={removePost} />
            ))}
          </ItemsList>
        ) : (
          <ItemsList>
            {isSuccess &&
              data &&
              data.items.map((post) => (
                <Post key={post._id} post={post} removePost={removePost} />
              ))}
          </ItemsList>
        )}
        <Pagination
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          total={data ? data.total : 0}
          current={currentPage}
          showQuickJumper
          pageSize={5}
          onChange={onPagePostChanged}
        />
      </div>
    </>
  );
};

export default Posts;
