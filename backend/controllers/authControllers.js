const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/userSchema");
const {
  validateLoginPayload,
  validateRegisterPayload,
} = require("../utils/validators");

const UserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

const authLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validationErrors = validateLoginPayload({ email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({ msg: validationErrors.join(", ") });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "user not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "password is incorrect" });
    }

    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ msg: "Server misconfiguration: JWT_SECRET not set" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.json({ token, id: user.id });
  } catch (err) {
    return res.status(500).json({ msg: err.message || "Server error" });
  }
};

const authRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const validationErrors = validateRegisterPayload({ name, email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({ msg: validationErrors.join(", ") });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });

    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ msg: "Server misconfiguration: JWT_SECRET not set" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.json({ token, id: user.id });
  } catch (err) {
    return res.status(500).json({ msg: err.message || "Server error" });
  }
};

module.exports = { authLoginController, authRegisterController,UserProfile };