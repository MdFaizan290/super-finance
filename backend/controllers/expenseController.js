const Expense = require("../models/expense");

const getAllExpense = async (req, res) => {
    try {
        const allExp = await Expense.find();
        res.json(allExp);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

const addExpense = async (req, res) => {
    try {
        const { title, expenseAmt } = req.body;
        const exp = await Expense.create({
            title,
            expenseAmt
        });
        res.json(exp);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

const editExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, expenseAmt } = req.body;
        const newExp = await Expense.findByIdAndUpdate(id,
            {
                title,
                expenseAmt
            },
            {
                runValidators: true,
                new: true
            }
        );
        res.json(newExp);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

const dltExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const dltExp = await Expense.findByIdAndDelete(id);
        if (!dltExp) {
            return res.json({ message: "No Expense To Delete" })
        }
        res.json({ message: "Expense Deleted SuccessFully", dltExp });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

const searchExpense = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        // console.log(keyword);
        const expense = await Expense.find({
            title: {
                $regex: keyword,
                $options: "i",
            },
        })
        res.json(expense);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

const filterExpense = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ message: err });
    }
}

module.exports = { getAllExpense, addExpense, editExpense, dltExpense, searchExpense, filterExpense };