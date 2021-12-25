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
    departureAirport: req.body.departureAirport,
    arrivalAirport: req.body.arrivalAirport,
    baggage: req.body.baggage,
    tripDuration: req.body.tripDuration,
    price: req.body.price,
  });
  await flight
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const searchFlight = (req, res) => {
  Flight.find(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const searchFlightOne = (req, res) => {
  Flight.findOne(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
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
  Flight.updateOne({ _id: req.body._id }, req.body)
    .then((result) => {
      res.send("Success");
    })
    .catch((err) => {
      res.send("Error");
    });
};

const deleteFlight = async (req, res) => {
  const id = req.params.id;
  await Flight.findByIdAndRemove(id).exec();
  res.send("item deleted");
};

const departureFlights = (req, res) => {
  Flight.find(
    {
      departureAirport: req.body.departureAirport,
      arrivalAirport: req.body.arrivalAirport,
      departureDate: req.body.departureDate,
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  )
    .where(req.body.cabin)
    .gt(Number(req.body.children) + Number(req.body.adults) - 1);
};

const flightsChange = (req, res) => {
  Flight.find(
    {
      departureAirport: req.body.departureAirport,
      arrivalAirport: req.body.arrivalAirport,
      departureDate: req.body.departureDate,
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  )
    .where(req.body.cabin)
    .gt(Number(req.body.number) - 1);
};

const returnFlights = (req, res) => {
  Flight.find(
    {
      departureAirport: req.body.arrivalAirport,
      arrivalAirport: req.body.departureAirport,
      departureDate: req.body.returnDate,
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  )
    .where(req.body.cabin)
    .gt(Number(req.body.children) + Number(req.body.adults) - 1);
};

module.exports = {
  createFlight,
  searchFlight,
  updateFlight,
  deleteFlight,
  showFlight,
  searchFlightOne,
  departureFlights,
  returnFlights,
  flightsChange,
};
