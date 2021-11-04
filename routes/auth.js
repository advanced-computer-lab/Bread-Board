const express=require('express');
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("test")
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken");
const login=require('../middleware/login')

//Using the router request for signing up
router.get('/signup',(req,res)=>{
    //Popping a hello message to the user ; Note the UI is not out yet
    res.send("hello");
});

router.post('/signup',(req,res)=>{
    //Passing in the variables from the request into variables
    var {name,email,password}=req.body
    console.log(req.body)
    if(!email || !password || !name)
    {
        //error message incase the above were empty elements
        return res.status(200).json({error:"Add all data"})
    }
    //encyrpting the password using a hashmap
    bcrypt.hash(password,12)
    .then((hashedpw)=>{
        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                //Error incase the user was already a member
                 return res.status(422).json({error:"User already exists with that email"})
            }
            //if everything was smooth then simply add the data to the database 
            const user=new User({
             email,
             password:hashedpw,
             name,
         })
         user.save()
         .then((user)=>{
             res.json({message:"Saved Successfully"})
             console.log(user.email)
         })
         .catch((err)=>{
             console.log(err)
         })
    })
    .catch((err)=>{
        console.log(err)
    })   

})
.catch((err)=>{
    console.log(err)
})
})

//After recieving the data from the user in the login route
router.post('/login',(req,res)=>{
    //Store the email and password we take from the body
    var {email,password}=req.body
    if(!email || !password )
    {
        //One of them is empty then redirect
        return res.status(422).json({error:"Please add all fields"})
    }
    //Findone is a mongodb functionality that searches in the db for the given values
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            //incase it doesnt exist prompt the user that it doesn't exist
            return res.status(422).json({error:"Invalid Email or password"})
       }
       //We decrypt the password to know wether it is indeed the same as the one saved or not
        bcrypt.compare(password,savedUser.password)
        .then(match=>{
            if(match)
            {
                //using the json token in auth
                const token=jwt.sign({_id:savedUser._id},"12345")
                res.json({token:token})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
})

router.get('/protected',login,(req,res)=>{
    res.send("hello");
});

module.exports=router
