import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { deleteFlight } from "../backEnd/src/Controller/FlightController";

function DeleteFlight() {
  const [listOfFlights, setListOfFlights] = useState([]);

  const delFlight = (id) => {
    axios.delete(`http://localhost:8000/admin/deleteFlight/${id}`).then(() => {
      setListOfFlights(
        listOfFlights.filter((val) => {
          return val._id != id;
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
      <div className="DelFlight">
        <h1>Delete Flights</h1>
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
                  delFlight(val._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeleteFlight;
