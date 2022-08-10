import React, { FC } from "react";
import classes from "./Button.module.scss";

interface ButtonPropsTypes {
  text: string;
  onLogin?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonPropsTypes> = ({ text, onLogin, disabled }) => {
  console.log(disabled);
  return (
    <button
      disabled={!disabled}
      onClick={onLogin}
      className={`${classes.yellow__button} ${
        !disabled ? classes.disabled : ""
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
