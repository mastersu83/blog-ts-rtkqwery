import React, { FC } from "react";
import classes from "./EditBlock.module.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface EditBlockPropsTypes {
  showEditPostBlock: boolean;
  handleRemove?: () => void;
  handleEdited: () => void;
  editPost: boolean;
}

const EditBlock: FC<EditBlockPropsTypes> = ({
  showEditPostBlock,
  handleRemove,
  handleEdited,
  editPost,
}) => {
  const navigate = useNavigate();
  const onEditPost = () => {
    handleEdited();
    editPost && navigate("/create-post");
  };

  return (
    <div
      className={`${classes.editBlock} ${
        showEditPostBlock ? classes.show : ""
      }`}
    >
      <EditOutlined onClick={onEditPost} className={classes.editPostButton} />
      <DeleteOutlined
        onClick={handleRemove}
        className={classes.deletePostButton}
      />
    </div>
  );
};

export default EditBlock;
