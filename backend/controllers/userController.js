const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// const getUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findById(id);
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: `${error} / User Not Found` });
//     }
// }

const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password, isAdult } = req.body;
        if (!name || !email || !password || !isAdult) {
            return res.status(400).json({ message: "All Fields Are Required" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isAdult,
        })
        await newUser.save();
        // const profile = new Profile({ userId: newUser._id });
        // await profile.save();
        return res.json({ message: "User Created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All Fields Are Required" })
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User Does Not Exists" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const token = crypto.randomBytes(32).toString("hex");
        await User.updateOne({ _id: user._id }, { token });
        return res.json({ token: token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { register, login, getUser };