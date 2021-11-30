import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../App.css";

function SearchFlights() {
  const navigate = useNavigate();

  const [flightNumber, setFlightNumber] = useState(null);
  const [departureTime, setDepartureTime] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [economySeats, setEconomySeats] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [businessSeats, setBusinessSeats] = useState(null);
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);
  const [baggage, setBaggage] = useState(null);
  const [tripDuration, setTripDuration] = useState(null);

  const [listOfFlights, setListOfFlights] = useState([]);

  const home = () => {
    navigate(-1);
  };

  const searchFlight = () => {
    var val = {
      flightNumber: flightNumber,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      numberofEconomySeats: economySeats,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      numberofBusinessSeats: businessSeats,
      departureAirport: departureAirport,
      arrivalAirport: arrivalAirport,
      baggage: baggage,
      tripDuration: tripDuration,
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

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        searchFlight();
      }
      if (event.code === "Escape") {
        event.preventDefault();
        home();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <div>
      <div className="HeaderContainer">
        <div className="HeaderButton">
          <button onClick={home}>Back</button>
        </div>
        <div className="SearchFlight">
          <h1>Search Flights</h1>
        </div>
      </div>
      <div className="App">
        <div className="Searchinputs">
          <div className="SearchinputsSub">
            <div>
              Flight Number
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
              Trip Duration
              <input
                type="number"
                placeholder="Trip Duration"
                onChange={(event) => {
                  setTripDuration(event.target.value);
                }}
              />
            </div>
            <div>
              Economy Seats
              <input
                type="number"
                placeholder="Economy Seats"
                onChange={(event) => {
                  setEconomySeats(event.target.value);
                }}
              />
              Business Seats
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
            <div>
              Baggage
              <input
                type="number"
                placeholder="Baggage"
                onChange={(event) => {
                  setBaggage(event.target.value);
                }}
              />
              Departure Airport
              <input
                type="text"
                placeholder="Departure Airport"
                onChange={(event) => {
                  setDepartureAirport(event.target.value);
                }}
              />
              Arrival Airport
              <input
                type="text"
                placeholder="Arrival Airport"
                onChange={(event) => {
                  setArrivalAirport(event.target.value);
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
            <div className="flightSearch">
              <div className="flight">
                <h3 id="fliNumber">
                  Flight Number: <br />
                  {val.flightNumber}
                </h3>
                <h3>
                  Departure Time: <br />
                  {val.departureTime}
                </h3>
                <h3>
                  Departure Date: <br />
                  {val.departureDate}
                </h3>
                <h3>
                  Arrival Time: <br />
                  {val.arrivalTime}
                </h3>
                <h3>
                  Arrival Date: <br />
                  {val.arrivalDate}
                </h3>
                <h3>
                  Trip Duration: <br />
                  {val.tripDuration + " Hours"}
                </h3>
              </div>
              <div className="flight">
                <h3 id="fliNumber">
                  Economy Seats: <br />
                  {val.numberofEconomySeats}
                </h3>
                <h3>
                  Business Seats: <br />
                  {val.numberofBusinessSeats}
                </h3>
                <h3>
                  Departure Airport: <br />
                  {val.departureAirport}
                </h3>
                <h3>
                  Arrival Airport: <br />
                  {val.arrivalAirport}
                </h3>
                <h3>
                  Baggage Allowance: <br />
                  {val.baggage + " Bags"}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchFlights;
