const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");

router.get("/", goalController.showAll);
router.post("/", goalController.addGoal);
router.get("/:id", goalController.showGoal);
router.put("/:id",goalController.editGoal);
router.patch("/saving/:id",goalController.editSaving);
router.delete("/:id",goalController.deleteGoal);

module.exports = router;
