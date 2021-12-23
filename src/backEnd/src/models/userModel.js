const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = new Schema({
  //string & types
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: false,
  },
  passportNumber: {
    type: String,
    required: true,
  },
  homeAddress: {
    type: String,
    required: true,
  },
  countryCode: {
    type: Number,
    required: true,
  },
  telephoneNumber: {
    type: Number,
    required: true,
  },
  secondTelephoneNumber: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});
userSchema.plugin(uniqueValidator, { message: "Email already exists" });
const user = mongoose.model("users", userSchema);
module.exports = user;
