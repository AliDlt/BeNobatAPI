const mongoose = require("mongoose");
const Business = require("../Models/businessModel");
const Admin = require("../Models/adminModel");
const { hashPassword } = require("../Utils/hashPassword");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    await createDefaultBusiness();
    await createDefaultAdmin();

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const createDefaultBusiness = async () => {
  try {
    const businessName = "نام مرکز شما";
    const existingBusiness = await Business.findOne({ businessName });

    if (!existingBusiness) {
      await Business.create({ businessName });
      console.log("Default Business Document Created");
    }
  } catch (error) {
    console.error("Error creating default Business document:", error);
  }
};

const createDefaultAdmin = async () => {
  try {
    const username = "admin";
    const existingAdmin = await Admin.findOne({ username });

    if (!existingAdmin) {
      const hashedPassword = await hashPassword("1234_admin");
      await Admin.create({ username, active: true, password: hashedPassword });
      console.log("Default Admin Document Created");
    }
  } catch (error) {
    console.error("Error creating default Admin document:", error);
  }
};

module.exports = { connectDB };
