const User = require("../models/userModel"); // Adjust the path as necessary
const Deposit = require("../models/depositModel"); // Adjust the path as necessary
// Check if bank details are saved
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using req.user from your authentication middleware
    const user = await User.findById(userId);

    if (user) {
      return res.json({
        userDetails: user,
        success: true,
      });
    } else {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
exports.checkBankDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using req.user from your authentication middleware
    const user = await User.findById(userId);

    if (user && user.bankDetails && user.bankDetails.accountNumber) {
      console.log("Bank details found:", user.bankDetails);
      return res.json({
        bankDetailsSaved: true,
        bankDetails: user.bankDetails,
      });
    } else {
      return res.json({ bankDetailsSaved: false });
    }
  } catch (error) {
    console.error("Error checking bank details:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Add bank account
exports.addBankAccount = async (req, res) => {
  const { bankDetails } = req.body;
  const userId = req.user.id; // Assuming you have the user ID from the token

  try {
    // Find the user and update their bank details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update or set bank details
    user.bankDetails = bankDetails; // This will replace the existing details
    await user.save();

    res.status(200).json({
      message: "Bank details updated successfully",
      bankDetails: user.bankDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getDeposits = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using req.user from your authentication middleware
    const deposits = await Deposit.find({ userId });

    if (deposits.length > 0) {
      console.log("Deposits found:", deposits);
      return res.json({
        deposits,
        success: true,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No deposits found", success: false });
    }
  } catch (error) {
    console.error("Error fetching deposit details:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
