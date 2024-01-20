const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

function generateToken(payload, expiresIn) {
  try {
    const tokenId = uuidv4();
    const options = { expiresIn, jwtid: tokenId };
    return jwt.sign(payload, process.env.SECRET_KEY, options);
  } catch (error) {
    throw new Error(error);
  }
}

async function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    throw error;
  }
}

async function verifyUserToken(token) {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  generateToken,
  verifyToken,
  verifyUserToken,
};
