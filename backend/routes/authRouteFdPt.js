const express=require("express");
const { authfoodPartnerLogin, authFoodPartnerRegister } = require("../controllers/foodpartner");
const { FoodPartnerProfile } = require("../controllers/foodController");
const foodPartnerAuth = require("../middleware/foodPartnerAuth");
const router=express.Router();

router.post("/login", authfoodPartnerLogin);
router.post("/register",authFoodPartnerRegister);
router.get("/profile",foodPartnerAuth,FoodPartnerProfile);

module.exports = router;