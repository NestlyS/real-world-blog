import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

function PrivateRoute({ token, defaultPath, children }) {
  if (!token) {
    return <Redirect to={defaultPath} />;
  }

  return children;
}

PrivateRoute.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.node.isRequired,
  defaultPath: PropTypes.string,
};

PrivateRoute.defaultProps = {
  defaultPath: "/",
  token: null,
};

export default PrivateRoute;
