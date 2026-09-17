const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;