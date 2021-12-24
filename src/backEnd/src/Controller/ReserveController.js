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
  this.sendEmail(reserve.user, reserve.price);
  res.send(reserve);
};

exports.emailmeUserFlight = async (req, res) => {
  const reserve = await Reserve.findById(req.params.reserve);
  this.senddEmail(reserve.user, reserve.departureFlight, reserve.returnFlight,reserve.cabin,reserve.departureSeats,reserve.returnSeats,reserve.price);
  res.send(reserve);
};

const nodemailer = require("nodemailer");

exports.senddEmail = async (email, departureFlight,returnFlight,cabin, departureSeats,returnSeats,price) => {
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
  let info = await transporter.sendMail({
    from: '"Dina 👻" dinahatem2011@hotmail.com', // sender address
    to: email, // list of receivers
    subject: "Your Reservation", // Subject line
    text: "Your itinerary details"+'\n'+
     "Your departure flight Number is: " + departureFlight+'\n'+
     "Your return flight Number is: "+ returnFlight+ '\n'+
     "Your cabin is: "+cabin+'\n'+
     "Your depature seat numbers :"+ departureSeats+ '\n'+
     "Your return seat numbers :"+ returnSeats+'\n'+
     "Your flight priceis :"+price+'\n'+
     "Yours,"+ '\n'+
     " Jets R Us",
      // plain text body
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};


exports.sendEmail = async (email, refund) => {
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
    subject: "Flight Canceled", // Subject line
    text: "Your flight has been canceled with refund amount of " + refund, // plain text body
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

exports.updateReservations = async (req, res) => {
  Reserve.updateMany({ user: req.body.emailOld }, { user: req.body.email })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
