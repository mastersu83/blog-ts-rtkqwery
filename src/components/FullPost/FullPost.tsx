import React from "react";

import classes from "./FullPost.module.scss";

import view from "../../assets/img/view.svg";
import Preloader from "../Preloader/Preloader";
import Comment from "../Comment/Comment";
import Button from "../../common/Button";
import ItemsList from "../ItemsList/ItemsList";
import { useGetAllCommentsOnePostQuery } from "../../redux/api/commentsApi";
import { useParams } from "react-router-dom";
import { useGetOnePostQuery } from "../../redux/api/postsApi";
import { getDate } from "../../utils/dateFormater";

const FullPost = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: comments,
    isSuccess: isSuccessComments,
    isLoading: isLoadingComments,
  } = useGetAllCommentsOnePostQuery(String(id));

  const {
    data: post,
    isSuccess: isSuccessPost,
    isLoading: isLoadingPost,
  } = useGetOnePostQuery(String(id));

  console.log(isSuccessPost && typeof post.createdAt);

  return (
    <>
      {isLoadingComments && isLoadingPost ? (
        <Preloader />
      ) : (
        isSuccessPost && (
          <div className={classes.full__post}>
            <div className={classes.full__postTitleBox}>
              <img
                className={classes.full__postImage}
                src={`http://localhost:5656${post.photoUrl}`}
                alt=""
              />
              <div className={classes.full__postTitleWrapper}>
                <div className={classes.full__postDate}>
                  <div className={classes.full__date}>
                    {getDate(String(post.createdAt))}
                  </div>
                  <div className={classes.full__view}>
                    <img src={view} alt="" className={classes.full__viewIcon} />
                    <div className={classes.full__viewCount}>{post.views}</div>
                  </div>
                </div>
                <div className={classes.full__postTitle}>{post.title}</div>
                <div className={classes.full__postDesc}>{post.description}</div>
              </div>
            </div>
            <div className={classes.full__postContainer}>
              <div className={classes.full__postText}>{post.text}</div>
              <div className={classes.full__comments}>
                Комментарии ({isSuccessComments ? comments.length : 0})
              </div>
              <ItemsList>
                {isSuccessComments &&
                  comments.map((comment) => <Comment key={comment._id} />)}
              </ItemsList>
              <div className={classes.full__postAddComment}>
                <div className={classes.full__addCommentTitle}>
                  Добавить комментарий
                </div>
                <textarea
                  className={classes.full__addCommentInput}
                  defaultValue=""
                />
                <div className={classes.full__addCommentBtn}>
                  <Button text="Сохранить" />
                  <Button text="Отмена" />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default FullPost;
