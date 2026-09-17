const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    targetAmount: {
        type: Number,
        required: true,
    },
    currentAmount: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;