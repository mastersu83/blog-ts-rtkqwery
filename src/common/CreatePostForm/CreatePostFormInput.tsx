import React, { FC } from "react";
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";
import { CreatePostFormValuesType } from "../../types/formValueType";

interface CreatePostFormInputPropsTypes {
  register: UseFormRegister<CreatePostFormValuesType>;
  errors: FieldErrorsImpl<DeepRequired<CreatePostFormValuesType>>;
  type: string;
  label?: string;
  placeholder?: string;
  className: any;
  name: "title" | "text" | "description" | "photoUrl";
}

const CreatePostFormInput: FC<CreatePostFormInputPropsTypes> = ({
  type,
  label,
  placeholder,
  className,
  name,
  errors,
  register,
}) => {
  return (
    <>
      <div>{label}</div>
      <input
        {...register(name, {
          required: `Поле ${name} обязательно к заполнению`,
          minLength: {
            value: 5,
            message: "Минимум 5 символов",
          },
        })}
        type={type}
        placeholder={placeholder}
        className={className}
      />
      <div style={{ height: 40 }}>
        {errors?.[name] && <p>{errors?.[name]?.message || "Error"}</p>}
      </div>
    </>
  );
};

export default CreatePostFormInput;
