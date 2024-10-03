const commissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  depositId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Deposit", // Reference to the Deposit model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Commission = mongoose.model("Commission", commissionSchema);

module.exports = Commission;
