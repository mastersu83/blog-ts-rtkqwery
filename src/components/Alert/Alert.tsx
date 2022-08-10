import React from "react";
import classes from "./Alert.module.scss";

const Alert = ({
  text = "",
  isError,
  setErrorText,
}: {
  text: string;
  isError: boolean;
  setErrorText: (e: string) => void;
}) => {
  const [needLogin, setNeedLogin] = React.useState(false);

  React.useEffect(() => {
    if (isError) {
      setNeedLogin(true);
      setTimeout(() => {
        setErrorText("");
        setNeedLogin(false);
      }, 2000);
    }
  }, [isError]);
  return (
    <div className={`${classes.alert} ${needLogin ? classes.alert__open : ""}`}>
      <span>{text}</span>
    </div>
  );
};

export default Alert;
