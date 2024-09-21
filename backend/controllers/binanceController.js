const mongoose = require("mongoose");
const QRCode = require("qrcode");
const Binance = require("binance-api-node").default;
const Deposit = require("../models/depositModel");
const User = require("../models/userModel");
const Withdrawal = require("../models/withdrawlModel"); // Adjust the path as necessary

const binanceClient = Binance({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
});

// Generate deposit address and QR code
const generateDepositAddress = async (req, res) => {
  const { amount, network } = req.body;
  const userId = req.user.id;
  if (!amount || !userId || !network) {
    return res.status(400).json({
      message: "Amount, userId, and network are required.",
    });
  }
  // Allow only 'ETH' (ERC-20) and 'TRX' (TRC-20) networks
  if (!["ETH", "TRX"].includes(network)) {
    return res.status(400).json({
      message:
        "Invalid network. Only 'ETH' (ERC-20) and 'TRX' (TRC-20) are allowed.",
    });
  }

  try {
    // Fetch deposit address from Binance
    const depositAddress = await binanceClient.depositAddress({
      coin: "USDT",
      network: network,
    });

    // Generate QR code for the deposit address
    const qrCodeUrl = await QRCode.toDataURL(depositAddress.address);

    // Save the deposit transaction to the database
    const newDeposit = new Deposit({
      userId: new mongoose.Types.ObjectId(userId),
      address: depositAddress.address,
      network: network,
      amount: amount,
      status: "pending",
      transactionId: "", // Transaction ID will be entered later
    });

    await newDeposit.save();

    res.json({
      address: depositAddress.address,
      qrCodeUrl: qrCodeUrl,
      amount: amount,
      message: "Deposit address and QR code generated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error generating deposit address",
      error: error.message,
    });
  }
};

// Submit transaction ID and check deposit status
const submitTransactionId = async (req, res) => {
  const { transactionId } = req.body;
  const userId = req.user.id;
  if (!userId || !transactionId) {
    return res.status(400).json({
      message: "User ID and transaction ID are required.",
    });
  }

  try {
    // Find the pending deposit for the user
    const deposit = await Deposit.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      status: "pending",
    });

    if (!deposit) {
      return res.status(404).json({
        message: "No pending deposit found for this user.",
      });
    }

    // Update the deposit with the provided transaction ID
    deposit.transactionId = transactionId;
    await deposit.save();

    // Check the deposit status using Binance API
    const deposits = await binanceClient.depositHistory({
      coin: "USDT",
      network: deposit.network,
    });

    // Find the deposit that matches the transaction ID
    const matchingDeposit = deposits.find((d) => d.txId === transactionId);

    if (matchingDeposit) {
      // Update the deposit status based on Binance response
      deposit.status =
        matchingDeposit.status === "SUCCESS" ? "completed" : "failed";
      await deposit.save();

      // Update the user's balance if the deposit is successful
      if (deposit.status === "completed") {
        const balanceUpdate =
          deposit.network === "ERC20"
            ? { $inc: { "balances.erc20": deposit.amount } }
            : { $inc: { "balances.trc20": deposit.amount } };

        await User.findByIdAndUpdate(userId, balanceUpdate);
      }

      res.json({
        message: "Deposit status updated successfully.",
        status: deposit.status,
      });
    } else {
      res.status(404).json({
        message: "Transaction ID not found in Binance deposit history.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error checking deposit status",
      error: error.message,
    });
  }
};

// Process withdrawal
const processWithdrawal = async (req, res) => {
  const { userId, amount, address, network } = req.body;

  if (!userId || !amount || !address || !network) {
    return res
      .status(400)
      .json({ message: "User ID, amount, address, and network are required." });
  }

  let newWithdrawal;

  try {
    // Create a new withdrawal record with status 'pending'
    newWithdrawal = new Withdrawal({
      userId: new mongoose.Types.ObjectId(userId),
      amount,
      address,
      network,
      status: "pending",
    });

    await newWithdrawal.save();

    // Process the withdrawal
    const withdrawResponse = await binanceClient.withdraw({
      asset: "USDT",
      address: address,
      amount: amount,
      network: network,
    });

    // Update the withdrawal record with the result
    newWithdrawal.status = "completed";
    await newWithdrawal.save();

    res.json({
      message: "Withdrawal processed successfully",
      withdrawResponse: withdrawResponse,
    });
  } catch (error) {
    console.error(error);

    // Update the withdrawal record with the error status
    if (newWithdrawal) {
      try {
        newWithdrawal.status = "failed";
        await newWithdrawal.save();
      } catch (dbError) {
        console.error("Error updating withdrawal status:", dbError.message);
      }
    }

    res.status(500).json({
      message: "Error processing withdrawal",
      error: error.message,
    });
  }
};

module.exports = {
  generateDepositAddress,
  submitTransactionId,
  processWithdrawal,
};
