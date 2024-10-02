const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel"); // Adjust the path as necessary

const auth = async (req, res, next) => {
  // Get the token from the request header
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Split the 'Bearer <token>' to extract the token part
  const token = authHeader.split(" ")[1]; // Get the token after 'Bearer'

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Invalid token format." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the user exists in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Add user information to the request object
    req.user = user;
    next();
  } catch (err) {
    console.log(token);
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = auth;
