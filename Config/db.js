const mongoose = require("mongoose");
const Business = require("../Models/businessModel");
const Admin = require("../Models/adminModel");

const { hashPassword } = require("../Utils/hashPassword");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Create a default
    await createDefaultBusiness();
    await createDefaultAdmin();

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Error creating default Business document:", err);
    process.exit(1);
  }
};

// Function to create a default Business document
const createDefaultBusiness = async () => {
  try {
    // Check if a default Business document already exists
    const existingBusiness = await Business.findOne({
      businessName: "نام مرکز شما",
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

const createDefaultAdmin = async () => {
  try {
    // Check if a default Admin document already exists
    const existingAdmin = await Admin.findOne({ username: "admin" });

    // If not, create a default Business document
    if (!existingAdmin) {
      const hashedPassword = await hashPassword("1234_admin");

      await Admin.create({
        username: "admin",
        active: true,
        password: hashedPassword,
      });

      console.log("Default Admin Document Created");
    }
  } catch (error) {
    console.error("Error creating default Admin document:", error);
  }
};

module.exports = { connectDB };
