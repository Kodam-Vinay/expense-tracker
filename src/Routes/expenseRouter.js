const {
  getAllTransactions,
  addTransaction,
  getTransactionDetails,
  updateTransaction,
  deleteTransaction,
  getTransactionSummary,
} = require("../controllers/expenseControllers");

const router = require("express").Router();

router.post("/transactions", addTransaction);
router.get("/transactions", getAllTransactions);
router.get("/transactions/:id", getTransactionDetails);
router.put("/transactions/:id", updateTransaction);
router.delete("/transactions/:id", deleteTransaction);
router.get("/summary", getTransactionSummary);

module.exports = router;
