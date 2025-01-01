const express = require("express");
const router = express.Router();
const { register, login, whoami, logout } = require("../controllers/authControllers");
const { restrict } = require("../middlewares/authMiddlewares");

// Register, Login, Whomai, Logout
router.post("/register", register);
router.post("/login", login);
router.get("/whoami", restrict, whoami);
router.post("/logout", logout);

module.exports = router;
