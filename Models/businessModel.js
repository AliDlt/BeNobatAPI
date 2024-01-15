const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  businessName: { type: String, default: "Default Business Name" },
  colorPalette: {
    primary: { type: String, default: "#ffffff" },
    secondary: { type: String, default: "#000000" },
    Tertiary: { type: String, default: "#808080" },
  },
  slogan: { type: String, default: "Default Slogan" },
  socialLinks: { type: [String], default: [] },
  headerImage: {
    fileAddress: { type: String, default: "default-header-image.jpg" },
    link: { type: String, default: "#" },
    altText: { type: String, default: "Default Header Image" },
  },
  bannerImages: [
    {
      fileAddress: { type: String, default: "default-banner-image.jpg" },
      link: { type: String, default: "#" },
      altText: { type: String, default: "Default Banner Image" },
    },
  ],
  about: {
    text: { type: String, default: "Default About Us text" },
    image: { type: String, default: "Default About Us Image" },
  },
  contact: {
    phoneNumber: { type: String, default: "شماره تماس" },
    landlineNumber: { type: String, default: "شماره ثابت" },
    faxNumber: { type: String, default: "شماره فکس" },
    email: { type: String, default: "ایمیل" },
    googleMap: { type: String, default: "نقشه گوگل" },
    location: { type: String, default: "آدرس" },
  },
  feature: {
    primary: { type: String, default: "1" },
    secondary: { type: String, default: "1" },
    Tertiary: { type: String, default: "3" },
  },
  hoursOfWork: { type: String, default: "2 تا 6" },
});

module.exports = mongoose.model("Business", businessSchema);
