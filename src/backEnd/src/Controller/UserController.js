const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const home = (req, res) => {
  res.send("Hello world");
  res.end();
};

const updateInfo = (req, res) => {
  const tokenEmail = req.body.emailOld;
  try {
    const userEmail = jwt.verify(tokenEmail, "dahrawy");
    User.updateOne({ email: userEmail.email }, req.body)
      .then((result) => {
        if (req.body.email != null) {
          const email = req.body.email;
          const token = jwt.sign({ email }, "dahrawy", { expiresIn: "5m" });
          res.send({ message: "Success", token: token });
        } else {
          res.send({ message: "Success" });
        }
      })
      .catch((err) => {
        res.send({ message: "Error" });
      });
  } catch (error) {
    res.send({ message: "Your Session Expired" });
  }
};

const updatePassword = (req, res) => {
  const tokenEmail = req.body.email;
  try {
    const userEmail = jwt.verify(tokenEmail, "dahrawy");
    User.findOne({ email: userEmail.email })
      .then((result) => {
        if (bcrypt.compareSync(req.body.oldPassword, result.password)) {
          var encryptedPassword = bcrypt.hashSync(req.body.password, 10);
          User.updateOne(
            { email: userEmail.email },
            { password: encryptedPassword }
          )
            .then((result) => {
              res.send({ message: "Success" });
            })
            .catch((err) => {
              res.send({ message: "Error" });
            });
        } else {
          res.send({ message: "Wrong Password" });
        }
      })
      .catch((err) => {
        res.send({ message: "Error" });
      });
  } catch (error) {
    res.send({ message: "Your Session Expired" });
  }
};

const getUser = (req, res) => {
  const tokenEmail = req.body.email;
  try {
    const userEmail = jwt.verify(tokenEmail, "dahrawy");
    User.findOne({ email: userEmail.email }, (err, result) => {
      if (err) {
        res.send({ message: "Error" });
      } else {
        res.send({ message: "Success", user: result });
      }
    });
  } catch (error) {
    res.send({ message: "Your Session Expired" });
  }
};

const forgotPassword = async (req, res) => {
  User.findOne(req.body)
    .then((result) => {
      if (result != null) {
        var password = "password123";
        var encryptedPassword = bcrypt.hashSync(password, 10);
        User.updateOne(
          { email: req.body.email, userName: req.body.userName },
          { password: encryptedPassword }
        )
          .then((result) => {
            res.send("Password Changed");
          })
          .catch((err) => {
            res.send("Error");
          });
      } else {
        res.send("Email or Username are incorrect");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let transporter = nodemailer.createTransport({
    host: "smtp.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "dinahatem2011@hotmail.com",
      pass: "1h2e3a4d5a",
    },
  });
  let info = await transporter.sendMail({
    from: '"Dina 👻" dinahatem2011@hotmail.com',
    to: email,
    subject: "Forgot password",
    text:
      "Your password has been changed. Your new password is " +
      password +
      ", you can change it from your profile.",
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.send("Email sent Successfully!!!");
};

const sendEmailRefund = async (req, res) => {
  const tokenEmail = req.body.email;
  try {
    const userEmail = jwt.verify(tokenEmail, "dahrawy");
    const email = userEmail.email;
    const amount = req.body.amount;
    let transporter = nodemailer.createTransport({
      host: "smtp.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: "dinahatem2011@hotmail.com",
        pass: "1h2e3a4d5a",
      },
    });
    let info = await transporter.sendMail({
      from: '"Dina 👻" dinahatem2011@hotmail.com',
      to: email,
      subject: "Refund",
      text: "The amount: " + amount + " EGP was refunded to your account.",
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.send({ message: "Email sent Successfully!!!" });
  } catch (error) {
    res.send({ message: "Your Session Expired" });
  }
};

module.exports = {
  home,
  updateInfo,
  getUser,
  updatePassword,
  sendEmail,
  forgotPassword,
  sendEmailRefund,
};
