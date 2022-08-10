import React, { ChangeEvent, FC, useEffect, useState } from "react";

import classes from "./Popup.module.scss";

import closeIcon from "../../assets/img/closePopup.svg";
import Button from "../../common/Button";
import { useLoginMutation } from "../../redux/api/authApi";
import { useAppDispatch } from "../../hooks/appHooks";
import { setUser } from "../../redux/slices/authSlice";
import Alert from "../Alert/Alert";

type PropsType = {
  handlePopup: () => void;
  openPopup: boolean;
};

type FormValuesType = {
  email: string;
  password: string;
  fullName: string;
};

const Popup: FC<PropsType> = ({ openPopup, handlePopup }) => {
  const dispatch = useAppDispatch();
  const [contentPopup, setContentPopup] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [inputs, setInputs] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [login, { data, isSuccess, isError }] = useLoginMutation();

  const email: string = "master3@mail.ru";
  const password: string = "123456";

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onLogin = () => {
    login({ email: inputs.email, password: inputs.password });
    handlePopup();
  };

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("token", data.token ? data.token : "");
      dispatch(setUser(data));
    } else if (isError) {
      setErrorText("Пользователь не найден");
    }
  }, [isError, isSuccess, data]);

  if (errorText) {
    return (
      <Alert text={errorText} isError={isError} setErrorText={setErrorText} />
    );
  }

  return (
    <div className={`${classes.popup} ${openPopup ? classes.open : ""}`}>
      <div className={classes.popup__body}>
        <div className={classes.popup__content}>
          <img
            onClick={handlePopup}
            className={classes.popup__closeImg}
            src={closeIcon}
            alt=""
          />
          <div className={classes.popup__inner}>
            <form id="formEdit" className={classes.popup__formEdit}>
              {!contentPopup ? (
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
                  />
                </>
              )}
              <div>Email</div>
              <input
                name="email"
                onChange={onInputChange}
                className={classes.popup__input}
                type="email"
                placeholder="Введите Email..."
                required
              />
              <div>Пароль</div>
              <input
                onChange={onInputChange}
                name="password"
                className={classes.popup__input}
                type="password"
                placeholder="Введите пароль..."
              />
              <div className={classes.popup__btn}>
                <Button
                  disabled={
                    inputs.email.length > 0 && inputs.password.length > 0
                  }
                  onLogin={onLogin}
                  text={!contentPopup ? "Войти" : "Зарегистрироваться"}
                />
              </div>
            </form>
            <div>
              {contentPopup ? (
                <span
                  onClick={() => setContentPopup(!contentPopup)}
                  className={classes.popup__link}
                >
                  Войти:
                </span>
              ) : (
                <div
                  onClick={() => setContentPopup(!contentPopup)}
                  className={classes.popup__link}
                >
                  Зарегистрироваться:
                </div>
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
