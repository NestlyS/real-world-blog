import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useForm } from "react-hook-form";
import CustomInput from "../../CustomInput";
import * as actions from "../../../redux/actions";
import formStyles from "../../../formStyles.module.scss";

function EditProfile({ update, token }) {
  const { register, handleSubmit, errors } = useForm();
  if (!token) {
    return <Redirect to="/" />;
  }
  const onSumbit = (data) =>
    update({
      token,
      email: data.email,
      username: data.username,
      password: data.password || null,
      image: data.image || null,
    });
  return (
    <form
      method="post"
      className={formStyles["form-block"]}
      onSubmit={handleSubmit(onSumbit)}
    >
      <h2 className={formStyles["form-title"]}>Edit Profile</h2>
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
        placeholder="New password"
        autocomplete="new-password"
        ref={register({
          minLength: 8,
          maxLength: 40,
        })}
        errors={errors}
      />
      <CustomInput
        name="image"
        type="url"
        placeholder="Avatar image (url)"
        ref={register({
          pattern: /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/,
        })}
        errors={errors}
      />
      <CustomInput type="submit" text="Save" />
    </form>
  );
}

EditProfile.propTypes = {
  update: PropTypes.func.isRequired,
  token: PropTypes.string,
};

EditProfile.defaultProps = {
  token: null,
};

const mapStateToProps = (state) => ({
  token: state?.user?.data?.token,
});

const mapDispatchToProps = (dispatch) => {
  const { update } = bindActionCreators(actions, dispatch);
  return {
    update,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
