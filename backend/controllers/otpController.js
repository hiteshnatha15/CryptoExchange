const User = require("../models/userModel");
const otpService = require("../services/otpService");
const generateOtp = require("../utils/generateOtp");
const jwt = require("jsonwebtoken");

const otpController = {
  sendOtp: async (req, res) => {
    let { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    mobile = `+91${mobile}`;
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    let user = await User.findOne({ mobile });
    if (!user) {
      user = new User({
        mobile,
        otp,
        otpExpiry,
        balances: { erc20: 0, trc20: 0 },
      });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
    }
    await user.save();

    const sent = await otpService.sendOtp(mobile, otp);
    if (sent) {
      res.status(200).json({ message: "OTP sent successfully" });
    } else {
      res.status(500).json({ message: "Failed to send OTP" });
    }
  },

  verifyOtp: async (req, res) => {
    let { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res
        .status(400)
        .json({ message: "Mobile number and OTP are required" });
    }

    mobile = `+91${mobile}`;
    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp === otp && user.otpExpiry > new Date()) {
      // Generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Clear OTP and expiry
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();

      return res.status(200).json({
        message: "OTP verified successfully",
        token,
        balances: user.balances,
      });
    } else {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
  },
};

module.exports = otpController;
