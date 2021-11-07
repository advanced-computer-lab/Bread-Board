import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { deleteFlight } from "../backEnd/src/Controller/FlightController";

function UpdateFlight() {
  const [flightNumber, setFlightNumber] = useState(null);
  const [departureTime, setDepartureTime] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [economySeats, setEconomySeats] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [businessSeats, setBusinessSeats] = useState(null);
  const [airport, setAirport] = useState(null);

  const [listOfFlights, setListOfFlights] = useState([]);

  const updFlight = (id) => {
    axios
      .put("http://localhost:8000/admin/updateFlight", {
        id: id,
        newFlightNumber: flightNumber,
        newDepartureTime: departureTime,
        newArrivalTime: arrivalTime,
        newEconomySeats: economySeats,
        newArrivalDate: arrivalDate,
        newDepartureDate: departureDate,
        newBusinessSeats: businessSeats,
        newAirport: airport,
      })
      .then(() => {
        setListOfFlights(
          listOfFlights.map((val) => {
            return val._id == id
              ? {
                  _id: id,
                  flightNumber:
                    flightNumber == null ? val.flightNumber : flightNumber,
                  departureTime:
                    departureTime == null ? val.departureTime : departureTime,
                  arrivalTime:
                    arrivalTime == null ? val.arrivalTime : arrivalTime,
                  numberofEconomySeats:
                    economySeats == null
                      ? val.numberofEconomySeats
                      : economySeats,
                  arrivalDate:
                    arrivalDate == null ? val.arrivalDate : arrivalDate,
                  departureDate:
                    departureDate == null ? val.departureDate : departureDate,
                  numberofBusinessSeats:
                    businessSeats == null
                      ? val.numberofBusinessSeats
                      : businessSeats,
                  airport: airport == null ? val.airport : airport,
                }
              : val;
          })
        );
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/showFlight")
      .then((result) => {
        setListOfFlights(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="UpdFlight">
        <h1>Update Flights</h1>
      </div>
      <div className="App">
        <div className="inputs">
          <div>
            <input
              type="number"
              placeholder="Flight Number"
              onChange={(event) => {
                setFlightNumber(event.target.value);
              }}
            />
            Arrival Time
            <input
              type="time"
              onChange={(event) => {
                setArrivalTime(event.target.value);
              }}
            />
            Departure Time
            <input
              type="time"
              onChange={(event) => {
                setDepartureTime(event.target.value);
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
            Arrival Date
            <input
              type="date"
              onChange={(event) => {
                setArrivalDate(event.target.value);
              }}
            />
            Departure Date
            <input
              type="date"
              onChange={(event) => {
                setDepartureDate(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="listOfFlights">
        {listOfFlights.map((val) => {
          return (
            <div className="flightContainer">
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
              <button
                onClick={() => {
                  updFlight(val._id);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpdateFlight;
