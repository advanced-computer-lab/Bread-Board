// External variables
const express = require("express");
const mongoose = require('mongoose');
//const { getMaxListeners } = require("./models/User");
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
//const MongoURI = 'mongodb+srv://alaa:1234@cluster0.6ulyk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ;
const flightRouter = require("./routes/FlightRoutes");
const userRouter = require("./routes/UserRoutes");
const cors = require("cors");



//App variables
const app = express();
const port = 3000;
const User = require('./models/userModel');

app.use(cors());
app.use(express.json());

// #Importing the userController


// configurations
// Mongo DB
app.listen(port,()=>{
    mongoose.connect("mongodb+srv://admin:admin123@cluster0.ghf1n.mongodb.net/Project?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result =>console.log("MongoDB is now connected") )
    .catch(err => console.log(err));
    console.log(`server is running on port ${port}`)
})


/*
                                                    Start of your code
*/
app.get("/Home", (req, res) => {
    res.status(200).send("Welcome to BreadBoard!");
});

app.post('/login',(req,res)=>{
    var {email,password}=req.body
    if(!email || !password )
    {
        return res.status(422).send("Please add all fields")
    }
    User.findOne({email:email})
    .then(result=>{
        if (result == null) {
            return res.status(422).send("Invalid Email")
        }
        else {
            if (result.password == password) {
                if (result.admin == true) {
                    res.redirect('/users');
                }
                else {
                    res.send("You are not an admin");
                }
            }
            else
            return res.status(422).send("Invalid Password")
        }
    })
    .catch(err => {
        console.log(err);
    })
})

app.use('/users',userRouter);

// app.post('/try',(req,res) => {
//     var em = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         admin: req.body.admin
//     })
//     em.save().then(result => res.send(result));
// })
