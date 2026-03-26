const Food = require("../Model/foodModel");
const LikeModel = require("../Model/LikeModel");
const SaveModel = require("../Model/SaveModel");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

const FoodPartnerProfile=async (req, res, next) => {
  res.status(200).json(req.user);
}

const foodController = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Allow both "description" and legacy "discription", and tolerate leading spaces in keys/values
    const rawName = name || req.body[" name"];
    const rawDescription = description;

    const finalName =
      typeof rawName === "string" ? rawName.trim() : rawName;
    const finalDescription =
      typeof rawDescription === "string" ? rawDescription.trim() : rawDescription;

    if (!finalName || !finalDescription) {
      return res.status(400).json({ msg: "invalid name or description" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "video is required" });
    }

    if (!req.foodPartner?.id) {
      return res.status(401).json({ msg: "unauthorized" });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );

    const foodItem = await Food.create({
      name: finalName,
      description: finalDescription,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner.id,
    });

    return res.status(201).json({
      message: "food created successfully",
      food: foodItem
  })
  } catch (err) {
    return res.status(500).json({ msg: err.message || "Server error" });
  }
};

const foodrequest = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ status: 401, msg: "auth is required" });
    }

    const foodItems = await Food.find({});

    const liked = await LikeModel.find({ user: req.user.id }).select("food");
    const saved = await SaveModel.find({ user: req.user.id }).select("food");

    const likedSet = new Set(liked.map((item) => item.food.toString()));
    const savedSet = new Set(saved.map((item) => item.food.toString()));

    const enriched = foodItems.map((item) => ({
      ...item.toObject(),
      isLiked: likedSet.has(item._id.toString()),
      isSaved: savedSet.has(item._id.toString()),
    }));

    return res.status(200).json({
      status: 200,
      message: "Food items fetched successfully",
      foodItem: enriched,
    });
  } catch (err) {
    return res.status(500).json({ status: 500, msg: err.message || "Server error" });
  }
};

module.exports = {
  foodController,
  foodrequest,
  FoodPartnerProfile,
};