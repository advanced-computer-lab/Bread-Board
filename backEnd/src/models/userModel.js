const mongoose = require ('mongoose')
const Schema = mongoose.Schema ;
const userSchema = new Schema({

//string & types
    name:{
    type:String,
    required:true
    },
    email:{
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

const user = mongoose.model('user', userSchema)
module.exports = user 
