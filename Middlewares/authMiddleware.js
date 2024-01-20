const User = require("../Models/userBaseModel");
const mongoose = require("mongoose");

const { verifyUserToken } = require("../Utils/jwt");

module.exports.authenticationFunction =
  (allowedRoles) => async (req, res, next) => {
    try {
      const token = req.header("token");

      if (token === null || token === undefined) {
        return res
          .status(400)
          .json({ message: "the token is required in header", status: false });
      }

      const decoded = await verifyUserToken(token);
      const userId = decoded.user._id;

      if (!userId || userId.trim() === "") {
        return res
          .status(400)
          .json({ message: "the userId is required", status: false });
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res
          .status(400)
          .json({ message: "Invalid userId format", status: false });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(404)
          .json({ message: "the user not found", status: false });
      }

      // Attach the user to the request for further use
      req.user = user;

      // Check if the user has the required role to access the route
      if (allowedRoles && allowedRoles.length > 0) {
        if (!allowedRoles.includes(req.user.role)) {
          return res
            .status(403)
            .json({ message: "Access forbidden", status: false });
        }
      }

      // Log success or any other important information
      console.log(`User ${user.username} successfully authenticated`);

      next();
    } catch (error) {
      // Log the error for debugging purposes
      console.error(`Authentication error: ${error.message}`);
      res.status(500).json({
        message: `there is an error: ${error.message}`,
        status: false,
      });
    }
  };
