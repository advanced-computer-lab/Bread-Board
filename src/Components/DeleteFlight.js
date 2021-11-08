import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../App.css";

function DeleteFlight() {
  const navigate = useNavigate();

  const [listOfFlights, setListOfFlights] = useState([]);

  const home = () => {
    navigate(-1);
  };

  const delFlight = (id) => {
    if (window.confirm("Are you sure to delete this Flight?")) {
      axios
        .delete(`http://localhost:8000/admin/deleteFlight/${id}`)
        .then(() => {
          setListOfFlights(
            listOfFlights.filter((val) => {
              return val._id != id;
            })
          );
        });
    }
  };

  useEffect(() => {
    const listener = (event) => {
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
      <div className="HeaderContainer">
        <div className="DelHeaderButton">
          <button onClick={home}>Home</button>
        </div>
        <div className="DelFlight">
          <h1>Delete Flights</h1>
        </div>
      </div>
      <div className="listOfFlights">
        {listOfFlights.map((val) => {
          return (
            <div className="flightContainer">
              <div className="flight">
                {" "}
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
