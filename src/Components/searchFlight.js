import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function SearchFlight() {
  const [flightNumber, setFlightNumber] = useState(null);
  const [departureTime, setDepartureTime] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [economySeats, setEconomySeats] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [businessSeats, setBusinessSeats] = useState(null);
  const [airport, setAirport] = useState(null);

  const [listOfFlights, setListOfFlights] = useState([]);

  const searchFlight = () => {
    var val = {
      flightNumber: flightNumber,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      numberofEconomySeats: economySeats,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      numberofBusinessSeats: businessSeats,
      airport: airport,
    };
    Object.keys(val).forEach(
      (k) => !val[k] && val[k] !== undefined && delete val[k]
    );
    axios
      .post("http://localhost:8000/admin/searchFlight", val)
      .then((result) => {
        setListOfFlights(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="SearchFlight">
        <h1>Search Flights</h1>
      </div>
      <div className="App">
        <div className="Searchinputs">
          <div>
            <div>
              <input
                type="number"
                placeholder="Flight Number"
                onChange={(event) => {
                  setFlightNumber(event.target.value);
                }}
              />
              Departure Time
              <input
                type="time"
                onChange={(event) => {
                  setDepartureTime(event.target.value);
                }}
              />
              Arrival Time
              <input
                type="time"
                onChange={(event) => {
                  setArrivalTime(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Airport"
                onChange={(event) => {
                  setAirport(event.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Economy Seats"
                onChange={(event) => {
                  setEconomySeats(event.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Business Seats"
                onChange={(event) => {
                  setBusinessSeats(event.target.value);
                }}
              />
              Departure Date
              <input
                type="date"
                onChange={(event) => {
                  setDepartureDate(event.target.value);
                }}
              />
              Arrival Date
              <input
                type="date"
                onChange={(event) => {
                  setArrivalDate(event.target.value);
                }}
              />
            </div>
          </div>
          <button onClick={searchFlight}>Submit</button>
        </div>
      </div>
      <div className="listOfFlights">
        {listOfFlights.map((val) => {
          return (
            <div className="flight">
              {" "}
              <h3>Flight Number: {val.flightNumber}</h3>
              <h3>Departure Time: {val.departureTime}</h3>{" "}
              <h3>Arrival Time: {val.arrivalTime}</h3>
              <h3>Economy Seats: {val.numberofEconomySeats}</h3>{" "}
              <h3>Arrival Date: {val.arrivalDate}</h3>
              <h3>Departure Date: {val.departureDate}</h3>
              <h3>Business Seats: {val.numberofBusinessSeats}</h3>{" "}
              <h3>Airport: {val.airport}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchFlight;
