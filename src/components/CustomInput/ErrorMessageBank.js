const errorMessageBank = {
  form: {
    invalid: "Password or email is invalid. \n Please, check it and try again.",
  },
  username: {
    required: "Username is required",
    minLength: "Your username needs to be at least 3 characters.",
    maxLength: "Your username needs to be 20 characters maximum.",
    exists: "That username is already taken.",
  },
  email: {
    required: "Email is required",
    pattern: "Please, input valid email.",
    exists: "That email is already taken.",
  },
  password: {
    required: "Password is required.",
    minLength: "Your password needs to be at least 8 characters.",
    maxLength: "Your password needs to be 40 characters maximum.",
  },
  repeatPassword: {
    required: "Please, repeat password.",
    validate: "Passwords must match.",
  },
  agreed: {
    required: "Please, agree with terms.",
  },
  image: {
    pattern: "Please, input valid url.",
  },
};

export default errorMessageBank;
