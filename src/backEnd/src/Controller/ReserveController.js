const Reserve = require("../models/reserveModel");

exports.createReserve = async (req, res) => {
  new Reserve({ ...req.body })
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

exports.getFlightReserved = async (req, res) => {
  const { flight } = req.params;
  const departures = await Reserve.find({
    departureFlight: flight,
    status: "Active",
  }).exec();
  const returns = await Reserve.find({
    returnFlight: flight,
    status: "Active",
  }).exec();
  res.send([...departures, ...returns]);
};

exports.getUserFlights = async (req, res) => {
  res.send(
    await Reserve.find({ user: req.params.user, status: "Active" }).exec()
  );
};

exports.cancelUserFlight = async (req, res) => {
  const reserve = await Reserve.findByIdAndUpdate(req.params.reserve);
  reserve.status = "Canceled";
  await reserve.save();
  this.sendEmail(reserve.user, reserve.price)
  res.send(reserve);
};
const nodemailer = require("nodemailer");

exports.sendEmail = async (email, refund) => {
  // let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'dinahatem2011@hotmail.com', // generated ethereal user
      pass: '1h2e3a4d5a', // generated ethereal password
    },
  });
  // console.log(testAccount.email)
  let info = await transporter.sendMail({
    from: '"Dina 👻" dinahatem2011@hotmail.com',  // sender address
    to: email, // list of receivers
    subject: "Flight Canceled", // Subject line
    text: "Your flight has been canceled with refund amount of " + refund, // plain text body
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
