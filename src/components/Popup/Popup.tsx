import React, { FC, useEffect, useState } from "react";

import classes from "./Popup.module.scss";

import closeIcon from "../../assets/img/closePopup.svg";
import { useLoginMutation, useRegisterMutation } from "../../redux/api/authApi";
import { useAppDispatch } from "../../hooks/appHooks";
import { loginUser } from "../../redux/slices/authSlice";
import Alert from "../Alert/Alert";
import { useForm } from "react-hook-form";
import PopupForm from "../../common/PopupForm/PopupForm";
import PopupFormInput from "../../common/PopupForm/PopupFormInput";
import { PopupFormValuesType } from "../../types/formValueType";

type PropsType = {
  handlePopup: () => void;
  openPopup: boolean;
};

const Popup: FC<PropsType> = ({ openPopup, handlePopup }) => {
  const dispatch = useAppDispatch();
  const [contentPopup, setContentPopup] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<PopupFormValuesType>({
    mode: "all",
  });

  const [
    login,
    {
      data: loginData,
      isSuccess: loginIsSuccess,
      isError: loginIsError,
      reset: loginReset,
      error: loginError,
    },
  ] = useLoginMutation();
  const [
    registration,
    {
      data: registerData,
      isSuccess: registerIsSuccess,
      error: registerError,
      reset: registerReset,
    },
  ] = useRegisterMutation();

  const onSubmit = (data: PopupFormValuesType) => {
    const { email, password, fullName } = data;
    if (watch("fullName")) {
      loginReset();
      registration({ email, password, fullName });
    } else {
      login({ email, password });
    }
    reset();
    handlePopup();
  };

  const handleContentPopup = () => {
    setContentPopup(!contentPopup);
    reset();
  };

  useEffect(() => {
    if (loginIsSuccess && loginData) {
      localStorage.setItem("token", loginData.token ? loginData.token : "");
      dispatch(loginUser());
    } else if (registerData) {
      setErrorText("Вы зарегистрировались, теперь можете войти");
    }
  }, [loginIsError, loginIsSuccess, loginData, registerData]);

  if (registerError || loginError) {
    if (registerError) {
      if ("status" in registerError) {
        const errMsg =
          "error" in registerError
            ? registerError.error
            : JSON.stringify(registerError.data).split(":")[1].slice(1, -2);
        return (
          <Alert
            text={errMsg}
            isError={true}
            setErrorText={setErrorText}
            resetError={registerReset}
          />
        );
      }
    } else if (loginError) {
      if ("status" in loginError) {
        const errMsg =
          "error" in loginError
            ? loginError.error
            : JSON.stringify(loginError.data).split(":")[1].slice(1, -2);
        return (
          <Alert
            text={errMsg}
            isError={true}
            setErrorText={setErrorText}
            resetError={loginReset}
          />
        );
      }
    }
  }

  if (errorText) {
    return (
      <Alert
        text={errorText}
        isError={true}
        setErrorText={setErrorText}
        resetError={reset}
      />
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
            {!contentPopup ? (
              <div className={classes.popup__title}>Вход в аккаунт</div>
            ) : (
              <div className={classes.popup__title}>Регистрация</div>
            )}

            <PopupForm
              onSubmit={handleSubmit(onSubmit)}
              contentPopup={contentPopup}
              disabled={isValid}
            >
              {contentPopup && (
                <PopupFormInput
                  name="fullName"
                  label="Имя и Фамилия"
                  register={register}
                  errors={errors}
                  type="text"
                  placeholder="Введите Имя и Фамилию..."
                />
              )}
              <PopupFormInput
                name="email"
                label="Email"
                register={register}
                errors={errors}
                type="email"
                placeholder="Введите Email..."
              />
              <PopupFormInput
                name="password"
                label="Пароль"
                register={register}
                errors={errors}
                type="password"
                placeholder="Введите пароль..."
              />
            </PopupForm>
            <div>
              {contentPopup ? (
                <span
                  onClick={handleContentPopup}
                  className={classes.popup__link}
                >
                  Войти:
                </span>
              ) : (
                <div
                  onClick={handleContentPopup}
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
