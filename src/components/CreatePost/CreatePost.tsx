import React, { useEffect } from "react";
import classes from "./CreatePost.module.scss";
import Button from "../../common/Button";
import { useForm } from "react-hook-form";
import { CreatePostFormValuesType } from "../../types/formValueType";
import {
  useCreatePostMutation,
  useEditPostMutation,
} from "../../redux/api/postsApi";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { removeEditPost } from "../../redux/slices/postsSlice";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const { post: editedPost, isEdit } = useAppSelector((state) => state.post);

  const [createPost] = useCreatePostMutation();
  const [editPost] = useEditPostMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<CreatePostFormValuesType>({
    mode: "all",
  });

  const onSubmit = (data: CreatePostFormValuesType) => {
    const { file, title, text, description } = data;
    if (!isEdit) {
      createPost({ title, text, description, file });
    } else {
      editPost({ data, postId: editedPost._id });
    }
    reset();
    dispatch(removeEditPost());
  };

  const cancel = () => {
    reset();
    dispatch(removeEditPost());
  };

  useEffect(() => {
    if (isEdit) {
      setValue("title", editedPost.title);
      setValue("text", editedPost.text);
      setValue("description", editedPost.description);
    }
  }, [isEdit, editedPost]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.create__post}>
        <input
          {...register("title", {
            required: `Поле обязательно к заполнению`,
            minLength: {
              value: 5,
              message: "Минимум 5 символов",
            },
          })}
          className={classes.create__titleInput}
          placeholder="Введите заголовок..."
        />
        <div style={{ height: 40 }}>
          {errors?.title && <p>{errors?.title?.message || "Error"}</p>}
        </div>
        <div className={classes.create__shortDesc}>Короткое описание:</div>
        <input
          {...register("description", {
            required: `Поле обязательно к заполнению`,
            minLength: {
              value: 5,
              message: "Минимум 5 символов",
            },
          })}
          className={classes.create__shortInput}
        />
        <div style={{ height: 40 }}>
          {errors?.description && (
            <p>{errors?.description?.message || "Error"}</p>
          )}
        </div>
        <div className={classes.create__linkTitle}>Ссылка на изображение:</div>
        <input
          {...register("file")}
          className={classes.create__linkInput}
          type="file"
        />
        <div className={classes.create__longDesc}>Полное описание:</div>
        <textarea
          {...register("text", {
            required: `Поле  обязательно к заполнению`,
            minLength: {
              value: 5,
              message: "Минимум 5 символов",
            },
          })}
          className={classes.create__longInput}
        />
        <div style={{ height: 40 }}>
          {errors?.text && <p>{errors?.text?.message || "Error"}</p>}
        </div>
        <div className={classes.create__btn}>
          {isEdit ? (
            <Button
              name="Create"
              disabled={isEdit || isValid}
              text="Сохранить"
            />
          ) : (
            <Button
              name="Create"
              disabled={isEdit || isValid}
              text="Опубликовать"
            />
          )}

          <Button
            name="Cancel"
            disabled={isEdit || isValid}
            text="Отменить"
            cancel={cancel}
          />
        </div>
      </form>
    </>
  );
};

export default CreatePost;
