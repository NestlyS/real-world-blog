import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import CustomSpin from "../../CustonSpin";
import CustomInput from "../../CustomInput";
import * as actions from "../../../redux/actions";
import formStyles from "../../../formStyles.module.scss";
import errorMessageBank from "../../CustomInput/ErrorMessageBank";

import cl from "./SingIn.module.scss";

const SingIn = ({ login, unsetError, error: errorArray, loading, user }) => {
  useEffect(unsetError, []);
  const { register, handleSubmit, errors } = useForm();

  if (user) {
    return <Redirect to="/" />;
  }

  const renderStatus = () => {
    if (errorArray && errorArray["email or password"] !== null) {
      return <div className={cl.error}>{errorMessageBank.form.invalid}</div>;
    }
    if (loading) {
      return <CustomSpin />;
    }
    return null;
  };
  const onSubmit = (data) => login(data.email, data.password);
  return (
    <form
      method="post"
      action="/"
      className={formStyles["form-block"]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={formStyles["form-title"]}>Sing In</h2>
      {renderStatus()}
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
        autocomplete="current-password"
        ref={register({
          required: true,
        })}
        errors={errors}
      />
      <CustomInput type="submit" text="Login" />
      <p className={formStyles["secondary-text"]}>
        Don&apos;t have an account?{" "}
        <Link to="/sing-up" className={formStyles.link}>
          Sing Up
        </Link>
      </p>
    </form>
  );
};

SingIn.propTypes = {
  login: PropTypes.func.isRequired,
  unsetError: PropTypes.func.isRequired,
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

SingIn.defaultProps = {
  error: {},
  loading: false,
  user: null,
};

const mapStateToProps = (state) => ({
  error: state.user.error,
  loading: state.user.loading,
  user: state.user.data,
});

const mapDispatchToProps = {
  login: actions.login,
  unsetError: actions.unsetError,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingIn);
