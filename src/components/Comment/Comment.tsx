import React, { FC } from "react";
import classes from "./Comment.module.scss";
import EditBlock from "../../common/EditBlock";
import { IComments } from "../../types/commentsType";
import { getDate } from "../../utils/dateFormater";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { setEditComment } from "../../redux/slices/commentsSlice";
import { useNavigate } from "react-router-dom";

type CommentPropsType = {
  comment: IComments;
  removeComment: (id: string) => void;
};

const Comment: FC<CommentPropsType> = ({ comment, removeComment }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user: authUser } = useAppSelector((state) => state.auth);

  const { user, createdAt, text, _id, post } = comment;

  const handleRemoveComment = () => {
    removeComment(_id);
  };

  const handleEditedComment = () => {
    dispatch(setEditComment(comment));
    navigate(`/full-post/${post}`);
  };

  return (
    <div className={classes.full__postComment}>
      <EditBlock
        showEditPostBlock={user._id === authUser._id}
        handleRemove={handleRemoveComment}
        handleEdited={handleEditedComment}
        editPost={false}
      />
      <div className={classes.full__postCommentHeader}>
        <div className={classes.full__postCommentName}>{user.fullName}</div>
        <div className={classes.full__postCommentDate}>
          {getDate(String(createdAt))}
        </div>
      </div>
      <div className={classes.full__postCommentText}>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Comment;
