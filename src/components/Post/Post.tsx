import React from "react";
import classes from "./Post.module.scss";
import view from "../../assets/img/view.svg";
import { Link } from "react-router-dom";
import EditBlock from "../../common/EditBlock";

const Post = () => {
  return (
    <div className={`${classes.posts__item} ${classes.activePost}`}>
      <div className={classes.posts__itemPost}>
        <EditBlock showEditPostBlock={true} />
        <Link to={"/full-post"}>
          <div className={classes.posts__itemTitle}>{"title"}</div>
        </Link>

        <div className={classes.posts__itemText}>{"description"}</div>
        <div className={classes.posts__itemDate}>
          <div className={classes.posts__date}>{"getDate(createdAt)"}</div>
          <div className={classes.posts__view}>
            <img src={view} alt="" className={classes.posts__viewIcon} />
            <span className={classes.posts__viewCount}>{"views"}</span>
          </div>
        </div>
      </div>
      <img
        src={`http://localhost:5656`}
        alt=""
        className={classes.posts__itemImg}
      />
    </div>
  );
};

export default Post;
