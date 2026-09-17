const express = require("express");
const router = express.Router();
const { getAllExpense, addExpense, editExpense, dltExpense, searchExpense, filterExpense } = require("../controllers/expenseController");

router.get("/", getAllExpense);
router.post("/", addExpense);
router.put("/:id", editExpense);
router.delete("/:id", dltExpense);
router.get("/search", searchExpense);

module.exports = router;