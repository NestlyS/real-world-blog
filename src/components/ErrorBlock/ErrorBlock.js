import React from "react";
import PropTypes from "prop-types";
import cl from "./ErrorBlock.module.scss";

export default function ErrorBlock({ children }) {
  return <div className={cl.error}>{children}</div>;
}

ErrorBlock.propTypes = {
  children: PropTypes.node.isRequired,
};
