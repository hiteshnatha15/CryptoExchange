const Otp = require("../models/otpModel"); // Import the OTP model
const User = require("../models/userModel"); // Import the User model
const generateOtp = require("../utils/generateOtp");
const otpService = require("../services/otpService");
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

    // Check if OTP entry exists for this mobile number
    let otpEntry = await Otp.findOne({ mobile });
    if (!otpEntry) {
      // Create a new OTP entry
      otpEntry = new Otp({
        mobile,
        otp,
        otpExpiry,
      });
    } else {
      // Update existing OTP and expiry
      otpEntry.otp = otp;
      otpEntry.otpExpiry = otpExpiry;
    }
    await otpEntry.save(); // Save OTP entry

    const sent = await otpService.sendOtp(mobile, otp);
    if (sent) {
      res.status(200).json({ message: "OTP sent successfully" });
    } else {
      res.status(500).json({ message: "Failed to send OTP" });
    }
  },

  // ...verifyOtp method remains the same
  verifyOtp: async (req, res) => {
    let { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res
        .status(400)
        .json({ message: "Mobile number and OTP are required" });
    }

    mobile = `+91${mobile}`;
    const otpEntry = await Otp.findOne({ mobile });

    if (!otpEntry) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (otpEntry.otp === otp && otpEntry.otpExpiry > new Date()) {
      // OTP is valid, create or update the user
      let user = await User.findOne({ mobile });

      if (!user) {
        user = new User({
          mobile,
          balances: { erc20: 0, trc20: 0 },
        });
        await user.save(); // Save new user
      }

      // Generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Clear OTP entry
      await Otp.deleteOne({ mobile }); // Remove OTP entry after successful verification

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