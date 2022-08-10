import React, { FC } from "react";
import classes from "./OpenedMenu.module.scss";
import { Link } from "react-router-dom";

const links: { id: number; link: string; path: string }[] = [
  { id: 1, link: "Главная", path: "/" },
  { id: 2, link: "Мой профиль", path: "/profile" },
  { id: 3, link: "Создать запись", path: "/create-post" },
];

type PropsType = {
  handleMenu: () => void;
  handlePopup: () => void;
  openMenu: boolean;
};

const OpenedMenu: FC<PropsType> = ({ openMenu, handleMenu, handlePopup }) => {
  const auth = false;
  const active = false;
  return (
    <div
      className={`${classes.menu} ${classes.open} ${
        openMenu ? "" : classes.hide__menu
      }`}
    >
      <div className={classes.menu__top}>
        <div onClick={handleMenu} className={classes.close__button}>
          Закрыть
        </div>
        <div className={classes.menu__navbar}>
          {auth ? (
            <>
              <div className={classes.menu__name}>{"auth.user.fullName"}</div>
              <div className={classes.menu__date}>
                Дата регистрации: {"getDate(auth.user.createdAt)"}
              </div>
              {links.map((obj) => (
                <Link
                  key={obj.id}
                  onClick={handleMenu}
                  to={obj.path}
                  className={`${classes.menu__link} ${
                    active ? classes.active__menuLink : ""
                  }`}
                >
                  {obj.link}
                </Link>
              ))}
              <div className={classes.menu__link}>Выйти</div>
            </>
          ) : (
            <>
              <Link
                onClick={handleMenu}
                to="/"
                className={`${classes.menu__link} ${classes.active__menuLink}`}
              >
                Главная
              </Link>
              <div onClick={handlePopup} className={classes.menu__link}>
                Войти
              </div>
            </>
          )}
        </div>
      </div>

      <div className={classes.menu__footer}>МЕНЮ</div>
      {/*<div className="overlay" onClick={menuToggle} />*/}
    </div>
  );
};

export default OpenedMenu;
