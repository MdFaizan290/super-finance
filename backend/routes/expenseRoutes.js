const express = require("express");
const router = express.Router();
const { getAllExpense, addExpense, editExpense, dltExpense, searchExpense, filterExpense } = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getAllExpense);
router.post("/", authMiddleware, addExpense);
router.put("/:id", authMiddleware, editExpense);
router.delete("/:id", authMiddleware, dltExpense);
router.get("/search", searchExpense);

module.exports = router; 