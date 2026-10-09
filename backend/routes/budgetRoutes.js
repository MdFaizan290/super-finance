const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, budgetController.showAllBgt);
router.post("/", authMiddleware, budgetController.addNewBgt);
router.get("/:id", authMiddleware, budgetController.showBgt);

router.put("/:id", authMiddleware, budgetController.editBgt);

router.delete("/:id", authMiddleware, budgetController.deleteBgt);


module.exports = router;