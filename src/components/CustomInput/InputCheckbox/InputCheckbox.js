import React from "react";
import PropTypes from "prop-types";
import errorMessageBank from "../../../ErrorMessageBank";
import cl from "./InputCheckbox.module.scss";

const InputCheckbox = React.forwardRef(function InputCheckbox(
  { name, text, errors },
  ref
) {
  const errorMessagesByName = errorMessageBank[name];
  const errorType = errors[name]?.type;
  return (
    <div className={cl["custom-checkbox"]}>
      <input
        type="checkbox"
        name={name}
        id={cl.checkbox} // id через node-sass нужен только для связи с label
        className={cl.checkbox}
        ref={ref}
      />
      <label htmlFor={cl.checkbox} className={cl["checkbox-label-primary"]}>
        {text}
      </label>
      <div className={cl["error-message"]}>
        {errorMessagesByName[errorType]}
      </div>
    </div>
  );
});

InputCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  errors: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string,
    })
  ),
};

InputCheckbox.defaultProps = {
  text: "",
  errors: {},
};

export default InputCheckbox;
