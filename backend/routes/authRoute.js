const express=require("express");
const { authLoginController, authRegisterController, UserProfile } = require("../controllers/authControllers");
const userAuthMiddle = require("../middleware/userAuthMiddle");

const router=express.Router();

router.post("/login",authLoginController);
router.post("/register",authRegisterController);
router.get("/profile",userAuthMiddle,UserProfile);

module.exports = router;