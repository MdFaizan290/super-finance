const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Token Not Found" });
        }

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = authMiddleware;
