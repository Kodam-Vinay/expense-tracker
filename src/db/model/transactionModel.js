const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["income", "expense"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
});

const TransactionModel = model("Transaction", transactionSchema);
module.exports = TransactionModel;
