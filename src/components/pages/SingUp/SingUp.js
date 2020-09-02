import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorLine } from "../../Error";
import { InputField, InputCheckbox, InputButton } from "../../Inputs";
import StatusRender from "../../StatusRender";
import * as asyncActions from "../../../redux/AsyncActions";
import * as syncActions from "../../../redux/SyncActions";
import formStyles from "../../../formStyles.module.scss";
import errorMessageBank from "../../../ErrorMessageBank";
import inputNames from "./inputNames";

function SingUp({
  userSetError,
  register: registerAccount,
  error: errorArray,
  loading,
}) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    errors,
  } = useForm();
  /* Cбросить ошибки, так как они хранятся в user.error, общем для Sing Up и Sign In */
  useEffect(() => userSetError(null), []);
  /* Проверить на наличие ошибок от сервера */
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
  /* Отслеживать вводимый пароль для сравнения с Password Repeat */
  const watchPassword = watch("password", "");
  const onSumbit = (data) =>
    registerAccount(data.email, data.username, data.password);
  return (
    <form
      method="post"
      className={formStyles["form-block"]}
      onSubmit={handleSubmit(onSumbit)}
    >
      <h2 className={formStyles["form-title"]}>Create new account</h2>
      <StatusRender
        errorBlock={[
          {
            condition: errorArray?.internet,
            block: <ErrorLine>{errorMessageBank.form.internet}</ErrorLine>,
          },
        ]}
        loadingBlock={{
          condition: loading,
        }}
        dataBlock={{
          condition: false,
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
        placeholder="Password"
        autocomplete="new-password"
        ref={register({
          required: true,
          minLength: 8,
          maxLength: 40,
        })}
        errors={errors}
      />
      <InputField
        name="repeatPassword"
        type="password"
        placeholder="Repeat Password"
        autocomplete="new-password"
        ref={register({
          required: true,
          validate: (repeatPassword) => repeatPassword === watchPassword,
        })}
        errors={errors}
      />
      <InputCheckbox
        name="agreed"
        type="checkbox"
        text="I agree to the processing of my personal information"
        ref={register({
          required: true,
        })}
        errors={errors}
      />
      <InputButton type="submit" text="Create" />
      <p className={formStyles["secondary-text"]}>
        Already have an account?{" "}
        <Link to="/sing-in" className={formStyles.link}>
          Sing in
        </Link>
      </p>
    </form>
  );
}

SingUp.propTypes = {
  userSetError: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  loading: PropTypes.bool,
  user: PropTypes.shape({
    email: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
  }),
};

SingUp.defaultProps = {
  error: {},
  user: null,
  loading: false,
};

const mapStateToProps = (state) => ({
  error: state.user.error,
  loading: state.user.error,
  user: state.user.data,
});

const mapDispatchToProps = {
  userSetError: syncActions.userSetError,
  register: asyncActions.register,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingUp);
