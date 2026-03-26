const jwt = require("jsonwebtoken");

const foodPartnerAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.FOODPARTNER_JWT_SECRET);

    req.foodPartner = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = foodPartnerAuth;