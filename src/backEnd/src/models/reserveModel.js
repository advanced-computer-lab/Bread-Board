const mongoose = require("mongoose");
const reserveSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  departureFlight: {
    type: Number,
    required: true,
  },
  returnFlight: {
    type: Number,
    required: true,
  },
  cabin: {
    type: String, //Economy or Business
    required: true,
  },
  departureSeats: {
    type: [Number],
    required: true,
  },
  returnSeats: {
    type: [Number],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Active'
  }
});
module.exports = mongoose.model("reserves", reserveSchema);
