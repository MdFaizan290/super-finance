const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    expenseAmt: {
        type: Number,
        required: true
    },
    
})

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;