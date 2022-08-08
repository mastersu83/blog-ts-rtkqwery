import React, { FC } from "react";
import classes from "./ItemsList.module.scss";

interface ItemsListPropsTypes {
  children: React.ReactNode;
}

const ItemsList: FC<ItemsListPropsTypes> = ({ children }) => {
  return <div className={classes.itemsList}>{children}</div>;
};

export default ItemsList;
