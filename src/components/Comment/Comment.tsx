import React from "react";
import classes from "./Comment.module.scss";
import EditBlock from "../../common/EditBlock";

const Comment = () => {
  return (
    <div className={classes.full__postComment}>
      <EditBlock showEditPostBlock={true} />
      <div className={classes.full__postCommentHeader}>
        <div className={classes.full__postCommentName}>{"user.fullName"}</div>
        <div className={classes.full__postCommentDate}>
          {"getDate(createdAt)"}
        </div>
      </div>
      <div className={classes.full__postCommentText}>
        <span>{"text"}</span>
      </div>
    </div>
  );
};

export default Comment;
