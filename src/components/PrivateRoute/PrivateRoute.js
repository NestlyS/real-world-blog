import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

function PrivateRoute({ isLogged, defaultPath, children }) {
  if (!isLogged) {
    return <Redirect to={defaultPath} />;
  }

  return children;
}

PrivateRoute.propTypes = {
  isLogged: PropTypes.bool,
  children: PropTypes.node.isRequired,
  defaultPath: PropTypes.string,
};

PrivateRoute.defaultProps = {
  defaultPath: "/",
  isLogged: false,
};

export default PrivateRoute;
