const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const flightsSchema = new Schema({
  flightNumber: {
    type: Number,
    required: true,
    unique: true,
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
  departureAirport: {
    type: String,
    required: true,
  },
  arrivalAirport: {
    type: String,
    required: true,
  },
  baggage: {
    type: Number,
    required: true,
  },
  tripDuration: {
    type: Number,
    required: true,
  },
});

flightsSchema.plugin(uniqueValidator, {
  message: "Flight number already exists",
});
const flights = mongoose.model("flights", flightsSchema);
module.exports = flights;
