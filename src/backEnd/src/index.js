// External variables
const express = require("express");
const mongoose = require("mongoose");
//const { getMaxListeners } = require("./models/User");
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
//const MongoURI = 'mongodb+srv://alaa:1234@cluster0.6ulyk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ;
const userRouter = require("./routes/UserRoutes");
const cors = require("cors");

//App variables
const app = express();
const port = 8000;
const User = require("./models/userModel");

app.use(cors());
app.use(express.json());

// #Importing the userController

// configurations
// Mongo DB
const Flight = require("./models/reserveModel");
const { sendEmail } = require("./Controller/ReserveController");

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://admin:admin123@cluster0.ghf1n.mongodb.net/Project?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((result) => console.log("MongoDB is now connected"))
    .catch((err) => console.log(err));
  console.log(`server is running on port ${port}`);
  Flight.find().then(r=>console.log(r))
  // Flight.updateMany({status:'Active'}).exec()
});

/*
                                                    Start of your code
*/
app.get("/Home", (req, res) => {
  res.status(200).send("Welcome to BreadBoard!");
});

app.post("/login", (req, res) => {
  var { email, password } = req.body;
  User.findOne({ email: email })
    .then((result) => {
      if (result == null) {
        return res.send("Invalid Email");
      } else {
        if (result.password == password) {
          if (result.admin == true) {
            res.send("Success Admin");
          } else {
            res.send("Success User");
          }
        } else {
          return res.send("Invalid Password");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/register", (req, res) => {
  var { firstName, lastName, email, password, passportNumber, admin } =
    req.body;
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    admin: admin,
    passportNumber: passportNumber,
  });
  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.use("/admin", userRouter);
