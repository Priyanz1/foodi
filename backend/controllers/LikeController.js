const foodModel = require("../Model/foodModel");
const LikeModel = require("../Model/LikeModel");

const LikeController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "auth is required" });
    }

    const { food } = req.body;

    if (!food) {
      return res.status(400).json({ msg: "liked video not get" });
    }

    const isLiked = await LikeModel.findOne({
      food,
      user: req.user.id,
    });

    if (isLiked) {
      await LikeModel.deleteOne({
        user: req.user.id,
        food: food,
      });

      const updatedFood = await foodModel.findByIdAndUpdate(
        food,
        {
          $inc: { count: -1 },
        },
        { new: true }
      );

      return res.status(200).json({
        status: 200,
        msg: "video unliked",
        count: updatedFood.count,
        isLiked: false,
      });
    }

    await LikeModel.create({
      food,
      user: req.user.id,
    });

    const updatedFood = await foodModel.findByIdAndUpdate(
      food,
      {
        $inc: { count: 1 },
      },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      msg: "video liked",
      count: updatedFood.count,
      isLiked: true,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "server error",
    });
  }
};

module.exports = LikeController;