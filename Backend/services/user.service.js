const userModel = require("../models/user.model");

module.exports.createUser = async ({firstName, lastName, email, password}) =>{
  
  if(!firstName || !email || !password){
    throw new Error("invalid userCreation");
  }

  const newUser = userModel.create({
    fullName: {
      firstName,
      lastName
    },
    email,
    password
  })

  return newUser;
}