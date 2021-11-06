import '../App.css';
import { Component, useState,useEffect } from 'react';
import axios from 'axios';

function SearchFlight() {

    const [flights, setFlights] = useState([]);
  
    useEffect(async () => {
      const result = await axios.get("http://localhost:8000/admin/searchFlight");
      setFlights(result.data);
      console.log(result.data);
    },[]);
    
    return (
      <div className="">
        <div className="content">
            <h1>Flights</h1>
  
            <br/>
            
            {flights.map(item => (
              <div className="row">
                <p className="left-txt"> <b>Flight Number: {item.flightNumber}</b> </p>
                <p className="left-txt"> <b>Departure Time: {item.departureTime}</b> </p>
                <p className="left-txt"> <b>Arrival Time: {item.arrivalTime}</b> </p>
                <p className="left-txt"> <b>Number Of Economy Seats: {item.numberofEconomySeats}</b> </p>
                <p className="left-txt"> <b>Arrival Date: {item.arrivalDate}</b> </p>
                <p className="left-txt"> <b>Departure Date: {item.departureDate}</b> </p>
                <p className="left-txt"> <b>Number Of Business Seats: {item.numberofBusinessSeats}</b> </p>
                <p className="left-txt"> <b>Airport: {item.airport}</b> </p>
            </div>
            ))}
            {/* <button type="button">Update</button>
            <button type="button">Delete</button> */}

              
  
            
        </div>
      </div>
  
    );
  }

export default SearchFlight;