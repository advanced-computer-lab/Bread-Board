import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../App.css";

function SearchFlights() {
  const navigate = useNavigate();

  const [children, setChildren] = useState(null);
  const [adults, setAdults] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [cabin, setCabin] = useState(null);

  const [listOfFlights, setListOfFlights] = useState([]);

  const home = () => {
    navigate(-1);
  };

  const searchFlight = () => {
    var val = {
      children: children,
      adults: adults,
      cabin: cabin,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
    };
    Object.keys(val).forEach(
      (k) => !val[k] && val[k] !== undefined && delete val[k]
    );
    axios
      .post("http://localhost:8000/admin/searchForFlights", val)
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
        <div className="Newinputs">
          <div>
            <div>
              Number Of Children
              <input
                type="number"
                placeholder="Number Of Children"
                onChange={(event) => {
                  setChildren(event.target.value);
                }}
              />
              Number Of Adults
              <input
                type="number"
                placeholder="Number Of Adults"
                onChange={(event) => {
                  setAdults(event.target.value);
                }}
              />
            </div>
            <div>
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
              Cabin
              <input
                type="text"
                placeholder="Cabin"
                onChange={(event) => {
                  setCabin(event.target.value);
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
                Economy Seats: <br />
                {val.numberofEconomySeats}
              </h3>
              <h3>
                Business Seats: <br />
                {val.numberofBusinessSeats}
              </h3>
              <h3>
                Airport: <br />
                {val.airport}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchFlights;
