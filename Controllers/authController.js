const User = require("../Models/userBaseModel");

const { hashPassword, comparePassword } = require("../Utils/hashPassword");
const { generateToken } = require("../Utils/jwt");
const { isPasswordValid } = require("../Utils/validation");

const registerUser = async (req, res) => {
  try {
    const { phoneNumber, password, role } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (user) {
      return res.status(400).json({
        message: "the user is already exist",
        data: nul,
        status: false,
      });
    } else {
      const hashedPassword = await hashPassword(password);
      const newUser = await User.create({
        username,
        phoneNumber,
        password: hashedPassword,
        role,
      });
      return res.status(201).json({
        message: "User registered successfully.",
        data: newUser,
        status: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error, data: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", data: null, status: false });
    }

    const passwordsMatch = await comparePassword(password, user.password);
    if (!passwordsMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", data: null, status: false });
    }

    const token = generateToken({ user }, "365d");

    return res
      .status(200)
      .json({ message: "Login successful", data: token, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, data: null, status: false });
  }
};

const changePassword = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: false });
    }

    if (isPasswordValid(password)) {
      const hashedPassword = await hashPassword(password);
      const passwordResetVersion = user.passwordResetVersion || 0;

      const update = await user.updateOne({
        password: hashedPassword,
        passwordResetVersion: passwordResetVersion + 1,
      });
      if (update) {
        return res
          .status(200)
          .json({ message: "Password changed", data: true });
      } else {
        return res
          .status(400)
          .json({ message: "change password got an error", data: false });
      }
    } else {
      return res.status(400).json({
        message:
          "Please fill a valid password. It should be at least 8 characters long and not contain white spaces.",
        data: false,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// const changeUser = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { fullname, email } = req.body;

//     const updatedUser = await User.findOneAndUpdate(
//       { _id: userId },
//       {
//         fullname,
//         email,
//       },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res
//         .status(404)
//         .json({ message: "the user didn't found", data: false });
//     }

//     const token = generateToken({ updatedUser }, "365d");
//     return res
//       .status(200)
//       .json({ message: "user successfully changed", data: token });
//   } catch (error) {
//     res.status(500).json({ message: error, data: false });
//   }
// };

module.exports = {
  registerUser,
  loginUser,
  //   changeUser,
  changePassword,
};
