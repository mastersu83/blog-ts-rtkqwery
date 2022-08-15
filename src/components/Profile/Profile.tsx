import React, { FC, useEffect, useState } from "react";
import classes from "./Profile.module.scss";
import Header from "../Header/Header";
import ItemsList from "../ItemsList/ItemsList";
import Comment from "../Comment/Comment";
import {
  useGetAllUserCommentsQuery,
  useRemoveCommentMutation,
} from "../../redux/api/commentsApi";
import {
  useLazyGetAllUserPostsQuery,
  useRemovePostMutation,
} from "../../redux/api/postsApi";
import Post from "../Post/Post";
import { useAppSelector } from "../../hooks/appHooks";
import { getDate } from "../../utils/dateFormater";
import { Pagination } from "antd";

type PropsType = {
  handlePopup: () => void;
};

const Profile: FC<PropsType> = ({ handlePopup }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState("Статьи");
  const {
    user: { fullName, createdAt, _id },
  } = useAppSelector((state) => state.auth);
  const { data: comments, isSuccess: isSuccessComments } =
    useGetAllUserCommentsQuery(_id);
  const [getAllUserPost, { data: posts, isSuccess: isSuccessPosts }] =
    useLazyGetAllUserPostsQuery();

  const [removePost] = useRemovePostMutation();
  const [removeComment] = useRemoveCommentMutation();

  const onPagePostChanged = (e: number) => {
    setCurrentPage(e);
    getAllUserPost({ userId: _id, currentPage: e });
  };

  useEffect(() => {
    getAllUserPost({ userId: _id, currentPage });
  }, []);

  return (
    <div className={classes.profile}>
      <Header handlePopup={handlePopup} />
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
                  posts &&
                  posts.items.map((post) => (
                    <Post key={post._id} post={post} removePost={removePost} />
                  ))}
              </div>
            </>
          ) : (
            <>
              <div>
                {isSuccessComments &&
                  comments.items.map((comment) => (
                    <Comment
                      comment={comment}
                      key={comment._id}
                      removeComment={removeComment}
                    />
                  ))}
              </div>
            </>
          )}
        </ItemsList>
        <Pagination
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          total={posts ? posts.total : 0}
          current={currentPage}
          showQuickJumper
          pageSize={5}
          onChange={onPagePostChanged}
        />
      </div>
    </div>
  );
};

export default Profile;
