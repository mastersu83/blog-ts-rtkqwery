import React, { FC } from "react";
import classes from "./Post.module.scss";
import view from "../../assets/img/view.svg";
import { Link } from "react-router-dom";
import EditBlock from "../../common/EditBlock";
import { IPost } from "../../types/postType";
import { getDate } from "../../utils/dateFormater";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { setEditPost } from "../../redux/slices/postsSlice";

type PostPropsType = {
  post: IPost;
  removePost: (id: string) => void;
};

const Post: FC<PostPropsType> = ({ post, removePost }) => {
  const dispatch = useAppDispatch();
  const { _id, title, description, views, photoUrl, createdAt, user } = post;
  const { user: authUser } = useAppSelector((state) => state.auth);

  const handleRemovePost = () => {
    removePost(_id);
  };

  const handleEditedPost = () => {
    dispatch(setEditPost(post));
  };

  return (
    <div className={`${classes.posts__item} ${classes.activePost}`}>
      <div className={classes.posts__itemPost}>
        <EditBlock
          showEditPostBlock={user._id === authUser._id}
          handleRemove={handleRemovePost}
          handleEdited={handleEditedPost}
          editPost={true}
        />
        <Link onClick={handleEditedPost} to={`/full-post/${_id}`}>
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
