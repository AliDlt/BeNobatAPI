const User = require("../Models/userBaseModel");

const { hashPassword, comparePassword } = require("../Utils/hashPassword");
// const { generateToken, verifyToken } = require("../utils/jwt");

// const {
//   sendConfirmationEmail,
//   sendResetPassEmail,
// } = require("../utils/nodemailer");

const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", data: null, status: false });
    }

    // const url = `${
    //   "http://" + process.env.URL + ":" + process.env.PORT
    // }/images/${user.profile}`;
    // user.profile = url;

    // const token = generateToken({ user }, "365d");

    return res
      .status(200)
      .json({ message: "successful", data: user, status: true });
  } catch (error) {
    res.status(500).json({ message: error, data: null, status: false });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });

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
        email,
        password: hashedPassword,
      });
      return res.status(201).json({
        message: "User registered successfully.",
        data: newUser,
        status: true,
      });
      // const confirmationToken = generateToken({ user: newUser }, "1d");

      // const sendEmail = await sendConfirmationEmail(
      //   fullname,
      //   email,
      //   confirmationToken

      // if (sendEmail.status) {
      //   return res.status(201).json({
      //     message:
      //       "User registered successfully. Please activate your account",
      //     data: true,
      //   });
      // } else {
      //   return res.status(500).json({
      //     message: "error in sending email",
      //     data: false,
      //   });
      // }
    }
  } catch (error) {
    res.status(500).json({ message: error, data: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
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

    // const url = `${
    //   "http://" + process.env.URL + ":" + process.env.PORT
    // }/images/${user.profile}`;

    // user.profile = url;

    // const token = generateToken({ user }, "365d");

    return res
      .status(200)
      .json({ message: "Login successful", data: user, status: true });
  } catch (error) {
    res.status(500).json({ message: error, data: null, status: false });
  }
};

// const sendResetPassword = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found", data: false });
//     }

//     const resetPassToken = generateToken({ user: user }, "1d");

//     const sendEmail = await sendResetPassEmail(
//       user.fullname,
//       user.email,
//       resetPassToken
//     );

//     if (sendEmail.status) {
//       return res.status(201).json({
//         message: "Reset password link sent successfully",
//         data: true,
//       });
//     } else {
//       return res.status(500).json({
//         message: "Error in sending email",
//         data: false,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message, data: false });
//   }
// };

// const getResetPassword = async (req, res) => {
//   try {
//     const token = req.params.token;
//     const decodedToken = await verifyToken(token);

//     if (!decodedToken || !decodedToken.userId) {
//       return res
//         .status(400)
//         .json({ message: "Invalid or expired token", data: false });
//     }

//     const userId = decodedToken.userId;
//     const user = await User.findOne({ _id: userId });

//     if (!user) {
//       return res.status(404).json({ message: "User not found", data: false });
//     }

//     return res.status(200).json({ message: "Token is correct", data: true });
//   } catch (verificationError) {
//     if (verificationError.name === "JsonWebTokenError") {
//       return res
//         .status(400)
//         .json({ message: "Invalid token format", data: false });
//     } else {
//       return res.status(500).json({ message: error.message, data: false });
//     }
//   }
// };

// const changePassword = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.newPassword;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found", data: false });
//     }

//     if (isPasswordValid(password)) {
//       const hashedPassword = await hashPassword(password);
//       const passwordResetVersion = user.passwordResetVersion || 0;

//       const update = await user.updateOne({
//         password: hashedPassword,
//         passwordResetVersion: passwordResetVersion + 1,
//       });
//       if (update) {
//         return res
//           .status(200)
//           .json({ message: "Password changed", data: true });
//       } else {
//         return res
//           .status(400)
//           .json({ message: "change password got an error", data: false });
//       }
//     } else {
//       return res.status(400).json({
//         message:
//           "Please fill a valid password. It should be at least 8 characters long and not contain white spaces.",
//         data: false,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message, data: false });
//   }
// };

// const confirmEmail = async (req, res) => {
//   try {
//     const token = req.params.token;
//     const decodedToken = await verifyToken(token);

//     if (!decodedToken || !decodedToken.userId) {
//       return res
//         .status(400)
//         .json({ message: "Invalid or expired token", data: false });
//     }

//     const userId = decodedToken.userId;
//     await User.findByIdAndUpdate(userId, { isConfirmed: true });

//     return res
//       .status(200)
//       .json({ message: "Account successfully confirmed", data: true });
//   } catch (error) {
//     return res.status(500).json({ message: error.message, data: false });
//   }
// };

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
  getUser,
  registerUser,
  loginUser,
  //   sendResetPassword,
  //   getResetPassword,
  //   confirmEmail,
  //   changeUser,
  //   changePassword,
};