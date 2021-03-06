import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../App.css";
import { Dialog } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

function CreateFlight() {
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
  const [price, setPrice] = useState(null);

  const [flightNumberU, setFlightNumberU] = useState(null);
  const [departureTimeU, setDepartureTimeU] = useState(null);
  const [arrivalTimeU, setArrivalTimeU] = useState(null);
  const [economySeatsU, setEconomySeatsU] = useState(null);
  const [arrivalDateU, setArrivalDateU] = useState(null);
  const [departureDateU, setDepartureDateU] = useState(null);
  const [businessSeatsU, setBusinessSeatsU] = useState(null);
  const [departureAirportU, setDepartureAirportU] = useState(null);
  const [arrivalAirportU, setArrivalAirportU] = useState(null);
  const [baggageU, setBaggageU] = useState(null);
  const [tripDurationU, setTripDurationU] = useState(null);
  const [priceU, setPriceU] = useState(null);

  const [listOfFlights, setListOfFlights] = useState([]);

  const [openPopupCreate, setOpenPopupCreate] = useState(false);
  const [openPopupUpdate, setOpenPopupUpdate] = useState(false);

  const [upID, setUpID] = useState(null);

  const logout = () => {
    navigate(-1);
  };

  const create = () => {
    if (
      flightNumber == null ||
      departureTime == null ||
      arrivalTime == null ||
      departureDate == null ||
      arrivalDate == null ||
      economySeats == null ||
      businessSeats == null ||
      departureAirport == null ||
      arrivalAirport == null ||
      baggage == null ||
      tripDuration == null ||
      price == null
    ) {
      alert("Please fill all fields!!!");
    } else if (flightNumber <= 0) {
      alert("Flight number must be positive!!!");
    } else if (price <= 0) {
      alert("Price number must be positive!!!");
    } else if (economySeats <= 0) {
      alert("Ecnonomy seats must be more than 0 !!!");
    } else if (businessSeats <= 0) {
      alert("Business seats number cannot be more than 0 !!!");
    } else if (baggage <= 0) {
      alert("Baggage number must be positive!!!");
    } else if (departureDate > arrivalDate) {
      alert("Departure date can't be after Arrival date!!!");
    } else if (departureDate == arrivalDate && departureTime >= arrivalTime) {
      alert("Departure time must be before Arrival time if on the same day!!!");
    } else {
      axios
        .post("http://localhost:8000/admin/createFlight", {
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
          price: price,
        })
        .then((result) => {
          if (result.data.name == "ValidationError") {
            alert("Flight number already exists!!!");
          } else {
            setOpenPopupCreate(false);
            setListOfFlights([...listOfFlights, result.data]);
            setFlightNumber(null);
            setDepartureTime(null);
            setArrivalTime(null);
            setDepartureDate(null);
            setArrivalDate(null);
            setEconomySeats(null);
            setBusinessSeats(null);
            setDepartureAirport(null);
            setArrivalAirport(null);
            setBaggage(null);
            setTripDuration(null);
            setPrice(null);
          }
        })
        .catch((err) => {});
    }
  };

  const updFlight = (id) => {
    if (window.confirm("Are you sure to update this Flight?")) {
      axios
        .post("http://localhost:8000/admin/searchFlightOne", { _id: id })
        .then((result) => {
          var val = {
            _id: id,
            flightNumber: flightNumberU,
            departureTime: departureTimeU,
            arrivalTime: arrivalTimeU,
            numberofEconomySeats: economySeatsU,
            arrivalDate: arrivalDateU,
            departureDate: departureDateU,
            numberofBusinessSeats: businessSeatsU,
            departureAirport: departureAirportU,
            arrivalAirport: arrivalAirportU,
            baggage: baggageU,
            tripDuration: tripDurationU,
            price: priceU,
          };
          Object.keys(val).forEach(
            (k) => !val[k] && val[k] !== undefined && delete val[k]
          );
          if (flightNumberU != null && flightNumberU <= 0) {
            alert("Flight number must be positive!!!");
          } else if (priceU != null && priceU <= 0) {
            alert("Price number must be positive!!!");
          } else if (economySeatsU != null && economySeatsU <= 0) {
            alert("Ecnonomy seats must be more than 0 !!!");
          } else if (businessSeatsU != null && businessSeatsU <= 0) {
            alert("Business seats number cannot be more than 0 !!!");
          } else if (baggageU != null && baggageU <= 0) {
            alert("Baggage number must be positive!!!");
          } else if (
            (departureDateU != null
              ? departureDateU
              : result.data.departureDate) >
            (arrivalDateU != null ? arrivalDateU : result.data.arrivalDate)
          ) {
            alert("Departure date can't be after Arrival date!!!");
          } else if (
            (departureDateU != null
              ? departureDateU
              : result.data.departureDate) ==
              (arrivalDateU != null ? arrivalDateU : result.data.arrivalDate) &&
            (departureTimeU != null
              ? departureTimeU
              : result.data.departureTime) >=
              (arrivalTimeU != null ? arrivalTimeU : result.data.arrivalTime)
          ) {
            alert(
              "Departure time must be before Arrival time if on the same day!!!"
            );
          } else {
            axios
              .put("http://localhost:8000/admin/updateFlight", val)
              .then((result) => {
                if (result.data == "Error") {
                  alert("Flight number already exists!!!");
                } else {
                  setOpenPopupUpdate(false);
                  setListOfFlights(
                    listOfFlights.map((val) => {
                      return val._id == id
                        ? {
                            _id: id,
                            flightNumber:
                              flightNumberU == null
                                ? val.flightNumber
                                : flightNumberU,
                            departureTime:
                              departureTimeU == null
                                ? val.departureTime
                                : departureTimeU,
                            arrivalTime:
                              arrivalTimeU == null
                                ? val.arrivalTime
                                : arrivalTimeU,
                            numberofEconomySeats:
                              economySeatsU == null
                                ? val.numberofEconomySeats
                                : economySeatsU,
                            arrivalDate:
                              arrivalDateU == null
                                ? val.arrivalDate
                                : arrivalDateU,
                            departureDate:
                              departureDateU == null
                                ? val.departureDate
                                : departureDateU,
                            numberofBusinessSeats:
                              businessSeatsU == null
                                ? val.numberofBusinessSeats
                                : businessSeatsU,
                            departureAirport:
                              departureAirportU == null
                                ? val.departureAirport
                                : departureAirportU,
                            arrivalAirport:
                              arrivalAirportU == null
                                ? val.arrivalAirport
                                : arrivalAirportU,
                            baggage: baggageU == null ? val.baggage : baggageU,
                            tripDuration:
                              tripDurationU == null
                                ? val.tripDuration
                                : tripDurationU,
                            price: priceU == null ? val.price : priceU,
                          }
                        : val;
                    })
                  );
                  setFlightNumberU(null);
                  setDepartureTimeU(null);
                  setArrivalTimeU(null);
                  setDepartureDateU(null);
                  setArrivalDateU(null);
                  setEconomySeatsU(null);
                  setBusinessSeatsU(null);
                  setDepartureAirportU(null);
                  setArrivalAirportU(null);
                  setBaggageU(null);
                  setTripDurationU(null);
                  setPrice(null);
                }
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  const searchFlight = () => {
    navigate("/admin/search");
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        if (openPopupCreate == true) {
          create();
        }
        if (openPopupUpdate == true) {
          updFlight(upID);
        }
      }
      if (event.code === "Escape") {
        event.preventDefault();
        logout();
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
        <div className="HeaderButton">
          <button onClick={logout}>Logout</button>
        </div>
        <div className="Home">
          <h1>Welcome Admin</h1>
          <h2>Manage Flights</h2>
        </div>
      </div>
      <div className="App">
        <div className="flightCRUD">
          <button onClick={searchFlight}>Search Flights</button>
          <button id="createB" onClick={() => setOpenPopupCreate(true)}>
            + Add Flight
          </button>
        </div>
      </div>
      <div className="listOfFlights">
        {listOfFlights.map((val) => {
          return (
            <div className="flightContainer">
              <div>
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
                  <h3>
                    Price: <br />
                    {val.price + " L.E"}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => {
                  setUpID(val._id);
                  setOpenPopupUpdate(true);
                }}
              >
                Update
              </button>
              <button
                id="delB"
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
      <Dialog open={openPopupCreate} maxWidth="lg">
        <DialogTitle>
          <div className="PopupHeader">
            Create Flight
            <button onClick={() => setOpenPopupCreate(false)}>Close</button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div className="Popupinputs">
            <div className="PopupinputsSub">
              <div>
                Flight Number
                <input
                  type="number"
                  placeholder="Flight Number"
                  onChange={(event) => {
                    setFlightNumber(event.target.value);
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
              <div>
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
                Price
                <input
                  type="number"
                  placeholder="Price"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </div>
            </div>
            <button onClick={create}>Create</button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openPopupUpdate} maxWidth="lg">
        <DialogTitle>
          <div className="PopupHeader">
            Update Flight
            <button onClick={() => setOpenPopupUpdate(false)}>Close</button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div className="Popupinputs">
            <div className="PopupinputsSub">
              <div>
                Flight Number
                <input
                  type="number"
                  placeholder="Flight Number"
                  onChange={(event) => {
                    setFlightNumberU(event.target.value);
                  }}
                />
                Trip Duration
                <input
                  type="number"
                  placeholder="Trip Duration"
                  onChange={(event) => {
                    setTripDurationU(event.target.value);
                  }}
                />
              </div>
              <div>
                Departure Airport
                <input
                  type="text"
                  placeholder="Departure Airport"
                  onChange={(event) => {
                    setDepartureAirportU(event.target.value);
                  }}
                />
                Arrival Airport
                <input
                  type="text"
                  placeholder="Arrival Airport"
                  onChange={(event) => {
                    setArrivalAirportU(event.target.value);
                  }}
                />
              </div>
              <div>
                Departure Time
                <input
                  type="time"
                  onChange={(event) => {
                    setDepartureTimeU(event.target.value);
                  }}
                />
                Arrival Time
                <input
                  type="time"
                  onChange={(event) => {
                    setArrivalTimeU(event.target.value);
                  }}
                />
              </div>
              <div>
                Departure Date
                <input
                  type="date"
                  onChange={(event) => {
                    setDepartureDateU(event.target.value);
                  }}
                />
                Arrival Date
                <input
                  type="date"
                  onChange={(event) => {
                    setArrivalDateU(event.target.value);
                  }}
                />
              </div>
              <div>
                Economy Seats
                <input
                  type="number"
                  placeholder="Economy Seats"
                  onChange={(event) => {
                    setEconomySeatsU(event.target.value);
                  }}
                />
                Business Seats
                <input
                  type="number"
                  placeholder="Business Seats"
                  onChange={(event) => {
                    setBusinessSeatsU(event.target.value);
                  }}
                />
              </div>
              <div>
                Baggage
                <input
                  type="number"
                  placeholder="Baggage"
                  onChange={(event) => {
                    setBaggageU(event.target.value);
                  }}
                />
                Price
                <input
                  type="number"
                  placeholder="Price"
                  onChange={(event) => {
                    setPriceU(event.target.value);
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => {
                updFlight(upID);
              }}
            >
              Update
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateFlight;
