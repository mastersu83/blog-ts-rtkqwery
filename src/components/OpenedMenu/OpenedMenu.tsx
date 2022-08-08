import React from "react";
import classes from "./OpenedMenu.module.scss";
import { Link } from "react-router-dom";

const OpenedMenu = () => {
  const toggleMenu = false;
  const auth = false;
  const active = false;
  return (
    <div
      className={`${classes.menu} ${classes.open} ${
        toggleMenu ? "" : classes.hide__menu
      }`}
    >
      {auth ? (
        <div className={classes.menu__top}>
          <div className={classes.close__button}>Закрыть</div>
          <div className={classes.menu__name}>{"auth.user.fullName"}</div>
          <div className={classes.menu__date}>
            Дата регистрации: {"getDate(auth.user.createdAt)"}
          </div>
          <div className={classes.menu__navbar}>
            <Link
              to="/"
              className={`${classes.menu__link} ${
                active ? classes.active__menuLink : ""
              }`}
            >
              <span>Главная</span>
            </Link>
            <Link
              to="/profile/posts"
              className={`${classes.menu__link} ${
                active ? classes.active__menuLink : ""
              }`}
            >
              <span>Мой профиль</span>
            </Link>
            <Link
              to="/create-post"
              className={`${classes.menu__link} ${
                active ? classes.active__menuLink : ""
              }`}
            >
              <span>Создать запись</span>
            </Link>
            <div className={classes.menu__link}>Выйти</div>
          </div>
        </div>
      ) : (
        <div className={classes.menu__top}>
          <div className={classes.close__button}>Закрыть</div>
          <div className={classes.menu__navbar}>
            <Link to="/" className={classes.menu__link}>
              Главная
            </Link>
            <div className={classes.menu__link}>Войти</div>
          </div>
        </div>
      )}

      <div className={classes.menu__footer}>МЕНЮ</div>
      {/*<div className="overlay" onClick={menuToggle} />*/}
    </div>
  );
};

export default OpenedMenu;
