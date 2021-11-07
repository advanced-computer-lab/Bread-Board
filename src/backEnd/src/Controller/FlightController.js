const Flight = require("../models/flightModel");

const createFlight = async (req, res) => {
  const flight = new Flight({
    flightNumber: req.body.flightNumber,
    departureTime: req.body.departureTime,
    arrivalTime: req.body.arrivalTime,
    numberofEconomySeats: req.body.numberofEconomySeats,
    arrivalDate: req.body.arrivalDate,
    departureDate: req.body.departureDate,
    numberofBusinessSeats: req.body.numberofBusinessSeats,
    airport: req.body.airport,
  });
  await flight.save();
  res.send("Inserted Data");
};

const searchFlight = (req, res) => {
  Flight.find().then((result) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(result, null, 4));
  });
};

const showFlight = async (req, res) => {
  Flight.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const updateFlight = (req, res) => {
  const id = req.body.id;
  const newFlightNumber = req.body.newFlightNumber;
  const newDepartureTime = req.body.newDepartureTime;
  const newArrivalTime = req.body.newArrivalTime;
  const newEconomySeats = req.body.newEconomySeats;
  const newArrivalDate = req.body.newArrivalDate;
  const newDepartureDate = req.body.newDepartureDate;
  const newBusinessSeats = req.body.newBusinessSeats;
  const newAirport = req.body.newAirport;
  try {
    Flight.findById(id, (error, flightToUpdate) => {
      flightToUpdate.flightNumber =
        newFlightNumber == null
          ? flightToUpdate.flightNumber
          : Number(newFlightNumber);
      flightToUpdate.departureTime =
        newDepartureTime == null
          ? flightToUpdate.departureTime
          : newDepartureTime;
      flightToUpdate.arrivalTime =
        newArrivalTime == null ? flightToUpdate.arrivalTime : newArrivalTime;
      flightToUpdate.numberofEconomySeats =
        newEconomySeats == null
          ? flightToUpdate.numberofEconomySeats
          : Number(newEconomySeats);
      flightToUpdate.arrivalDate =
        newArrivalDate == null ? flightToUpdate.arrivalDate : newArrivalDate;
      flightToUpdate.departureDate =
        newDepartureDate == null
          ? flightToUpdate.departureDate
          : newDepartureDate;
      flightToUpdate.numberofBusinessSeats =
        newBusinessSeats == null
          ? flightToUpdate.numberofBusinessSeats
          : Number(newBusinessSeats);
      flightToUpdate.airport =
        newAirport == null ? flightToUpdate.airport : newAirport;
      flightToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }
  res.send("updated");
};

const deleteFlight = async (req, res) => {
  const id = req.params.id;
  await Flight.findByIdAndRemove(id).exec();
  res.send("item deleted");
};

module.exports = {
  createFlight,
  searchFlight,
  updateFlight,
  deleteFlight,
  showFlight,
};
