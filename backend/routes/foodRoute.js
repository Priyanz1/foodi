const express=require("express");
const router=express.Router();
const foodPartnerAuth=require("../middleware/foodPartnerAuth");
const {foodController,foodrequest} = require("../controllers/foodController");
const userAuthMiddle = require("../middleware/userAuthMiddle"); 
const multer=require("multer");
const LikeController = require("../controllers/LikeController");
const SaveController = require("../controllers/SaveController");
const GetSaveController = require("../controllers/GetSaveController");
const upload=multer({
   storage:multer.memoryStorage(),
});

router.post("/createfood",foodPartnerAuth,upload.single("video"),foodController);
router.get("/food",userAuthMiddle,foodrequest);
router.post("/like",userAuthMiddle,LikeController);
router.post("/save",userAuthMiddle,SaveController);
router.get("/getsave",userAuthMiddle,GetSaveController);


module.exports = router;