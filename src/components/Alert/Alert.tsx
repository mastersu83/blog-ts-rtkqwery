import React from "react";
import classes from "./Alert.module.scss";

const Alert = () => {
  return (
    <div className={`${classes.alert}`}>
      <span>{"errorText"}</span>
    </div>
  );
};

export default Alert;
