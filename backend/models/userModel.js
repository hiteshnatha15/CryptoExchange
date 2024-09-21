const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  otp: { type: String }, // Field to store OTP for verification
  otpExpiry: { type: Date }, // Field to store OTP expiry time
  createdAt: { type: Date, default: Date.now },
  balances: {
    erc20: {
      type: Number, 
      default: 0, // Default balance for ERC-20
    },
    trc20: {
      type: Number,
      default: 0, // Default balance for TRC-20
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
