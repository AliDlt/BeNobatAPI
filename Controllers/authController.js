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
      return handleBadRequest(res, "کاربری با این شماره همراه وجود دارد. لطفا مقدار دیگری وارد نمایید.");
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      phoneNumber,
      password: hashedPassword,
      nationalCode,
      role,
    });

    handleSuccess(res, "کاربر با موفقیت ثبت نام شد.", newUser);
  } catch (error) {
    handleServerError(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return handleNotFound(res, "کاربری یافت نشد.");
    }

    const passwordsMatch = await comparePassword(password, user.password);
    if (!passwordsMatch) {
      return handleBadRequest(res, "اطلاعات ورود نادرست می باشد.");
    }

    const token = generateToken({ user }, "365d");

    handleSuccess(res, "ورود با موفقیت انجام شد.", token);
  } catch (error) {
    handleServerError(res, error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return handleNotFound(res, "کاربری یافت نشد.");
    }

    if (isPasswordValid(password)) {
      const hashedPassword = await hashPassword(password);
      const passwordResetVersion = user.passwordResetVersion || 0;

      const update = await user.updateOne({
        password: hashedPassword,
        passwordResetVersion: passwordResetVersion + 1,
      });

      if (update) {
        handleSuccess(res, "رمزعبور با موفقیت تغییر پیدا کرد.", true);
      } else {
        handleBadRequest(res, "تغییر رمزعبور با خطا مواجه شد.");
      }
    } else {
      handleBadRequest(res, "لطفا یک رمزعبور معتبر وارد نمایید.");
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
