
const express = require("express");
const {
  registerhandler,
  loginhandler,
} = require("../Controllers/UserController");
const { checkUser } = require("../Middleware/AuthMiddlewares");
const router = express.Router();

router.post("/", checkUser); // Changed to GET method for token verification
router.post("/register", registerhandler);
router.post("/login", loginhandler);

module.exports = router;
