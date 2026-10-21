const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
const userController = require("../controllers/userController");

router.get("/", userController.getUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/profile-image", upload.single("image"), userController.profileImage);

module.exports = router;