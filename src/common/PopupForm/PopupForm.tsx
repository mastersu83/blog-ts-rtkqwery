import React, { FC } from "react";
import Button from "../Button";
import classes from "./FormInput.module.scss";
// import classes from "./PopupForm.module.scss";

interface FormPropsTypes {
  children: any;
  onSubmit: () => void;
  contentPopup: boolean;
  disabled?: boolean;
}

const PopupForm: FC<FormPropsTypes> = ({
  children,
  onSubmit,
  contentPopup,
  disabled,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <div className={classes.popup__btn}>
        <Button
          disabled={disabled}
          text={!contentPopup ? "Войти" : "Зарегистрироваться"}
        />
      </div>
    </form>
  );
};

export default PopupForm;
