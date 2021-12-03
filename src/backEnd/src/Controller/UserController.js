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

const getUser = (req, res) => {
  User.findOne(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

module.exports = {
  home,
  updateInfo,
  getUser,
};
