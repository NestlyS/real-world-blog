import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import CustomSpin from "../../CustonSpin";
import { InputField, InputButton } from "../../Inputs";
import * as syncActions from "../../../redux/SyncActions";
import * as asyncActions from "../../../redux/AsyncActions";
import formStyles from "../../../formStyles.module.scss";
import errorMessageBank from "../../../models/ErrorMessageBank";
import StatusRender from "../../StatusRender";

const SingIn = ({ login, userSetError, error: errorArray, loading }) => {
  useEffect(() => userSetError(null), []);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => !loading && login(data.email, data.password);
  return (
    <form
      method="post"
      action="/"
      className={formStyles["form-block"]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={formStyles["form-title"]}>Sing In</h2>
      <StatusRender
        errorBlock={[
          {
            condition: errorArray && errorArray["email or password"],
            block: (
              <div className={formStyles.danger}>
                {errorMessageBank.form.invalid}
              </div>
            ),
          },
          {
            condition: errorArray?.internet,
            block: (
              <div className={formStyles.danger}>
                {errorMessageBank.form.internet}
              </div>
            ),
          },
        ]}
        loadingBlock={{
          condition: loading,
          block: <CustomSpin />,
        }}
        dataBlock={{
          condition: false,
        }}
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
        /* Вырубаем инпут, если загрузка */
        disabled={loading}
      />
      <InputField
        name="password"
        type="password"
        placeholder="Password"
        autocomplete="current-password"
        ref={register({
          required: true,
        })}
        disabled={loading}
        errors={errors}
      />
      <InputButton type="submit" text="Login" />
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
  userSetError: PropTypes.func.isRequired,
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
  login: asyncActions.login,
  userSetError: syncActions.userSetError,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingIn);
