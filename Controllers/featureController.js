const UserBase = require("../Models/userBaseModel");
const flagsConfig = require("../Config/flagsConfig");

const getFeatureFlags = async (req, res) => {
  try {
    const { userId, featureFlags } = req.body;

    // Validate userId and featureFlags input

    const user = await UserBase.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update featureFlags for the user
    user.featureFlags = featureFlags;
    await user.save();

    res.status(200).json({ message: "Feature flags updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateFeatureFlags = async (req, res) => {
  try {
    const { userId, featureFlags } = req.body;

    // Validate userId and featureFlags input

    const user = await UserBase.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update featureFlags for the user
    user.featureFlags = featureFlags;
    await user.save();

    res.status(200).json({ message: "Feature flags updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { updateFeatureFlags, getFeatureFlags };
