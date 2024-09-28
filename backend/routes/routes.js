const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

// Importing controllers
const {
  generateDepositAddress,
  submitTransactionId,
  processWithdrawal,
  deleteTransaction,
} = require("../controllers/binanceController");

const { sendOtp, verifyOtp } = require("../controllers/otpController");
const {
  checkBankDetails,
  addBankAccount,
  getUserDetails,
  getDeposits
} = require("../controllers/userController"); // Import your new controller

// Deposit and Withdrawal Routes (Protected routes, require authentication)
router.post(
  "/api/deposit/generate-deposit-address",
  auth,
  generateDepositAddress
);
router.post("/api/deposit/submit-transaction-id", auth, submitTransactionId);
router.post("/api/withdrawal", auth, processWithdrawal);
router.post("/api/delete-transaction", auth, deleteTransaction);

// Bank Account Routes (Protected routes, require authentication)
router.get("/api/checkBankDetails", auth, checkBankDetails); // Check bank details
router.post("/api/addBankAccount", auth, addBankAccount); // Add bank account
router.get("/api/getUserDetails", auth, getUserDetails); // Get user details
router.get("/api/getDeposits", auth, getDeposits); // Get deposits

// OTP Routes (These routes do not require authentication)
router.post("/api/otp/send-otp", sendOtp);
router.post("/api/otp/verify-otp", verifyOtp);

module.exports = router;
