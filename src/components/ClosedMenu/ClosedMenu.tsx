import React, { FC } from "react";
import classes from "./ClosedMenu.module.scss";

type PropsType = {
  handleMenu: () => void;
  openMenu: boolean;
};

const ClosedMenu: FC<PropsType> = ({ handleMenu }) => {
  return (
    <div onClick={handleMenu} className={classes.close__menu}>
      <span>МЕНЮ</span>
    </div>
  );
};

export default ClosedMenu;
