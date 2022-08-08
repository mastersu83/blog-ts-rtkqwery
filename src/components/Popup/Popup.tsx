import React from "react";

import classes from "./Popup.module.scss";

import closeIcon from "../../assets/img/closePopup.svg";
import Button from "../../common/Button";

const Popup = () => {
  const popupLogin = false;
  const contentPopup = true;

  return (
    <div className={`${classes.popup} ${popupLogin ? classes.open : ""}`}>
      <div className={classes.popup__body}>
        <div className={classes.popup__content}>
          <img className={classes.popup__closeImg} src={closeIcon} alt="" />
          <div className={classes.popup__inner}>
            <div id="formEdit" className={classes.popup__formEdit}>
              {contentPopup ? (
                <div className={classes.popup__title}>Вход в аккаунт</div>
              ) : (
                <>
                  <div className={classes.popup__title}>Регистрация</div>
                  <div>Имя и Фамилия</div>
                  <input
                    name="fullName"
                    className={classes.popup__input}
                    type="text"
                    placeholder="Введите Имя и Фамилию..."
                    required
                  />
                </>
              )}
              <div>Email</div>
              <input
                name="email"
                className={classes.popup__input}
                type="text"
                placeholder="Введите Email..."
                required
              />
              <div>Пароль</div>
              <input
                name="password"
                className={classes.popup__input}
                type="password"
                placeholder="Введите пароль..."
                required
              />
              <div className={classes.popup__btn}>
                <Button text={contentPopup ? "Войти" : "Зарегистрироваться"} />
              </div>
            </div>
            <div>
              {!contentPopup ? (
                <span className={classes.popup__link}>Войти:</span>
              ) : (
                <div className={classes.popup__link}>Зарегистрироваться:</div>
              )}
            </div>
          </div>
        </div>
        <div className={classes.overlay} />
      </div>
    </div>
  );
};

export default Popup;
