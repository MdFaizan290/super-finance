const dns = require("dns");
dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);
// import "dotenv/config";
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const budgetRoute = require("./routes/budgetRoutes");
const goalRoute = require("./routes/goalRoutes");
const expenseRoute = require("./routes/expenseRoutes");

app.use(cors());
app.use(express.json());
const Port = process.env.PORT || 5000;

//mongoose connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Database");
    } catch (err) {
        console.log("Failed To Connect With Database!", err);
    }
}

// main()
//     .then(() => console.log("connection Successfull"))
//     .catch((err) => console.log(err));
// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/finance");
// }

//Home
app.get("/", (req, res) => {
    res.send("home route");
})

app.use("/api/budgets", budgetRoute);
app.use("/api/goals", goalRoute);
app.use("/api/expense", expenseRoute);

app.listen(Port,"0.0.0.0", () => {
    console.log(`Server Running On Port ${Port}...`);
    connectDB();
})
