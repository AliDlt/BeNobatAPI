const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  businessName: { type: String, default: "Default Business Name" },
  colorPalette: { type: [String], default: ["#ffffff", "#000000", "#808080"] },
  slogan: { type: String, default: "Default Slogan" },
  socialLinks: { type: [String], default: [] },
  sliderImages: [
    {
      fileAddress: { type: String, default: "default-slider-image.jpg" },
      link: { type: String, default: "#" },
      altText: { type: String, default: "Default Slider Image" },
    },
  ],
  bannerImages: [
    {
      fileAddress: { type: String, default: "default-banner-image.jpg" },
      link: { type: String, default: "#" },
      altText: { type: String, default: "Default Banner Image" },
    },
  ],
  aboutUs: { type: String, default: "Default About Us text" },
  contact: {
    phoneNumber: { type: String, default: "N/A" },
    landlineNumber: { type: String, default: "N/A" },
    faxNumber: { type: String, default: "N/A" },
    email: { type: String, default: "N/A" },
    googleMap: { type: String, default: "N/A" },
  },
});

module.exports = mongoose.model("Business", businessSchema);
