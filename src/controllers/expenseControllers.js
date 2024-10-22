const TransactionModel = require("../db/model/transactionModel");
const { filterTransactionDetails } = require("../utils/constants");

const addTransaction = async (req, res) => {
  try {
    const { type, category, amount, description } = req.body;

    if (!type || !category || !amount || !description) {
      return res
        .status(400)
        .send({ status: false, message: "Please fill in all fields" });
    }
    const response = await TransactionModel.create({
      type,
      category,
      date: Date.now(),
      amount,
      description,
    });

    res.status(201).send({
      status: true,
      message: "Transaction added successfully",
      data: filterTransactionDetails(response),
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find()
      .sort({ date: -1 })
      .populate("category");
    const filterData = transactions.map((each) =>
      filterTransactionDetails(each)
    );
    res.status(200).send({
      status: true,
      message: "Transactions retrieved successfully",
      data: filterData,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

const getTransactionDetails = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide transaction id" });
    }
    const findTransaction = await TransactionModel.findOne({
      _id: id,
    });
    if (!findTransaction) {
      return res
        .status(404)
        .send({ status: false, message: "Transaction not found" });
    }
    const transactionDetails = filterTransactionDetails(findTransaction);
    res.status(200).send({
      status: true,
      message: "Transaction details retrieved successfully",
      data: transactionDetails,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide transaction id" });
    }
    const updateData = req.body;
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please fill in all fields" });
    }
    const findTransaction = await TransactionModel.findOne({
      _id: id,
    });
    if (!findTransaction) {
      return res
        .status(404)
        .send({ status: false, message: "Transaction not found" });
    }
    const details = await TransactionModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).send({
      status: true,
      message: "Transaction updated successfully",
      data: details,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide transaction id" });
    }
    const findTransaction = await TransactionModel.findOne({
      _id: id,
    });
    if (!findTransaction) {
      return res
        .status(404)
        .send({ status: false, message: "Transaction not found" });
    }
    await TransactionModel.findByIdAndDelete(id);
    res.status(200).send({
      status: true,
      message: "Transaction Deleted Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

const getTransactionSummary = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    const query = {};

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (category) {
      query.category = category;
    }

    const transactions = await TransactionModel.find(query).populate(
      "category"
    );
    const income = transactions
      .filter((each) => each.type === "income")
      .reduce((total, current) => total + current.amount, 0);

    const expenses = transactions
      .filter((each) => each.type === "expense")
      .reduce((total, current) => total + current.amount, 0);

    const balance = expenses - income;

    const filterTransactions = transactions.map((each) =>
      filterTransactionDetails(each)
    );

    res.status(200).send({
      status: true,
      message: "Summary Retrieved Successfully",
      data: {
        income,
        expenses,
        balance,
        transactions: filterTransactions,
      },
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  addTransaction,
  getAllTransactions,
  getTransactionDetails,
  updateTransaction,
  deleteTransaction,
  getTransactionSummary,
};
