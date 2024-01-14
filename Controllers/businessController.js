const Business = require("../Models/businessSchema");

exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createBusiness = async (req, res) => {
  try {
    const newBusiness = new Business(req.body);
    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};

exports.updateBusiness = async (req, res) => {
  try {
    const newBusiness = req.body;
    await Business.updateOne(newBusiness);
    res.status(200).json(newBusiness);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};
