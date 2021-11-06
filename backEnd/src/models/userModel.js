const mongoose = require ('mongoose')
const Schema = mongoose.Schema ;
const userSchema = new Schema({

//string & types
    name:{
    type:String,
    required:true
    },
    email:{
        //distinct 
    type:String,
    required:true
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

const user = mongoose.model('users', userSchema);
module.exports = user ;
