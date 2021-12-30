const Reserve = require("../models/reserveModel");
const jwt = require("jsonwebtoken");

const createReserve = async (req, res) => {
  const tokenEmail = req.body.user;
  try {
    const userEmail = jwt.verify(tokenEmail, "dahrawy");
    const reserve = new Reserve({
      user: userEmail.email,
      departureFlight: req.body.departureFlight,
      returnFlight: req.body.returnFlight,
      cabin: req.body.cabin,
      departureSeats: req.body.departureSeats,
      returnSeats: req.body.returnSeats,
      price: req.body.price,
      departurePrice: req.body.departurePrice,
      returnPrice: req.body.returnPrice,
    });
    await reserve
      .save()
      .then((result) => res.send({ message: "Success", reserve: result }))
      .catch((err) => res.send({ message: "Error" }));
  } catch (error) {
    res.send({ message: "Your Session Expired" });
  }
};

const getFlightReserved = async (req, res) => {
  const { flight, cabin } = req.params;
  const departures = await Reserve.find({
    departureFlight: flight,
    cabin: cabin,
    status: "Active",
  }).exec();
  const returns = await Reserve.find({
    returnFlight: flight,
    cabin: cabin,
    status: "Active",
  }).exec();
  res.send([...departures, ...returns]);
};

const getUserFlights = async (req, res) => {
  const tokenEmail = req.body.user;
  try {
    const userEmail = jwt.verify(tokenEmail, "dahrawy");
    Reserve.find({ user: userEmail.email, status: "Active" })
      .then((result) => {
        res.send({ message: "Success", reserve: result });
      })
      .catch((err) => {
        res.send({ message: "Error" });
      });
  } catch (error) {
    res.send({ message: "Your Session Expired" });
  }
};

const cancelUserFlight = async (req, res) => {
  const reserve = await Reserve.findByIdAndUpdate(req.params.reserve);
  reserve.status = "Canceled";
  await reserve.save();
  this.sendEmail(reserve.user, reserve.price);
  res.send(reserve);
};

const emailmeUserFlight = async (req, res) => {
  const reserve = await Reserve.findById(req.params.reserve);
  this.senddEmail(
    reserve.user,
    reserve.departureFlight,
    reserve.returnFlight,
    reserve.cabin,
    reserve.departureSeats,
    reserve.returnSeats,
    reserve.price
  );
  res.send(reserve);
};

const nodemailer = require("nodemailer");

exports.senddEmail = async (
  email,
  departureFlight,
  returnFlight,
  cabin,
  departureSeats,
  returnSeats,
  price
) => {
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
    subject: "Your Reservation",
    text:
      "Your itinerary details:-" +
      "\n" +
      "Your departure flight Number is: " +
      departureFlight +
      "\n" +
      "Your return flight Number is: " +
      returnFlight +
      "\n" +
      "Your cabin is: " +
      cabin +
      " Class\n" +
      "Your depature seat numbers: " +
      departureSeats.join(" - ") +
      "\n" +
      "Your return seat numbers: " +
      returnSeats.join(" - ") +
      "\n" +
      "Your flight price is: " +
      price +
      " EGP\n" +
      "Yours," +
      "\n" +
      " Jets R Us",
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

exports.sendEmail = async (email, refund) => {
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
    subject: "Flight Canceled",
    text:
      "Your flight has been canceled with refund amount of " + refund + " EGP",
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

const updateReservations = async (req, res) => {
  const tokenEmail = req.body.emailOld;
  try {
    const userEmail = jwt.verify(tokenEmail, "dahrawy");
    Reserve.updateMany({ user: userEmail.email }, { user: req.body.email })
      .then((result) => {
        res.send({ message: "Success" });
      })
      .catch((err) => {
        res.send({ message: "Error" });
      });
  } catch (error) {
    res.send({ message: "Your Session Expired" });
  }
};

const updateReserveSeats = async (req, res) => {
  Reserve.updateOne({ _id: req.body._id }, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const priceOfReservation = async (req, res) => {
  Reserve.findOne({ _id: req.body._id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const updateReserveFlights = async (req, res) => {
  Reserve.updateOne({ _id: req.body._id }, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  updateReserveSeats,
  updateReservations,
  cancelUserFlight,
  getUserFlights,
  getFlightReserved,
  createReserve,
  emailmeUserFlight,
  priceOfReservation,
  updateReserveFlights,
};
