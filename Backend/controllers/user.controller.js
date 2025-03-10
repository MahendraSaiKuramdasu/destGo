const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");

module.exports.registerUser = async (req, res, next)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({erros: errors.array()});
  }

  const {fullName, email, password} = req.body;

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword
  });

  const token = user.generateAuthToken();

  res.status(200).json({token, user});
}