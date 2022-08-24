import React, { FC } from "react";
import classes from "./FormInput.module.scss";
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";
import { PopupFormValuesType } from "../../types/formValueType";

interface FormInputPropsTypes {
  register: UseFormRegister<PopupFormValuesType>;
  errors: FieldErrorsImpl<DeepRequired<PopupFormValuesType>>;
  type: string;
  placeholder: string;
  label: string;
  name: "email" | "password" | "fullName";
}

const PopupFormInput: FC<FormInputPropsTypes> = ({
  type,
  register,
  placeholder,
  errors,
  label,
  name,
}) => {
  return (
    <>
      <label>{label}</label>
      <input
        {...register(name, {
          required: `Поле ${name} обязательно к заполнению`,
          minLength: {
            value: 5,
            message: "Минимум 5 символов",
          },
        })}
        className={classes.popup__input}
        type={type}
        placeholder={placeholder}
      />
      <div style={{ height: 40 }}>
        {errors?.[name] && <p>{errors?.[name]?.message || "Error"}</p>}
      </div>
    </>
  );
};

export default PopupFormInput;
