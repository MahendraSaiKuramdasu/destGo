const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "first name must have 3 or more characters"]
    },
    lastName: {
      type: String,
      minLength: [2, "last name must have 2 or more characters"]
    }
  },
  email: {
    required: true,
    unique: true,
    type: String,
    minLength: [5, "should have more than 4 characters"]
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: {
    type: String
  }
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
  return token;
};

userSchema.statics.hashPassword = async function(password){
  return await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;