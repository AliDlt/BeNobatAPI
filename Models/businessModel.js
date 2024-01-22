const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  businessName: { type: String, default: "نام مرکز شما" },
  colorPalette: {
    primaryColor: { type: String, default: "#2AA7FF" },
    secondaryColor: { type: String, default: "#4B73B8" },
    tertiaryColor: { type: String, default: "#515151" },
  },
  slogan: { type: String, default: "شعار شما" },
  socialLinks: {
    type: [String],
    default: ["https://instagram.com/", "https://twitter.com/"],
  },
  logo: {
    fileAddress: { type: String, default: "logo.webp" },
    altText: { type: String, default: "Default Logo Image" },
  },
  headerImage: {
    fileAddress: { type: String, default: "doc.png" },
    altText: { type: String, default: "Default Header Image" },
  },
  about: {
    text: { type: String, default: "درباره ما" },
    image: { type: String, default: "about.jpg" },
  },
  contact: {
    phoneNumber: { type: String, default: "0900000000" },
    landlineNumber: { type: String, default: "021000000" },
    faxNumber: { type: String, default: "021000000" },
    email: { type: String, default: "email@email.com" },
    googleMap: {
      type: String,
      default: "https://maps.app.goo.gl/MrRj36G63HwULUNu7",
    },
    location: { type: String, default: "تهران، ستارخان" },
  },
  hoursOfWork: { type: String, default: "2 تا 6" },
});

module.exports = mongoose.model("Business", businessSchema);
