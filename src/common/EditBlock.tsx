import React, { FC } from "react";
import classes from "./EditBlock.module.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface EditBlockPropsTypes {
  showEditPostBlock: boolean;
}

const EditBlock: FC<EditBlockPropsTypes> = ({ showEditPostBlock }) => {
  return (
    <div
      className={`${classes.editBlock} ${
        showEditPostBlock ? classes.show : ""
      }`}
    >
      <EditOutlined className={classes.editPostButton} />
      <DeleteOutlined className={classes.deletePostButton} />
    </div>
  );
};

export default EditBlock;
