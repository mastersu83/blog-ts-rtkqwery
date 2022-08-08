import React, { FC } from "react";
import classes from "./Button.module.scss";

interface ButtonPropsTypes {
  text: string;
}

const Button: FC<ButtonPropsTypes> = ({ text }) => {
  return <button className={classes.yellow__button}>{text}</button>;
};

export default Button;
