import React from "react";
import PropTypes from "prop-types";

import formStyles from "../../formStyles.module.scss";

function ErrorLine({ children }) {
  return <div className={formStyles.danger}>{children}</div>;
}

ErrorLine.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ErrorLine;
