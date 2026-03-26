const SaveModel = require("../Model/SaveModel");

const GetSaveController = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        msg: "Unauthorized user",
      });
    }

    const saved = await SaveModel.find({ user: userId }).populate("food");
    const enriched = saved.map((item) => ({
      ...item.toObject(),
    }));
    return res.status(200).json(saved);
  } catch (error) {
    return res.status(500).json({
      msg: error.message || "Server error while getting saved reels",
    });
  }
};

module.exports = GetSaveController;