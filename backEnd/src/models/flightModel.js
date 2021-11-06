const mongoose = require ('mongoose')
const Schema = mongoose.Schema ;
const flightsSchema = new Schema({

    flightNumber:{
        type:String,
        required:true
    },
    departureTime:{
        type:String,
        required:true
    },
    arrivalTime:{
        type:String,
        required:true
    },
    numberofEconomySeats:{
        type:String,
        required:true
    },
    arrivalDate:{
        type:String,
        required:true
    },
    departureDate:{
        type:String,
        required:true
    },
    numberofBusinessSeats:{
        type:String,
        required:true
    },
    airport:{
        type:String,
        required:true
    }

})

const flights = mongoose.model('Flights', flightsSchema)
module.exports = flights 
