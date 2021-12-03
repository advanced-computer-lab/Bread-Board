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

module.exports = {
  home,
  updateInfo,
};
