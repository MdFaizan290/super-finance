const Goal = require("../models/goal");

//Show all Goals
module.exports.showAll = async (req, res) => {
    try {
        const goals = await Goal.find();
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
            title,
            targetAmount,
            currentAmount,
        });
        res.json(addGoal);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

//Show Single Goal
module.exports.showGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await Goal.findById(id);
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
        const newGoal = await Goal.findByIdAndUpdate(id,
            {
                title,
                targetAmount,
            },
            {
                runValidators: true,
                new: true
            }
        );
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
        const dltGoal = await Goal.findByIdAndDelete(id);
        if (!dltGoal) {
            return res.json({ message: "No Goal To Delete/Already deleted" });
        }
        res.json({ message: "Goal Deleted Succesfully", dltGoal });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}