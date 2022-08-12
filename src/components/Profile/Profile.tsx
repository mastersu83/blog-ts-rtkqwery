import React, { FC, useState } from "react";
import classes from "./Profile.module.scss";
import Header from "../Header/Header";
import ItemsList from "../ItemsList/ItemsList";
import Comment from "../Comment/Comment";
import {
  useGetAllUserCommentsQuery,
  useRemoveCommentMutation,
} from "../../redux/api/commentsApi";
import {
  useGetAllUserPostsQuery,
  useLazyGetOnePostQuery,
  useRemovePostMutation,
} from "../../redux/api/postsApi";
import Post from "../Post/Post";
import { useAppSelector } from "../../hooks/appHooks";
import { getDate } from "../../utils/dateFormater";

type PropsType = {
  handlePopup: () => void;
  openPopup: boolean;
};

const Profile: FC<PropsType> = ({ handlePopup, openPopup }) => {
  const [active, setActive] = useState("Статьи");
  const {
    user: { fullName, createdAt, _id },
  } = useAppSelector((state) => state.auth);
  const { data: comments, isSuccess: isSuccessComments } =
    useGetAllUserCommentsQuery(_id);
  const { data: posts, isSuccess: isSuccessPosts } =
    useGetAllUserPostsQuery(_id);

  const [removePost] = useRemovePostMutation();
  const [removeComment] = useRemoveCommentMutation();
  const [getEditedPost] = useLazyGetOnePostQuery();

  return (
    <div className={classes.profile}>
      <Header handlePopup={handlePopup} openPopup={openPopup} />
      <div className={classes.profile__content}>
        <div className={classes.profile__name}>{fullName}</div>
        <div className={classes.profile__dateRegister}>
          Дата регистрации: <span>{getDate(String(createdAt))}</span>
        </div>
        <div className={classes.profile__buttons}>
          {["Статьи", "Комментарии"].map((text) => (
            <span
              key={text}
              onClick={() => setActive(text)}
              className={`${classes.profile__btn} ${
                text === active ? classes.active : ""
              }`}
            >
              {text}
            </span>
          ))}
        </div>

        <ItemsList>
          {active === "Статьи" ? (
            <>
              <div>
                {isSuccessPosts &&
                  posts.map((post) => (
                    <Post
                      key={post._id}
                      post={post}
                      removePost={removePost}
                      getEditedPost={getEditedPost}
                    />
                  ))}
              </div>
              {/*<div className={classes.posts__pagination}>*/}
              {/*  <Pagination*/}
              {/*    total={posts.totalUserPosts}*/}
              {/*    current={posts.currentPage}*/}
              {/*    showQuickJumper*/}
              {/*    pageSize={posts.pageSize}*/}
              {/*    onChange={onPagePostChanged}*/}
              {/*  />*/}
              {/*</div>*/}
            </>
          ) : (
            <>
              <div>
                {isSuccessComments &&
                  comments.map((comment) => (
                    <Comment
                      comment={comment}
                      key={comment._id}
                      removeComment={removeComment}
                    />
                  ))}
              </div>
              {/*<div className={classes.posts__pagination}>*/}
              {/*  <Pagination*/}
              {/*    total={comments.totalUserComments}*/}
              {/*    current={comments.currentPage}*/}
              {/*    showQuickJumper*/}
              {/*    pageSize={posts.pageSize}*/}
              {/*    onChange={onPageCommentsChanged}*/}
              {/*  />*/}
              {/*</div>*/}
            </>
          )}
        </ItemsList>
      </div>
    </div>
  );
};

export default Profile;
