import React, { useEffect } from "react";
import classes from "./CreatePost.module.scss";
import Button from "../../common/Button";
import { useForm } from "react-hook-form";
import { CreatePostFormValuesType } from "../../types/formValueType";
import {
  useCreatePostMutation,
  useEditPostMutation,
  useUploadFileMutation,
} from "../../redux/api/postsApi";
import { useAppDispatch, useAppSelector } from "../../hooks/appHooks";
import { removeEditPost } from "../../redux/slices/postsSlice";

const CreatePost = () => {
  const dispatch = useAppDispatch();

  const { post: editedPost } = useAppSelector((state) => state.post);

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

  const [uploadFile] = useUploadFileMutation();

  const onSubmit = async (data: CreatePostFormValuesType) => {
    const { photoUrl, title, text, description } = data;
    if (!editedPost?._id) {
      let testUrl: any = await uploadFile(photoUrl);
      createPost({ title, text, description, photoUrl: testUrl.data.url });
    } else {
      let testUrl: any = await uploadFile(photoUrl);
      const data = { title, text, description, photoUrl: testUrl.data.url };
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
    if (editedPost) {
      setValue("title", editedPost.title);
      setValue("text", editedPost.text);
      setValue("description", editedPost.description);
    }
  }, [editedPost]);

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
        <div style={{ height: 40, color: "red" }}>
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
        <div style={{ height: 40, color: "red" }}>
          {errors?.description && (
            <p>{errors?.description?.message || "Error"}</p>
          )}
        </div>
        <div className={classes.create__linkTitle}>Ссылка на изображение:</div>
        <input
          {...register("photoUrl", {
            required: `Поле  обязательно к заполнению`,
          })}
          className={classes.create__linkInput}
          type="file"
        />
        <div style={{ height: 40, color: "red" }}>
          {errors?.photoUrl && <p>{errors?.photoUrl?.message || "Error"}</p>}
        </div>
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
        <div style={{ height: 40, color: "red" }}>
          {errors?.text && <p>{errors?.text?.message || "Error"}</p>}
        </div>
        <div className={classes.create__btn}>
          {editedPost?._id ? (
            <Button
              name="Create"
              disabled={(editedPost?._id && true) || isValid}
              text="Сохранить"
            />
          ) : (
            <Button
              name="Create"
              disabled={(editedPost?._id && true) || isValid}
              text="Опубликовать"
            />
          )}

          <Button
            name="Cancel"
            disabled={(editedPost?._id && true) || isValid}
            text="Отменить"
            cancel={cancel}
          />
        </div>
      </form>
    </>
  );
};

export default CreatePost;
