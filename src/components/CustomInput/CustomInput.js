import React from "react";
import PropTypes from "prop-types";
import InputCheckbox from "./InputCheckbox";
import InputField from "./InputField";
import InputButton from "./InputButton/InputButton";

const CustomInput = React.forwardRef(function CustomInput(
  { type, name, text, placeholder, errors, autocomplete },
  ref
) {
  switch (type) {
    case "button":
    case "submit":
    case "reset":
      return <InputButton type={type} text={text} />;
    case "checkbox":
      return (
        <InputCheckbox name={name} text={text} errors={errors} ref={ref} />
      );
    default:
      return (
        <InputField
          name={name}
          type={type}
          placeholder={placeholder}
          autocomplete={autocomplete}
          errors={errors}
          ref={ref}
        />
      );
  }
});

CustomInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  autocomplete: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string,
    })
  ),
};

CustomInput.defaultProps = {
  name: undefined,
  type: "text",
  text: "",
  autocomplete: "on",
  placeholder: "",
  errors: {},
};

export default CustomInput;
