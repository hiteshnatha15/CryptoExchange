const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  bankDetails: {
    accountNumber: { type: String },
    ifscCode: { type: String },
    accountHolderName: { type: String },
  },
  otp: { type: String }, // Field to store OTP for verification
  otpExpiry: { type: Date }, // Field to store OTP expiry time
  createdAt: { type: Date, default: Date.now },
  balances: {
    bep20: {
      type: Number,
      default: 0, // Default balance for ERC-20
    },
    trc20: {
      type: Number,
      default: 0, // Default balance for TRC-20
    },
    processing: {
      type: Number,
      default: 0, // Default processing balance
    },
    commission: {
      // Field to store total commission earned
      type: Number,
      default: 0,
    },
  },
  walletAddress: {
    bep20: { type: String },
    trc20: { type: String },
  },
  transactionPassword: { type: String },
  referralCode: { type: String, unique: true }, // Unique referral code
  referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Store referred users
});

const User = mongoose.model("User", userSchema);

module.exports = User;
