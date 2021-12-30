const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;
const User = require("./models/userModel");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGODB;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(port, () => {
      console.log("Listening to port " + port + "...");
      console.log("MongoDB is now connected");
    });
  });

app.get("/login2/:email", (req, res) => {
  const email = req.params.email;
  const token = jwt.sign({ email }, "dahrawy", { expiresIn: "5m" });
  res.send(token);
});

app.get("/who/:token", (req, res) => {
  const token = req.params.token;
  try {
    const userEmail = jwt.verify(token, "dahrawy");
    res.send(userEmail.email);
  } catch (error) {
    res.send("expired");
  }
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
        return res.send({ message: "Invalid Email" });
      } else if (result.admin == true) {
        if (result.password == password) {
          res.send({ message: "Success Admin" });
        } else {
          res.send({ message: "Invalid Password" });
        }
      } else {
        if (bcrypt.compareSync(password, result.password)) {
          const token = jwt.sign({ email }, "dahrawy", { expiresIn: "5m" });
          res.send({ message: "Success User", token: token });
        } else {
          res.send({ message: "Invalid Password" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/register", async (req, res) => {
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
  var encryptedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: encryptedPassword,
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
