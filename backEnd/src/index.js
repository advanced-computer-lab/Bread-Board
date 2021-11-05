// External variables
const express = require("express");
const mongoose = require('mongoose');
//const { getMaxListeners } = require("./models/User");
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
//const MongoURI = 'mongodb+srv://alaa:1234@cluster0.6ulyk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ;
const flightsRepo = require("./repos/flightsRepo");
const userRepo = require("./repos/userRepo");

app.use(cors());
app.use(express.json());

//App variables
const app = express();
const port = process.env.PORT || 3000;
//const User = require('./models/User');

// #Importing the userController


// configurations
// Mongo DB
app.listen(port,()=>{
    mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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