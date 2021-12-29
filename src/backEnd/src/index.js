const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");

const app = express();
const port = 8000;
const User = require("./models/userModel");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

const dbURI = "mongodb+srv://admin:admin123@cluster0.ghf1n.mongodb.net/Project?retryWrites=true&w=majority"


mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
    app.listen(port, () => console.log("MongoDB is now connected"))
})

app.get("/login2/:email/:password", (req, res) => {
  const user = { email: req.params.email, pass: req.params.password };

  const token = jwt.sign(user, "mohamed", { expiresIn: "15s" });
  res.send(token);
});

app.get("/who/:token", (req, res) => {
  const token = req.params.token;

  const userEmail = jwt.verify(token, "mohamed");
  res.send(userEmail);
});
app.get("/Home", (req, res) => {
  res.status(200).send("Welcome to BreadBoard!");
});

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EGP",
      description: "Jets R Us",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
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
  var {
    firstName,
    lastName,
    email,
    password,
    passportNumber,
    admin,
    homeAddress,
    countryCode,
    telephoneNumber,
    secondTelephoneNumber,
    userName,
  } = req.body;
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    admin: admin,
    passportNumber: passportNumber,
    homeAddress: homeAddress,
    countryCode: countryCode,
    telephoneNumber: telephoneNumber,
    secondTelephoneNumber: secondTelephoneNumber,
    userName: userName,
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