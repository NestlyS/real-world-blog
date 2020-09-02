/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import avatar from "../../assets/avatar.svg";
import cl from "./Header.module.scss";
import * as actions from "../../redux/SyncActions";

const Header = ({ user, logout, history }) => {
  const onLogout = () => {
    logout();
    history.push("/");
  };
  const renderRightPart = () => {
    if (user.token) {
      return (
        <div className={cl["control-panel"]}>
          <Link
            to="/new-article"
            className={`${cl.button} ${cl["success-button"]} ${cl["small-button"]}`}
          >
            Create article
          </Link>
          <Link to="/profile" className={cl.profile}>
            <span className={cl.username}>{user.username}</span>
            <img
              className={cl.avatar}
              src={user.image !== null ? user.image : avatar}
              alt={`Avatar by ${cl.username}`}
            />
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className={`${cl.button} ${cl["gray-button"]}`}
          >
            Log Out
          </button>
        </div>
      );
    }
    return (
      <div className={cl["control-panel"]}>
        <Link to="/sing-in" className={cl.button}>
          Sign In
        </Link>
        <Link to="/sing-up" className={`${cl.button} ${cl["success-button"]}`}>
          Sing Up
        </Link>
      </div>
    );
  };
  return (
    <div className={cl["header-body"]}>
      <Link to="/" className={cl.title}>
        Realworld Blog
      </Link>
      {renderRightPart()}
    </div>
  );
};

Header.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string])
  ),
  user: PropTypes.shape({
    email: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
  }),
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  loading: false,
  error: null,
  user: null,
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  error: state.user.error,
  user: state.user.data,
});

const mapDispatchToProps = {
  logout: actions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
