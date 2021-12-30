const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const home = (req, res) => {
  res.send("Hello world");
  res.end();
};

const updateInfo = (req, res) => {
  User.updateOne({ email: req.body.emailOld }, req.body)
    .then((result) => {
      res.send("Success");
    })
    .catch((err) => {
      res.send("Error");
    });
};

const updatePassword = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (bcrypt.compareSync(req.body.oldPassword, result.password)) {
        var encryptedPassword = bcrypt.hashSync(req.body.password, 10);
        User.updateOne(
          { email: req.body.email },
          { password: encryptedPassword }
        )
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            res.send("Error");
          });
      } else {
        res.send("Wrong Password");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

const getUser = (req, res) => {
  User.findOne(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
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
  const email = req.body.email;
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
  res.send("Email sent Successfully!!!");
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
