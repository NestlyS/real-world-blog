import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { InputField, InputButton } from "../../Inputs";
import formStyles from "../../../formStyles.module.scss";
import StatusRender from "../../StatusRender";
import errorMessageBank from "../../../models/ErrorMessageBank";
import { ErrorLine } from "../../Error";
import inputNames from "./inputNames";

function EditProfileCard({ update, loading, error: errorArray }) {
  const [submitted, setSubmit] = useState(false);
  const { register, clearErrors, setError, handleSubmit, errors } = useForm();
  useMemo(() => {
    clearErrors();
    if (errorArray === null) {
      return;
    }
    Object.keys(errorArray)
      /* Если ошибка - не один из типов инпутов - фильтруем её. Например, ошибка сервера. */
      .filter((errorType) =>
        Object.prototype.hasOwnProperty.call(inputNames, errorType)
      )
      /* Все инпуты вбиваем в хук useForm через setError */
      .forEach((inputWithError) =>
        setError(inputWithError, { type: "exists" })
      );
  }, [errorArray, setError, clearErrors]);
  const onSumbit = async (data) => {
    await update(
      data.email,
      data.username,
      data.password || null,
      data.image || null
    );
    if (errorArray === null) {
      setSubmit(true);
    }
  };
  return (
    <form
      method="post"
      className={formStyles["form-block"]}
      onSubmit={handleSubmit(onSumbit)}
    >
      <h2 className={formStyles["form-title"]}>Edit Profile</h2>
      <StatusRender
        errorBlock={[
          {
            condition: errorArray?.internet,
            block: <ErrorLine>{errorMessageBank.form.internet}</ErrorLine>,
          },
          {
            condition: errorArray,
            block: null,
          },
        ]}
        loadingBlock={{
          condition: loading,
        }}
        dataBlock={{
          condition: submitted,
          block: (
            <div className={formStyles.success}>
              Changes has been successfully saved!
            </div>
          ),
        }}
      />
      <InputField
        name="username"
        placeholder="Username"
        ref={register({
          required: true,
          minLength: 3,
          maxLength: 20,
        })}
        errors={errors}
      />
      <InputField
        name="email"
        type="email"
        placeholder="Email address"
        ref={register({
          required: true,
          pattern: /^(\w)*[@](\w)*\.(\w){2,}$/,
        })}
        errors={errors}
      />
      <InputField
        name="password"
        type="password"
        placeholder="New password"
        autocomplete="new-password"
        ref={register({
          minLength: 8,
          maxLength: 40,
        })}
        errors={errors}
      />
      <InputField
        name="image"
        type="url"
        placeholder="Avatar image (url)"
        ref={register({
          pattern: /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/,
        })}
        errors={errors}
      />
      <InputButton type="submit" text="Save" />
    </form>
  );
}

EditProfileCard.propTypes = {
  update: PropTypes.func.isRequired,
  error: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  loading: PropTypes.bool,
};

EditProfileCard.defaultProps = {
  error: null,
  loading: false,
};

export default EditProfileCard;
