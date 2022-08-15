import React, { FC, useEffect, useState } from "react";
import classes from "./Posts.module.scss";
import Header from "../Header/Header";
import Post from "../Post/Post";
import ItemsList from "../ItemsList/ItemsList";
import {
  useLazyGetAllPostsQuery,
  useRemovePostMutation,
} from "../../redux/api/postsApi";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { setEditPost } from "../../redux/slices/postsSlice";
import PostSkeleton from "../Preloader/PostSkeleton";
import { Pagination } from "antd";

type PropsType = {
  handlePopup: () => void;
  openPopup: boolean;
};

const Posts: FC<PropsType> = ({ handlePopup, openPopup }) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { post, isEdit } = useAppSelector((state) => state.post);
  const [getAllPost, { data, isSuccess, isFetching }] = useLazyGetAllPostsQuery(
    {}
  );
  const [removePost] = useRemovePostMutation();

  const onPagePostChanged = (e: number) => {
    setCurrentPage(e);
    getAllPost(e);
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(setEditPost(post));
    }
  }, [isEdit]);

  useEffect(() => {
    getAllPost(currentPage);
  }, []);

  return (
    <>
      <div className={classes.posts}>
        <Header handlePopup={handlePopup} openPopup={openPopup} />
        {isFetching ? (
          <PostSkeleton />
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
