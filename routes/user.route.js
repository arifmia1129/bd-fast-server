const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { runValidator } = require("../middleware/joi/runValidator");
const { registrationValidationRule } = require("../middleware/joi/validationRule");

router.post("/register", runValidator(registrationValidationRule), userController.registerUser)


module.exports = router;