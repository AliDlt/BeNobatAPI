const mongoose = require("mongoose");
const Business = require("../Models/businessModel");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Create a default Business document if none exists
    await createDefaultBusiness();

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// Function to create a default Business document
const createDefaultBusiness = async () => {
  try {
    // Check if a default Business document already exists
    const existingBusiness = await Business.findOne({
      businessName: "Default Business Name",
    });

    // If not, create a default Business document
    if (!existingBusiness) {
      await Business.create({});

      console.log("Default Business Document Created");
    }
  } catch (error) {
    console.error("Error creating default Business document:", error);
  }
};

module.exports = { connectDB };
