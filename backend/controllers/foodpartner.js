const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const FoodPartner = require("../Model/foodPartner");
const {
  validateLoginPayload,
  validateRegisterPayload,
} = require("../utils/validators");

const authfoodPartnerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validationErrors = validateLoginPayload({ email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({ msg: validationErrors.join(", ") });
    }

    const foodPartner = await FoodPartner.findOne({ email });
    if (!foodPartner) {
      return res.status(404).json({ msg: "user not exist" });
    }

    const isMatch = await bcrypt.compare(password, foodPartner.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "password is incorrect" });
    }

    if (!process.env.FOODPARTNER_JWT_SECRET) {
      return res
        .status(500)
        .json({ msg: "Server misconfiguration: FOODPARTNER_JWT_SECRET not set" });
    }
    const token = jwt.sign({ id: foodPartner.id }, process.env.FOODPARTNER_JWT_SECRET);
    return res.json({ token, id: foodPartner.id });
  } catch (err) {
    return res.status(500).json({ msg: err.message || "Server error" });
  }
};

const authFoodPartnerRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const validationErrors = validateRegisterPayload({ name, email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({ msg: validationErrors.join(", ") });
    }

    const existingPartner = await FoodPartner.findOne({ email });
    if (existingPartner) {
      return res.status(409).json({ msg: "email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);
    const foodPartner = await FoodPartner.create({
      name,
      email,
      password: hash,
    });

    if (!process.env.FOODPARTNER_JWT_SECRET) {
      return res
        .status(500)
        .json({ msg: "Server misconfiguration: FOODPARTNER_JWT_SECRET not set" });
    }
    const token = jwt.sign({ id: foodPartner.id }, process.env.FOODPARTNER_JWT_SECRET);
    return res.json({ token, id: foodPartner.id });
  } catch (err) {
    return res.status(500).json({ msg: err.message || "Server error" });
  }
};

module.exports = { authfoodPartnerLogin, authFoodPartnerRegister };