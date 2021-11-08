const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const flightsSchema = new Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  numberofEconomySeats: {
    type: Number,
    required: true,
  },
  arrivalDate: {
    type: String,
    format: Date,
    required: true,
  },
  departureDate: {
    type: String,
    format: Date,
    required: true,
  },
  numberofBusinessSeats: {
    type: Number,
    required: true,
  },
  airport: {
    type: String,
    required: true,
  },
});

const flights = mongoose.model("flights", flightsSchema);
module.exports = flights;
