import React, { FC, useEffect, useState } from "react";
import classes from "./OpenedMenu.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { getDate } from "../../utils/dateFormater";
import { logOut } from "../../redux/slices/authSlice";

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
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const [active, setActive] = useState(pathname);

  const {
    user: { fullName, createdAt },
    isAuth,
  } = useAppSelector((state) => state.auth);

  const onLogOut = () => {
    dispatch(logOut());
    handleMenu();
  };

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

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
          {isAuth ? (
            <>
              <div className={classes.menu__name}>{fullName}</div>
              <div className={classes.menu__date}>
                Дата регистрации: {getDate(String(createdAt))}
              </div>
              {links.map((obj) => (
                <Link
                  key={obj.id}
                  // onClick={handleMenu}
                  to={obj.path}
                  className={`${classes.menu__link} ${
                    active === obj.path ? classes.active__menuLink : ""
                  }`}
                >
                  {obj.link}
                </Link>
              ))}
              <div onClick={onLogOut} className={classes.menu__link}>
                Выйти
              </div>
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
