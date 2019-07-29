//load the things we need
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

//define the schema for our user model
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  admin: { type: Boolean, default: false },
  disable: { type: Boolean, default: false }
});

//methods ======================
//generating a hash
userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

//checking if password is valid
userSchema.methods.validPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

//create the model for users and expose it to our app
module.exports = mongoose.model("users", userSchema);
