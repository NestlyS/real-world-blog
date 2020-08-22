import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import CustomInput from "../../CustomInput";
import * as actions from "../../../redux/actions";
import formStyles from "../../../formStyles.module.scss";

function SingUp({
  unsetError,
  register: registerAccount,
  error: errorArray,
  user,
}) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    errors,
  } = useForm();
  useEffect(unsetError, []);
  useMemo(() => {
    clearErrors();
    if (errorArray !== null) {
      Object.keys(errorArray).map((inputWithError) =>
        setError(inputWithError, { type: "exists" })
      );
    }
  }, [errorArray, setError]);

  if (user) {
    return <Redirect to="/" />;
  }

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
      <CustomInput
        name="username"
        placeholder="Username"
        ref={register({
          required: true,
          minLength: 3,
          maxLength: 20,
        })}
        errors={errors}
      />
      <CustomInput
        name="email"
        type="email"
        placeholder="Email address"
        ref={register({
          required: true,
          pattern: /^(\w)*[@](\w)*\.(\w){2,}$/,
        })}
        errors={errors}
      />
      <CustomInput
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
      <CustomInput
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
      <CustomInput
        name="agreed"
        type="checkbox"
        text="I agree to the processing of my personal information"
        ref={register({
          required: true,
        })}
        errors={errors}
      />
      <CustomInput type="submit" text="Create" />
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
  unsetError: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
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
};

const mapStateToProps = (state) => ({
  error: state.user.error,
  user: state.user.data,
});

const mapDispatchToProps = {
  unsetError: actions.unsetError,
  register: actions.register,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingUp);
