export const isValidEmail = (email) => {
  return typeof email === "string" && /\S+@\S+\.\S+/.test(email);
};

export const isValidPassword = (password) => {
  return typeof password === "string" && password.length >= 6;
};

export const isNonEmptyString = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

export const getRegisterErrors = ({ name, email, password }) => {
  const errors = {};

  if (!isNonEmptyString(name)) {
    errors.name = "Name is required";
  }

  if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!isValidPassword(password)) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const getLoginErrors = ({ email, password }) => {
  const errors = {};

  if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!isNonEmptyString(password)) {
    errors.password = "Password is required";
  }

  return errors;
};
