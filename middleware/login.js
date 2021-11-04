const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../keys');
const mongoose=require('mongoose');
const User=mongoose.model("test");

//Whole concept is that now after sign in in order to access the sign in data
//You must have the token and from there the bearer of the token can access the data
//Else you are not allowed to view the data

module.exports=(req,res,next)=>{
    console.log(req.headers)
    //Take the headers of the request
    const {authorization}=req.headers
    //
    if(!authorization)
    {
        return res.status(401).json({error:"YOU MUST LOG IN"})
    }
    const token=authorization.replace("Bearer ","")
    console.log(token)
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"YOU MUST LOG IN"})
        }
        const {_id}=payload
        User.findById(_id).then(userdata=>{
            req.user=userdata
            next()
        })

    })
}
