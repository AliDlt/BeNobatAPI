const User = require("../Models/userBaseModel");
const { hashPassword, comparePassword } = require("../Utils/hashPassword");
const { generateToken } = require("../Utils/jwt");
const { isPasswordValid } = require("../Utils/validation");
const {
  handleBadRequest,
  handleNotFound,
  handleServerError,
  handleSuccess,
} = require("../Utils/handlers");

const registerUser = async (req, res) => {
  try {
    const { phoneNumber, password, nationalCode, role } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (user) {
      return handleBadRequest(res, "The user is already exist.");
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      phoneNumber,
      password: hashedPassword,
      nationalCode,
      role,
    });

    handleSuccess(res, "User registered successfully.", newUser);
  } catch (error) {
    handleServerError(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return handleNotFound(res, "User not found.");
    }

    const passwordsMatch = await comparePassword(password, user.password);
    if (!passwordsMatch) {
      return handleBadRequest(res, "Invalid credentials.");
    }

    const token = generateToken({ user }, "365d");

    handleSuccess(res, "Login successful.", token);
  } catch (error) {
    handleServerError(res, error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return handleNotFound(res, "User not found.");
    }

    if (isPasswordValid(password)) {
      const hashedPassword = await hashPassword(password);
      const passwordResetVersion = user.passwordResetVersion || 0;

      const update = await user.updateOne({
        password: hashedPassword,
        passwordResetVersion: passwordResetVersion + 1,
      });

      if (update) {
        handleSuccess(res, "Password changed.", true);
      } else {
        handleBadRequest(res, "Change password got an error.");
      }
    } else {
      handleBadRequest(res, "Please provide a valid password.");
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
