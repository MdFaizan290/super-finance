const Goal = require("../models/goal");

//Show all Goals
module.exports.showAll = async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user._id });
        res.json(goals);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
//Add New goal
module.exports.addGoal = async (req, res) => {
    try {
        const { title, targetAmount, currentAmount } = req.body;
        const addGoal = await Goal.create({
            userId: req.user._id,
            title,
            targetAmount,
            currentAmount,
        });
        res.status(200).json({ message: "Goal Added", addGoal });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

//Show Single Goal
module.exports.showGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await Goal.findOne({ _id: id, userId: req.user._id });
        if (!goal) {
            return res.json({ message: "No Goal Found" });
        }
        res.json(goal);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
//Update Goal
module.exports.editGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, targetAmount, currentAmount } = req.body;
        const newGoal = await Goal.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id
            },
            {
                title,
                targetAmount,
            },
            {
                runValidators: true,
                new: true
            }
        );
        if (!newGoal) {
            return res.status(404).json({ message: "Goal Not Found" });
        }
        res.json(newGoal);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
//update current amount
module.exports.editSaving = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentAmount } = req.body;
        const goal = await Goal.findById(id);
        const newAmt = goal.currentAmount + Number(currentAmount);
        if (newAmt > goal.targetAmount) {
            return res.json({ message: "Target Amount exceeded," });
        }
        goal.currentAmount = newAmt;
        await goal.save();
        res.json(goal);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
//Delete Goal
module.exports.deleteGoal = async (req, res) => {
    try {
        const id = req.params.id;
        const dltGoal = await Goal.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!dltGoal) {
            return res.json({ message: "No Goal To Delete" });
        }
        res.json({ message: "Goal Deleted Succesfully", dltGoal });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}