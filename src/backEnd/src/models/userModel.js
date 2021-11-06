const mongoose = require ('mongoose')
const Schema = mongoose.Schema ;
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = new Schema({

//string & types
    name:{
    type:String,
    required:true
    },
    email:{
    type:String,
    required:true,
    unique:true
    },
    password:{
    type:String,
    required:true
    },
    admin:{
        type:Boolean,
        required:false
        }

})
userSchema.plugin(uniqueValidator, {message:"Email already exists"});
const user = mongoose.model('users', userSchema);
module.exports = user ;
