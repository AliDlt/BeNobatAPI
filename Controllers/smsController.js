const axios = require("axios");

// Function to handle API response
const handleApiResponse = (res, response) => {
  const { IsSuccess, Message, Data } = response.data;
  if (IsSuccess) {
    res.status(200).json({ message: Message, data: Data, status: true });
  } else {
    res.status(400).json({ message: Message, data: Data, status: false });
  }
};

// Function to handle API errors
const handleApiError = (res, error) => {
  console.error("Error:", error.message);
  res
    .status(500)
    .json({ message: `خطا : ${error.message}`, data: null, status: false });
};

// Send SMS
exports.SendSMS = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const apiUrl = "http://api.mrapi.ir/sandbox/send";
    const requestData = {
      PhoneNumber: phoneNumber,
      PatternID: "631b5dfe-a39e-400d-a17c-f3b2fae8aafa",
      Token: "QmVOb2JhdGFIUjBjRG92TDJKbGFHNXZZbUYwTG1seUx3PT0=",
      ProjectType: 1,
    };

    const headers = {
      Authentication:
        "5gTYiBjM0UGZjFTYhFmYldjM2QzNmFGZlVWOlljZ1QjOEJDRBJ0QGJjM",
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, requestData, { headers });
    handleApiResponse(res, response);
  } catch (error) {
    handleApiError(res, error);
  }
};

// Verify SMS
exports.VerifySMS = async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;
    const apiUrl = "http://api.mrapi.ir/sandbox/verify";
    const requestData = { PhoneNumber: phoneNumber, Code: code };

    const headers = {
      Authentication:
        "5gTYiBjM0UGZjFTYhFmYldjM2QzNmFGZlVWOlljZ1QjOEJDRBJ0QGJjM",
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, requestData, { headers });
    handleApiResponse(res, response);
  } catch (error) {
    handleApiError(res, error);
  }
};
