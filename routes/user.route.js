const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { runValidator } = require("../middleware/joi/runValidator");
const { registrationValidationRule, loginValidationRule } = require("../middleware/joi/validationRule");

router.post("/register", runValidator(registrationValidationRule), userController.registerUser)

router.post("/login", runValidator(loginValidationRule), userController.loginUser)


module.exports = router;