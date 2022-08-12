import React, { FC, useState } from "react";

import classes from "./Header.module.scss";

import search from "../../assets/img/search.svg";
import { Link } from "react-router-dom";
import addPost from "../../assets/img/addPost.svg";
import logInIcon from "../../assets/img/logIn.svg";
import logOutIcon from "../../assets/img/logOut.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { logOut } from "../../redux/slices/authSlice";
import Alert from "../Alert/Alert";

type PropsType = {
  handlePopup: () => void;
  openPopup: boolean;
};

const Header: FC<PropsType> = ({ handlePopup, openPopup }) => {
  const dispatch = useAppDispatch();
  const [errorText, setErrorText] = useState<string>("");

  const {
    isAuth,
    user: { fullName },
  } = useAppSelector((state) => state.auth);

  const onLogOut = () => {
    dispatch(logOut());
    console.log("hello");
  };

  const needLogin = () => {
    setErrorText("Вы не авторизованны");
  };

  return (
    <div className={classes.posts__header}>
      {errorText && (
        <Alert text={errorText} isError={true} setErrorText={setErrorText} />
      )}
      <Link to="/">
        <div className={classes.posts__headerTitle}>
          <span>{fullName ? fullName.toUpperCase() : ""}</span> BLOG
        </div>
      </Link>
      <div className={classes.posts__headerIcons}>
        <img
          src={search}
          alt=""
          className={classes.posts__headerIcon}
          title="Поиск"
        />
        {!isAuth ? (
          <img
            onClick={needLogin}
            src={addPost}
            alt=""
            className={classes.posts__headerIcon}
            title="Создать статью"
          />
        ) : (
          <Link to="/create-post">
            <img
              src={addPost}
              alt=""
              className={classes.posts__headerIcon}
              title="Создать статью"
            />
          </Link>
        )}

        <img
          onClick={isAuth ? onLogOut : handlePopup}
          src={isAuth ? logOutIcon : logInIcon}
          alt=""
          className={classes.posts__headerIcon}
          title={isAuth ? "Вход" : "Выход"}
        />

        {/*<img*/}
        {/*  src={logOut}*/}
        {/*  alt=""*/}
        {/*  className={classes.posts__headerIcon}*/}
        {/*  title="Выход"*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default Header;
