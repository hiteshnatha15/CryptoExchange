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
  console.log(req.user.id);
  if (!amount || !userId || !network) {
    return res.status(400).json({
      message: "Amount, userId, and network are required.",
      success: false,
    });
  }
  // Allow only 'ETH' (ERC-20) and 'TRX' (TRC-20) networks
  if (!["TRX", "BSC"].includes(network)) {
    return res.status(400).json({
      message:
        "Invalid network. Only 'BSC' (BEP-20) and 'TRX' (TRC-20) are allowed.",
      success: false,
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

    const savedDeposit = await newDeposit.save();
    const id = savedDeposit._id;
    res.json({
      id: id,
      address: depositAddress.address,
      qrCodeUrl: qrCodeUrl,
      amount: amount,
      network: network,
      createdAt: savedDeposit.createdAt,
      message: "Deposit address and QR code generated successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error generating deposit address",
      error: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  const { transactionId } = req.body;
  const userId = req.user.id;
  if (!transactionId || !userId) {
    return res.status(400).json({
      message: "Transaction ID and user ID are required.",
      success: false,
    });
  }
  const deposit = await Deposit.findOne({
    _id: transactionId,
  });
  if (!deposit) {
    return res.status(404).json({
      success: false,
      message: "No deposit found for this user.",
    });
  }
  await Deposit.findByIdAndDelete(transactionId);
  res.json({
    success: true,
    message: "Deposit deleted successfully.",
  });
};

const submitTransactionId = async (req, res) => {
  const { transactionId, depositId } = req.body;
  const userId = req.user.id;

  if (!userId || !transactionId || !depositId) {
    return res.status(400).json({
      message: "User ID, transaction ID, and deposit ID are required.",
      success: false,
    });
  }

  try {
    // Find the pending deposit for the user
    const deposit = await Deposit.findById(depositId);
    if (!deposit) {
      return res.status(404).json({
        message: "No pending deposit found for this user.",
        success: false,
      });
    }

    // Check if the deposit is already completed
    if (deposit.status === "completed") {
      return res.status(400).json({
        message: "This deposit has already been completed.",
        success: false,
      });
    }

    // Check if the transaction ID has already been submitted
    if (deposit.transactionId) {
      return res.status(400).json({
        message: "Transaction ID has already been submitted for this deposit.",
        success: false,
      });
    }

    // Check if the transaction ID is already used in any deposit
    const existingDeposit = await Deposit.findOne({ transactionId });
    if (existingDeposit) {
      return res.status(400).json({
        message: "This transaction ID has already been used.",
        success: false,
      });
    }

    // Update the deposit with the provided transaction ID
    deposit.transactionId = transactionId;
    await deposit.save();

    // Log transactionId being submitted for Binance check
    console.log(`Checking Binance for transactionId: ${transactionId}`);

    // Check the deposit status using Binance API
    const deposits = await binanceClient.depositHistory({
      coin: "USDT",
      network: deposit.network,
    });

    // Find the deposit that matches the transaction ID
    const matchingDeposit = deposits.find((d) => d.txId === transactionId);

    // Log if a matching transaction was found
    if (matchingDeposit) {
      console.log("Matching deposit found:", matchingDeposit);

      // Check if the amount matches
      const amountInDeposit = parseFloat(deposit.amount); // Amount from your deposit record
      const amountInBinance = parseFloat(matchingDeposit.amount); // Amount from Binance

      // Check if the amounts match
      if (amountInDeposit !== amountInBinance) {
        return res.status(400).json({
          success: false,
          message:
            "The deposit amount does not match the transaction amount from Binance.",
        });
      }

      // Update the deposit status based on Binance response
      deposit.status = matchingDeposit.status === 1 ? "completed" : "failed"; // Status check fixed
      await deposit.save();

      // Only update the user's balance if the deposit is successful and hasn't been processed yet
      if (deposit.status === "completed" && !existingDeposit) {
        const balanceUpdate =
          deposit.network === "bep20"
            ? { $inc: { "balances.bep20": deposit.amount } }
            : { $inc: { "balances.trc20": deposit.amount } };

        await User.findByIdAndUpdate(userId, balanceUpdate);
      }

      res.json({
        success: true,
        message: "Deposit status updated successfully.",
        status: deposit.status,
      });
    } else {
      console.log("Transaction ID not found in Binance deposit history.");
      res.status(404).json({
        success: false,
        message: "Transaction ID not found in Binance deposit history.",
      });
    }
  } catch (error) {
    console.error("Error checking deposit status:", error);
    res.status(500).json({
      success: false,
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
  deleteTransaction,
};
