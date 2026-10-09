const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, goalController.showAll);
router.post("/", authMiddleware, goalController.addGoal);
router.get("/:id", authMiddleware, goalController.showGoal);
router.put("/:id", authMiddleware, goalController.editGoal);
router.patch("/saving/:id", goalController.editSaving);
router.delete("/:id", authMiddleware, goalController.deleteGoal);

module.exports = router; 
