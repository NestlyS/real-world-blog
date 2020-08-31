import React from "react";
import PropTypes from "prop-types";
import InputCheckbox from "./InputCheckbox";
import InputField from "./InputField";
import InputButton from "./InputButton";
import InputTextarea from "./InputTextarea";

const CustomInput = React.forwardRef(function CustomInput(
  {
    type,
    name,
    text,
    value,
    placeholder,
    errors,
    autocomplete,
    short,
    onChange,
  },
  ref
) {
  switch (type) {
    case "button":
    case "submit":
    case "reset":
      return <InputButton type={type} text={text} />;
    case "checkbox":
      return (
        <InputCheckbox
          name={name}
          text={text}
          errors={errors}
          ref={ref}
          onChange={onChange}
        />
      );
    case "textarea":
      return (
        <InputTextarea
          name={name}
          placeholder={placeholder}
          errors={errors}
          value={value}
          ref={ref}
          autocomplete={autocomplete}
          onChange={onChange}
        />
      );
    default:
      return (
        <InputField
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          autocomplete={autocomplete}
          errors={errors}
          ref={ref}
          short={short}
          onChange={onChange}
        />
      );
  }
});

CustomInput.propTypes = {
  short: PropTypes.bool,
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
  onChange: PropTypes.func,
  value: PropTypes.string,
};

CustomInput.defaultProps = {
  short: false,
  name: undefined,
  type: "text",
  text: "",
  autocomplete: "on",
  placeholder: "",
  errors: {},
  onChange: () => {},
  value: undefined,
};

export default CustomInput;
