const Flight = require('../models/flightModel');

const createFlight=(req,res)=>
{
    console.log('request came');
    console.log(req.body);
    const flight=new Flight(
        {
            flightNumber: req.body.flightNumber,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            numberofEconomySeats: req.body.numberofEconomySeats,
            arrivalDate: req.body.arrivalDate,
            departureDate: req.body.departureDate,
            numberofBusinessSeats: req.body.numberofBusinessSeats,
            airport: req.body.airport
        }
    );
    flight.save().then((result)=>{
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    }).catch((err)=>
    {
        res.status(400).send("Address is needed");
    });
};

module.exports=
{
    createFlight
}