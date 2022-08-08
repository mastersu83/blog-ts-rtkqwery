import React from "react";

import classes from "./FullPost.module.scss";

import view from "../../assets/img/view.svg";
import Preloader from "../Preloader/Preloader";
import Comment from "../Comment/Comment";
import Button from "../../common/Button";
import ItemsList from "../ItemsList/ItemsList";

const FullPost = () => {
  const isFetching = false;
  return (
    <>
      {isFetching ? (
        <Preloader />
      ) : (
        <div className={classes.full__post}>
          <div className={classes.full__postTitleBox}>
            <img
              className={classes.full__postImage}
              src={`http://localhost:5656`}
              alt=""
            />
            <div className={classes.full__postTitleWrapper}>
              <div className={classes.full__postDate}>
                <div className={classes.full__date}>{"fullPost.createdAt"}</div>
                <div className={classes.full__view}>
                  <img src={view} alt="" className={classes.full__viewIcon} />
                  <div className={classes.full__viewCount}>
                    {"fullPost.views"}
                  </div>
                </div>
              </div>
              <div className={classes.full__postTitle}>{"fullPost.title"}</div>
              <div className={classes.full__postDesc}>
                {"fullPost.description"}
              </div>
            </div>
          </div>
          <div className={classes.full__postContainer}>
            <div className={classes.full__postText}>{"fullPost.text"}</div>
            <div className={classes.full__comments}>
              Комментарии ({"comments.totalPostComments"})
            </div>
            <ItemsList>
              <Comment />
              <Comment />
              <Comment />
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
      )}
    </>
  );
};

export default FullPost;
