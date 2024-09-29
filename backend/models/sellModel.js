const mongoose = require("mongoose");

const sellModel = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  network: { type: String, required: true },
  bankDetails: {
    accountNumber: { type: String },
    ifscCode: { type: String },
    accountHolderName: { type: String },
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  }, // e.g., 'pending', 'completed'
  transactionId: { type: String },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

const Sell = mongoose.model("Sell", sellModel);
module.exports = Sell;
