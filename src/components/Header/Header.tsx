import React, { ChangeEvent, FC, useEffect, useState } from "react";

import classes from "./Header.module.scss";

import search from "../../assets/img/search.svg";
import { Link } from "react-router-dom";
import addPost from "../../assets/img/addPost.svg";
import logInIcon from "../../assets/img/logIn.svg";
import logOutIcon from "../../assets/img/logOut.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { logOut } from "../../redux/slices/authSlice";
import Alert from "../Alert/Alert";
import { setEditPost, setSearchPost } from "../../redux/slices/postsSlice";
import { IPost } from "../../types/postType";
import { useDebounce } from "use-debounce";
import { useLazyGetAllPostsQuery } from "../../redux/api/postsApi";

type PropsType = {
  handlePopup: () => void;
  currentPage?: number;
};

const Header: FC<PropsType> = ({ handlePopup, currentPage }) => {
  const dispatch = useAppDispatch();
  const [errorText, setErrorText] = useState<string>("");
  const [searchInput, setSearchInput] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const [inputValue] = useDebounce(searchInputValue, 1000);

  const {
    isAuth,
    user: { fullName },
  } = useAppSelector((state) => state.auth);

  const [searchPost, { data }] = useLazyGetAllPostsQuery();

  const onLogOut = () => {
    dispatch(logOut());
  };

  const needLogin = () => {
    setErrorText("Вы не авторизованны");
  };

  const getEditPost = () => {
    dispatch(setEditPost({} as IPost));
  };

  const showSearch = () => {
    setSearchInput(!searchInput);
    setSearchInputValue(searchInputValue);
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue) {
      searchPost({
        search: inputValue,
        currentPage: currentPage ? currentPage : 1,
      });
      dispatch(setSearchPost(data ? data : { items: [], total: 0 }));
    } else {
      dispatch(setSearchPost({ items: [], total: 0 }));
    }
  }, [inputValue]);

  useEffect(() => {
    if (data) {
      dispatch(setSearchPost(data));
    }
  }, [data]);

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
      {searchInput ? (
        <input
          onBlur={showSearch}
          onChange={onSearchChange}
          name="search"
          autoFocus={true}
          className={classes.posts__headerSearch}
          type="text"
          value={searchInputValue}
        />
      ) : (
        <div className={classes.posts__headerIcons}>
          <img
            onClick={showSearch}
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
            <Link onClick={getEditPost} to="/create-post">
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
        </div>
      )}
    </div>
  );
};

export default Header;
