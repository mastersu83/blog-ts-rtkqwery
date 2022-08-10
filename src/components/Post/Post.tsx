import React, { FC } from "react";
import classes from "./Post.module.scss";
import view from "../../assets/img/view.svg";
import { Link } from "react-router-dom";
import EditBlock from "../../common/EditBlock";
import { IPost } from "../../types/postType";
import { getDate } from "../../utils/dateFormater";

const Post: FC<IPost> = ({
  _id,
  title,
  description,
  views,
  photoUrl,
  createdAt,
}) => {
  return (
    <div className={`${classes.posts__item} ${classes.activePost}`}>
      <div className={classes.posts__itemPost}>
        <EditBlock showEditPostBlock={true} />
        <Link to={`/full-post/${_id}`}>
          <div className={classes.posts__itemTitle}>{title}</div>
        </Link>

        <div className={classes.posts__itemText}>{description}</div>
        <div className={classes.posts__itemDate}>
          <div className={classes.posts__date}>
            {getDate(String(createdAt))}
          </div>
          <div className={classes.posts__view}>
            <img src={view} alt="" className={classes.posts__viewIcon} />
            <span className={classes.posts__viewCount}>{views}</span>
          </div>
        </div>
      </div>
      <img
        src={`http://localhost:5656/${photoUrl}`}
        alt=""
        className={classes.posts__itemImg}
      />
    </div>
  );
};

export default Post;
