import React, { FC } from "react";
import Button from "../Button";
import classes from "./CreatePostForm.module.scss";

interface CreatePostFormPropsTypes {
  children: any;
  className: string;
  onSubmit: () => void;
  disabled?: boolean;
}

const CreatePostForm: FC<CreatePostFormPropsTypes> = ({
  children,
  className,
  onSubmit,
  disabled,
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
      <div className={classes.create__postBtn}>
        <Button disabled={disabled} text="Опубликовать" />
        <Button disabled={disabled} text="Отменить" />
      </div>
    </form>
  );
};

export default CreatePostForm;
