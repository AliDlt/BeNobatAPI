const Business = require("../Models/businessModel");

exports.getBusiness = async (req, res) => {
  try {
    const business = await Business.findOne();

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    // Get base URL and port from environment variables
    const baseURL = process.env.URL || "http://localhost";
    const port = process.env.PORT || 3000; // Change to your default port

    // Function to generate image link
    const generateImageLink = (imageName) =>
      `${baseURL}:${port}/public/images/statics/${imageName}`;

    // Generate image links for the first business document
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

    res.json(businessWithImageLinks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
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
