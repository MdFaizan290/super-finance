const Budget = require("../models/budget");
const User = require("../models/user");

// Show All Budgets
module.exports.showAllBgt = async (req, res) => {
    try {
        // const token = req.headers.authorization;
        // if (!token) return res.status(401).json({ message: "Token Not Found" });

        // const user = await User.findOne({ token: token });
        // if (!user) return res.status(401).json({ message: "User Not Found" });

        const budgets = await Budget.find({ userId: req.user._id });
        res.json(budgets);
        // res.send("All Budget Route");
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

// Add New Budget
module.exports.addNewBgt = async (req, res) => {
    const { category, amount } = req.body;
    // res.send("Add Budget Route");
    try {
        // const token = req.headers.authorization;
        // if (!token) return res.status(401).json({ message: "Token Not Found" });

        // const user = await User.findOne({ token: token });
        // if (!user) return res.status(401).json({ message: "User Not Found" });

        const addBudget = new Budget({
            userId: req.user._id,
            category: category,
            amount: amount
        });
        await addBudget.save();
        res.status(200).json({ message: "Budget Added" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
} 
// Show Single Budget 
module.exports.showBgt = async (req, res) => {
    // res.send("Single Budget Route");
    try {
        // const token = req.headers.authorization;
        // if (!token) return res.status(401).json({ message: "Token Not Found" });

        // const user = await User.findOne({ token: token });
        // if (!user) return res.status(401).json({ message: "User Not Found" });

        const id = req.params.id;
        const budget = await Budget.findOne({ _id: id, userId: req.user._id });
        if (!budget) {
            return res.json({ message: "No Budget Found" });
        }
        res.json(budget);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

//Update Budget
module.exports.editBgt = async (req, res) => {
    // res.send("Update Budget Route");
    try {
        // const token = req.headers.authorization;
        // if (!token) return res.status(401).json({ message: "Token Not Found" });

        // const user = await User.findOne({ token: token });
        // if (!user) return res.status(401).json({ message: "User Not Found" });

        const { id } = req.params;
        // const budget = await Budget.findById(id);
        // if(!budget){
        //     return res.status(400).json({message:"Id Not Found"});
        // }
        const { category, amount } = req.body;
        const newBudget = await Budget.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id
            },
            {
                category,
                amount
            },
            {
                runValidators: true,
                new: true
            }
        );
        if (!newBudget) {
            return res.status(404).json({ message: "Budget Not Found" });
        }
        res.json(newBudget);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
//Delete Budget
module.exports.deleteBgt = async (req, res) => {
    // res.send("Delete Budget Route");
    try {
        // const token = req.headers.authorization;
        // if (!token) return res.status(401).json({ message: "Token Not Found" });

        // const user = await User.findOne({ token: token });
        // if (!user) return res.status(401).json({ message: "User Not Found" });

        const { id } = req.params;
        const dltBudget = await Budget.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!dltBudget) {
            return res.json({ message: "Budget Not Found" });
        }
        res.json({ message: "Budget Deleted Successfully", dltBudget });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
