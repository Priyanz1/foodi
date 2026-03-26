const emailRegex = /\S+@\S+\.\S+/;

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(email) {
  return typeof email === "string" && emailRegex.test(email);
}

function isValidPassword(password) {
  return typeof password === "string" && password.length >= 6;
}

function validateRegisterPayload({ name, email, password }) {
  const errors = [];

  if (!isNonEmptyString(name)) {
    errors.push("name is required");
  }

  if (!isValidEmail(email)) {
    errors.push("valid email is required");
  }

  if (!isValidPassword(password)) {
    errors.push("password must be at least 6 characters");
  }

  return errors;
}

function validateLoginPayload({ email, password }) {
  const errors = [];

  if (!isValidEmail(email)) {
    errors.push("valid email is required");
  }

  if (!isNonEmptyString(password)) {
    errors.push("password is required");
  }

  return errors;
}

module.exports = {
  isNonEmptyString,
  isValidEmail,
  isValidPassword,
  validateRegisterPayload,
  validateLoginPayload,
};
