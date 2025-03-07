const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller");

router.post('/register',[
  body('email').isEmail().withMessage("Invalid Email"),
  body("fullName.firstName").isLength({min:3}).withMessage("firstName must have more than 2 characters"),
  body("password").isLength({min:6}).withMessage("password must have minimum 6 characters")
],
  userController.registerUser
)

module.exports = router;