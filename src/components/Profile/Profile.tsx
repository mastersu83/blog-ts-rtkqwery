import React, { FC } from "react";
import classes from "./Profile.module.scss";
import Header from "../Header/Header";
import ItemsList from "../ItemsList/ItemsList";
import Comment from "../Comment/Comment";
import { useGetAllCommentsQuery } from "../../redux/api/commentsApi";

type PropsType = {
  handlePopup: () => void;
  openPopup: boolean;
};

const Profile: FC<PropsType> = ({ openPopup, handlePopup }) => {
  const content = false;
  const { data, isSuccess } = useGetAllCommentsQuery({});
  console.log(data);
  return (
    <div className={classes.profile}>
      <Header handlePopup={handlePopup} openPopup={openPopup} />
      <div className={classes.profile__content}>
        <div className={classes.profile__name}>{"auth.user.fullName"}</div>
        <div className={classes.profile__dateRegister}>
          Дата регистрации: <span>{"getDate(auth.user.createdAt)"}</span>
        </div>
        <div className={classes.profile__buttons}>
          <button className={`${classes.profile__btn} ${classes.active}`}>
            Статьи
          </button>
          <button className={`${classes.profile__btn}`}>Комментарии</button>
        </div>

        <ItemsList>
          {content ? (
            <>
              <div>
                {/*<Post />*/}
                {/*<Post />*/}
                {/*<Post />*/}
                {/*<Post />*/}
                {/*<Post />*/}
                {/*<Post />*/}
                {/*<Post />*/}
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
                {isSuccess &&
                  data.map((comment) => <Comment key={comment._id} />)}
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
