import React, { FC } from "react";
import classes from "./Button.module.scss";

interface ButtonPropsTypes {
  text: string;
  disabled?: boolean;
  name?: string;
  cancel?: () => void;
}

const Button: FC<ButtonPropsTypes> = ({ text, disabled, name, cancel }) => {
  return (
    <>
      {name !== "Cancel" ? (
        <button
          disabled={!disabled}
          className={`${classes.yellow__button} ${
            !disabled ? classes.disabled : ""
          }`}
        >
          {text}
        </button>
      ) : (
        <div onClick={cancel} className={`${classes.yellow__button} `}>
          {text}
        </div>
      )}
    </>
  );
};

export default Button;
