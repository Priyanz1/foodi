const SaveModel = require("../Model/SaveModel");

const SaveController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ status: 401, msg: "auth is required" });
    }

    const { food } = req.body;

    if (!food) {
      return res.status(400).json({ status: 400, msg: "food id is required" });
    }

    const isSaved = await SaveModel.findOne({
      food,
      user: req.user.id,
    });

    if (isSaved) {
      await SaveModel.deleteOne({
        user: req.user.id,
        food,
      });

      return res.status(200).json({
        status: 200,
        msg: "reel unsaved",
        isSaved: false,
      });
    }

    await SaveModel.create({
      food,
      user: req.user.id,
    });

    return res.status(200).json({
      status: 200,
      msg: "reel saved",
      isSaved: true,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      msg: err.message || "server error",
    });
  }
};

module.exports = SaveController;
