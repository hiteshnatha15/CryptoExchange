// routes/routes.js
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
// Importing controllers
const {
  generateDepositAddress,
  submitTransactionId,
  processWithdrawal,
} = require("../controllers/binanceController");

const { sendOtp, verifyOtp } = require("../controllers/otpController");

// Deposit and Withdrawal Routes (Protected routes, require authentication)
router.post(
  "/api/deposit/generate-deposit-address",
  auth,
  generateDepositAddress
);
router.post("/api/deposit/submit-transaction-id", auth, submitTransactionId);
router.post("/api/withdrawal", auth, processWithdrawal);

// OTP Routes (These routes do not require authentication)
router.post("/api/otp/send-otp", sendOtp);
router.post("/api/otp/verify-otp", verifyOtp);

module.exports = router;
