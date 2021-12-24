const User = require("../models/userModel");

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
  User.updateOne(
    { email: req.body.email, password: req.body.oldPassword },
    req.body
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send("Error");
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
  User.findOne(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "dinahatem2011@hotmail.com", // generated ethereal user
      pass: "1h2e3a4d5a", // generated ethereal password
    },
  });
  // console.log(testAccount.email)
  let info = await transporter.sendMail({
    from: '"Dina 👻" dinahatem2011@hotmail.com', // sender address
    to: email, // list of receivers
    subject: "Change Your Password", // Subject line
    text: "Your password is "+ password, 
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};



module.exports = {
  home,
  updateInfo,
  getUser,
  updatePassword,
  sendEmail,
  forgotPassword,
};
