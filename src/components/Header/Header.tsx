import React from "react";

import classes from "./Header.module.scss";

import search from "../../assets/img/search.svg";
import { Link } from "react-router-dom";
import addPost from "../../assets/img/addPost.svg";
import logIn from "../../assets/img/logIn.svg";
import logOut from "../../assets/img/logOut.svg";

const Header = () => {
  return (
    <div className={classes.posts__header}>
      <Link to="/">
        <div className={classes.posts__headerTitle}>VASYA BLOG</div>
      </Link>
      <div className={classes.posts__headerIcons}>
        <img
          src={search}
          alt=""
          className={classes.posts__headerIcon}
          title="Поиск"
        />
        <Link to="/create-post">
          <img
            src={addPost}
            alt=""
            className={classes.posts__headerIcon}
            title="Создать статью"
          />
        </Link>

        <img
          src={logIn}
          alt=""
          className={classes.posts__headerIcon}
          title="Вход"
        />

        <Link to="/">
          <img
            src={logOut}
            alt=""
            className={classes.posts__headerIcon}
            title="Выход"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
