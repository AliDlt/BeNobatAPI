const Business = require("../Models/businessModel");
const {
  handleNotFound,
  handleSuccess,
  handleBadRequest,
  handleServerError,
} = require("../Utils/handlers");

const generateImageLink = (imageName) => {
  // Get base URL and port from environment variables
  const baseURL = process.env.URL || "http://localhost";
  const port = process.env.PORT || 3000; // Change to your default port

  return `${baseURL}:${port}/public/images/statics/${imageName}`;
};

exports.getBusiness = async (req, res) => {
  try {
    const business = await Business.findOne();

    if (!business) {
      return handleNotFound(res, "Business not found");
    }

    const businessWithImageLinks = {
      ...business.toObject(),
      logo: generateImageLink(business.logo.fileAddress),
      headerImage: generateImageLink(business.headerImage.fileAddress),
      bannerImages: business.bannerImages.map((banner) =>
        generateImageLink(banner)
      ),
      about: {
        ...business.about.toObject(),
        image: generateImageLink(business.about.image),
      },
    };

    handleSuccess(
      res,
      "Business retrieved successfully.",
      businessWithImageLinks
    );
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.createBusiness = async (req, res) => {
  try {
    const newBusiness = new Business(req.body);
    await newBusiness.save();
    handleSuccess(res, "Business created successfully.", newBusiness);
  } catch (error) {
    handleBadRequest(res, "Bad Request");
  }
};

exports.updateBusiness = async (req, res) => {
  try {
    const updatedBusiness = req.body;
    await Business.updateOne(updatedBusiness);
    handleSuccess(res, "Business updated successfully.", updatedBusiness);
  } catch (error) {
    handleBadRequest(res, "Bad Request");
  }
};
