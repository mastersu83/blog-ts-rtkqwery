import React, { useEffect } from "react";

import classes from "./FullPost.module.scss";

import view from "../../assets/img/view.svg";
import Preloader from "../Preloader/Preloader";
import Comment from "../Comment/Comment";
import Button from "../../common/Button";
import ItemsList from "../ItemsList/ItemsList";
import {
  useCreateCommentMutation,
  useGetAllCommentsOnePostQuery,
  useRemoveCommentMutation,
} from "../../redux/api/commentsApi";
import { useParams } from "react-router-dom";
import { useGetOnePostQuery } from "../../redux/api/postsApi";
import { getDate } from "../../utils/dateFormater";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { removeEditComment } from "../../redux/slices/commentsSlice";

const FullPost = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const { comment: editedComment, isEdit } = useAppSelector(
    (state) => state.comment
  );

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<{ text: string }>({
    mode: "all",
  });

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

  const [createComment] = useCreateCommentMutation();
  const [removeComment] = useRemoveCommentMutation();

  const onSubmit = (data: { text: string }) => {
    const { text } = data;
    if (id) {
      createComment({ text, postId: id });
    }
    reset();
  };

  const cancel = () => {
    reset();
    dispatch(removeEditComment());
  };

  useEffect(() => {
    if (isEdit) {
      setValue("text", editedComment.text);
    }
  }, [isEdit, editedComment]);

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
                  comments.map((comment) => (
                    <Comment
                      key={comment._id}
                      comment={comment}
                      removeComment={removeComment}
                    />
                  ))}
              </ItemsList>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={classes.full__postAddComment}
              >
                <div className={classes.full__addCommentTitle}>
                  Добавить комментарий
                </div>
                <textarea
                  {...register("text", {
                    required: `Поле обязательно к заполнению`,
                    minLength: {
                      value: 5,
                      message: "Минимум 5 символов",
                    },
                  })}
                  className={classes.full__addCommentInput}
                />
                <div className={classes.full__addCommentBtn}>
                  {isEdit ? (
                    <Button
                      name="Create"
                      disabled={isEdit || isValid}
                      text="Сохранить"
                    />
                  ) : (
                    <Button
                      name="Create"
                      disabled={isEdit || isValid}
                      text="Добавить"
                    />
                  )}

                  <Button
                    name="Cancel"
                    disabled={isEdit || isValid}
                    text="Отмена"
                    cancel={cancel}
                  />
                </div>
              </form>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default FullPost;
