const User = require('../models/userModel');


const home=(req,res)=>
{
    res.send('Hello world');
    res.end();
};

module.exports=
{
    home
}