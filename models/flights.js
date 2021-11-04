const mongoose=require('mongoose');

const flightDetails=new mongoose.Schema({
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

mongoose.model("test",flightDetails);