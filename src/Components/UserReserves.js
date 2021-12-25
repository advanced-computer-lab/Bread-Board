import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../constants";
import { Button, Dialog } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Seats from "./Seats";

function UserReserves() {
  const navigate = useNavigate();

  const [flights, setFlights] = useState(null);
  const [openPopupDep, setOpenPopupDep] = useState(false);
  const [openPopupRet, setOpenPopupRet] = useState(false);
  const [resID, setResID] = useState(null);

  const [listOfFlights, setListOfFlights] = useState([]);
  const [flightID, setFlightID] = useState(null);

  const [depFlightNumber, setDepFlightNumber] = useState(null);
  const [depDepartureTime, setDepDepartureTime] = useState(null);
  const [depArrivalTime, setDepArrivalTime] = useState(null);
  const [depEconomySeats, setDepEconomySeats] = useState(null);
  const [depArrivalDate, setDepArrivalDate] = useState(null);
  const [depDepartureDate, setDepDepartureDate] = useState(null);
  const [depDepartureAirport, setDepDepartureAirport] = useState(null);
  const [depArrivalAirport, setDepArrivalAirport] = useState(null);
  const [depBaggage, setDepBaggage] = useState(null);
  const [depTripDuration, setDepTripDuration] = useState(null);
  const [depPrice, setDepPrice] = useState(null);
  const [depBusinessSeats, setDepBusinessSeats] = useState(null);

  const [arrFlightNumber, setArrFlightNumber] = useState(null);
  const [arrDepartureTime, setArrDepartureTime] = useState(null);
  const [arrArrivalTime, setArrArrivalTime] = useState(null);
  const [arrEconomySeats, setArrEconomySeats] = useState(null);
  const [arrArrivalDate, setArrArrivalDate] = useState(null);
  const [arrDepartureDate, setArrDepartureDate] = useState(null);
  const [arrDepartureAirport, setArrDepartureAirport] = useState(null);
  const [arrArrivalAirport, setArrArrivalAirport] = useState(null);
  const [arrBaggage, setArrBaggage] = useState(null);
  const [arrTripDuration, setArrTripDuration] = useState(null);
  const [arrPrice, setArrPrice] = useState(null);
  const [arrBusinessSeats, setArrBusinessSeats] = useState(null);

  const [newFlightNumber, setNewFlightNumber] = useState(null);
  const [newEconomySeats, setNewEconomySeats] = useState(null);
  const [newBusinessSeats, setNewBusinessSeats] = useState(null);
  const [newPrice, setNewPrice] = useState(null);
  const [newTotalPrice, setNewTotalPrice] = useState(null);

  const [openPopupSeats, setOpenPopupSeats] = useState(false);
  const [openPopupFlight, setOpenPopupFlight] = useState(false);
  const [openPopupMore, setOpenPopupMore] = useState(false);

  const [seatNo, setSeatNo] = useState(null);
  const [cabin, setCabin] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedPrice, setConfirmedPrice] = useState(false);
  const [step, setStep] = useState(0);
  const [depSeats, setDepSeats] = useState([]);
  const [retSeats, setRetSeats] = useState([]);
  const [reserveId, setReserveId] = useState(null);

  const user = window.localStorage.getItem("user");

  const departureFlight = (id) => {
    var val = {
      flightNumber: id,
    };
    axios
      .post("http://localhost:8000/admin/searchFlightOne", val)
      .then((result) => {
        setDepFlightNumber(result.data.flightNumber);
        setDepDepartureTime(result.data.departureTime);
        setDepArrivalTime(result.data.arrivalTime);
        setDepArrivalDate(result.data.arrivalDate);
        setDepDepartureDate(result.data.departureDate);
        setDepDepartureAirport(result.data.departureAirport);
        setDepArrivalAirport(result.data.arrivalAirport);
        setDepBaggage(result.data.baggage);
        setDepTripDuration(result.data.tripDuration);
        setDepPrice(result.data.price);
        setDepEconomySeats(result.data.numberofEconomySeats);
        setDepBusinessSeats(result.data.numberofBusinessSeats);

        setOpenPopupDep(true);
      });
  };

  const returnFlight = (id) => {
    var val = {
      flightNumber: id,
    };
    axios
      .post("http://localhost:8000/admin/searchFlightOne", val)
      .then((result) => {
        setArrFlightNumber(result.data.flightNumber);
        setArrDepartureTime(result.data.departureTime);
        setArrArrivalTime(result.data.arrivalTime);
        setArrArrivalDate(result.data.arrivalDate);
        setArrDepartureDate(result.data.departureDate);
        setArrDepartureAirport(result.data.departureAirport);
        setArrArrivalAirport(result.data.arrivalAirport);
        setArrBaggage(result.data.baggage);
        setArrTripDuration(result.data.tripDuration);
        setArrPrice(result.data.price);
        setArrEconomySeats(result.data.numberofEconomySeats);
        setArrBusinessSeats(result.data.numberofBusinessSeats);

        setOpenPopupRet(true);
      });
  };

  const fetch = (user) => {
    axios
      .get(API_URL + "/userReserve/" + user)
      .then(({ data }) => setFlights(data))
      .catch((err) => alert(err));
  };

  const home = () => {
    navigate(-1);
  };

  const cancel = (id) => {
    if (window.confirm("Are you sure you will cancel this flight?")) {
      axios
        .put(API_URL + "/cancelUserReserve/" + id)
        .then((res) => {
          alert(
            res.data.status === "Canceled"
              ? "Canceled Successfully"
              : "Error Occurred"
          );
          fetch(user);
        })
        .catch((err) => alert(err));
    }
  };

  const emailme = (id) => {
    if (
      window.confirm(
        "Are you sure you want to receive an email about this reservation?"
      )
    ) {
      axios
        .post(API_URL + "/emailmeUserReserve/" + id)
        .then((res) => {
          fetch(user);
        })
        .catch((err) => alert(err));
    }
  };

  const searchFlight = () => {
    var val = {
      departureAirport: step === 0 ? depDepartureAirport : arrDepartureAirport,
      arrivalAirport: step === 0 ? depArrivalAirport : arrArrivalAirport,
      departureDate: step === 0 ? depDepartureDate : arrDepartureDate,
      cabin:
        cabin === "Economy" ? "numberofEconomySeats" : "numberofBusinessSeats",
      number: seatNo.length,
    };
    axios
      .post("http://localhost:8000/admin/flightsChange", val)
      .then((result) => {
        if (result.data.length == 1) {
          alert("There are no other flights in the same date!!");
        } else {
          setListOfFlights(
            result.data.filter((val) => {
              return (
                val.flightNumber !=
                (step === 0 ? depFlightNumber : arrFlightNumber)
              );
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const chooseFlight = (val) => {
    if (window.confirm("Are you sure you want to change flights?")) {
      setNewFlightNumber(val.flightNumber);
      setNewEconomySeats(val.numberofEconomySeats);
      setNewBusinessSeats(val.numberofBusinessSeats);
      setNewPrice(val.price);

      axios
        .post("http://localhost:8000/admin/priceOfReservation", { _id: resID })
        .then((result) => {
          var priceTotal = result.data.price;
          var priceDifference =
            priceTotal - (step === 0 ? depPrice : arrPrice) * seatNo.length;
          priceDifference = priceDifference + val.price * seatNo.length;
          setNewTotalPrice(priceDifference);
          if (
            window.confirm(
              "The new price would be " +
                priceDifference +
                ". Would you like to continue with a difference of " +
                (priceDifference - priceTotal)
            )
          ) {
            setConfirmed(true);
          }
        });

      setConfirmedPrice(true);
    }
  };

  useEffect(() => {
    fetch(user);
  }, [user]);

  if (!flights) return <div>Loading...</div>;

  return (
    <div>
      <div className="HeaderContainer">
        <div className="HeaderButton">
          <button onClick={home}>Back</button>
        </div>
        <div className="SearchFlight">
          <h1>Reservations</h1>
        </div>
      </div>
      <div className="listOfFlights">
        {flights.map((val) => (
          <div className="flightContainerRes">
            <div className="flightResPrice">
              <h3>
                Total Price: <br />
                {val.price + " L.E"}
              </h3>
            </div>
            <div>
              <div className="Res">
                <div className="flightRess">
                  <h3>
                    Departure Flight: <br />
                    {val.departureFlight}
                  </h3>
                  <h3>
                    Cabin: <br />
                    {val.cabin}
                  </h3>
                  <h3>
                    Departure Seats: <br />
                    {val.departureSeats.join(" - ")}
                  </h3>
                  <h3>
                    Departure Price: <br />
                    {val.departurePrice + " L.E"}
                  </h3>
                </div>
                <div className="flightResEmpty"></div>
                <button
                  id="chooseB"
                  onClick={() => {
                    setResID(val._id);
                    setStep(0);
                    setCabin(val.cabin);
                    setSeatNo(val.departureSeats);
                    departureFlight(val.departureFlight);
                  }}
                >
                  Choose
                </button>
              </div>
              <div className="Res">
                <div className="flightRess">
                  <h3>
                    Return Flight: <br />
                    {val.returnFlight}
                  </h3>
                  <h3>
                    Cabin: <br />
                    {val.cabin}
                  </h3>
                  <h3>
                    Return Seats: <br />
                    {val.returnSeats.join(" - ")}
                  </h3>
                  <h3>
                    Return Price: <br />
                    {val.returnPrice + " L.E"}
                  </h3>
                </div>
                <div className="flightResEmpty"></div>
                <button
                  id="chooseB"
                  onClick={() => {
                    setResID(val._id);
                    setStep(1);
                    setCabin(val.cabin);
                    setSeatNo(val.returnSeats);
                    returnFlight(val.returnFlight);
                  }}
                >
                  Choose
                </button>
              </div>
            </div>
            <div className="reservesButtons">
              <button
                onClick={() => {
                  cancel(val._id);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  emailme(val._id);
                }}
              >
                Email Me
              </button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={openPopupDep} maxWidth="lg">
        <DialogTitle>
          <div className="PopupHeaderRes">
            Departure Flight Info
            <button onClick={() => setOpenPopupDep(false)}>Close</button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div className="PopupResinputs">
            {flights.map((val) => {
              if (val._id == resID) {
                return (
                  <div>
                    <div className="flightPopup">
                      <h3>
                        Departure Flight: <br />
                        {val.departureFlight}
                      </h3>
                      <h3>
                        Cabin: <br />
                        {val.cabin}
                      </h3>
                      <h3>
                        Departure Seats: <br />
                        {val.departureSeats.join(" - ")}
                      </h3>
                      <h3>
                        Departure Airport: <br />
                        {depDepartureAirport}
                      </h3>
                      <h3>
                        Arrival Airport: <br />
                        {depArrivalAirport}
                      </h3>
                      <h3>
                        Trip Duration: <br />
                        {depTripDuration + " Hours"}
                      </h3>
                    </div>
                    <div className="flightPopup">
                      <h3>
                        Departure Date: <br />
                        {depDepartureDate}
                      </h3>
                      <h3>
                        Arrival Date: <br />
                        {depArrivalDate}
                      </h3>
                      <h3>
                        Departure Time: <br />
                        {depDepartureTime}
                      </h3>
                      <h3>
                        Arrival Time: <br />
                        {depArrivalTime}
                      </h3>
                      <h3>
                        Baggage: <br />
                        {depBaggage + " Bags"}
                      </h3>
                      <h3>
                        Price: <br />
                        {depPrice + " L.E"}
                      </h3>
                    </div>
                  </div>
                );
              }
            })}
            <div>
              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to change seats?")
                  ) {
                    setConfirmed(true);
                    setOpenPopupSeats(true);
                  }
                }}
              >
                Edit Seats
              </button>
              <button
                onClick={() => {
                  searchFlight();
                  setOpenPopupFlight(true);
                }}
              >
                Change Flight
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openPopupRet} maxWidth="lg">
        <DialogTitle>
          <div className="PopupHeaderRes">
            Return Flight Info
            <button onClick={() => setOpenPopupRet(false)}>Close</button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div className="PopupResinputs">
            {flights.map((val) => {
              if (val._id == resID) {
                return (
                  <div>
                    <div className="flightPopup">
                      <h3>
                        Return Flight: <br />
                        {val.returnFlight}
                      </h3>
                      <h3>
                        Cabin: <br />
                        {val.cabin}
                      </h3>
                      <h3>
                        Return Seats: <br />
                        {val.returnSeats.join(" - ")}
                      </h3>
                      <h3>
                        Departure Airport: <br />
                        {arrDepartureAirport}
                      </h3>
                      <h3>
                        Arrival Airport: <br />
                        {arrArrivalAirport}
                      </h3>
                      <h3>
                        Trip Duration: <br />
                        {arrTripDuration + " Hours"}
                      </h3>
                    </div>
                    <div className="flightPopup">
                      <h3>
                        Departure Date: <br />
                        {arrDepartureDate}
                      </h3>
                      <h3>
                        Arrival Date: <br />
                        {arrArrivalDate}
                      </h3>
                      <h3>
                        Departure Time: <br />
                        {arrDepartureTime}
                      </h3>
                      <h3>
                        Arrival Time: <br />
                        {arrArrivalTime}
                      </h3>
                      <h3>
                        Baggage: <br />
                        {arrBaggage + " Bags"}
                      </h3>
                      <h3>
                        Price: <br />
                        {arrPrice + " L.E"}
                      </h3>
                    </div>
                  </div>
                );
              }
            })}
            <div>
              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to change seats?")
                  ) {
                    setConfirmed(true);
                    setOpenPopupSeats(true);
                  }
                }}
              >
                Edit Seats
              </button>
              <button
                onClick={() => {
                  searchFlight();
                  setOpenPopupFlight(true);
                }}
              >
                Change Flight
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openPopupSeats} maxWidth="lg">
        <DialogTitle>
          <div className="PopupHeaderRes">
            Change Seats
            <button
              onClick={() => {
                setOpenPopupSeats(false);
                setConfirmed(false);
              }}
            >
              Close
            </button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          {confirmed && (
            <>
              <div style={{ textAlign: "center" }}>
                Please Choose {step === 0 ? "Departure" : "Return"} Flight Seats{" "}
              </div>
              <Seats
                flight={{
                  id: step === 0 ? depFlightNumber : arrFlightNumber,
                  seats:
                    step === 0
                      ? cabin === "Economy"
                        ? depEconomySeats
                        : depBusinessSeats
                      : cabin === "Economy"
                      ? arrEconomySeats
                      : arrBusinessSeats,
                  people: seatNo.length,
                  cabin: cabin,
                }}
                done={(reservedSeats) => {
                  if (step === 0) {
                    axios
                      .put("http://localhost:8000/admin/reserveUpdateSeats", {
                        _id: resID,
                        departureSeats: reservedSeats,
                      })
                      .then((res) => setReserveId(res.data._id));
                    setDepSeats(reservedSeats);
                    setOpenPopupSeats(false);
                    setFlights(
                      flights.map((val) => {
                        return val._id == resID
                          ? {
                              _id: val._id,
                              user: val.user,
                              departureFlight: val.departureFlight,
                              returnFlight: val.returnFlight,
                              cabin: val.cabin,
                              departureSeats: reservedSeats,
                              returnSeats: val.returnSeats,
                              price: val.price,
                              status: val.status,
                              departurePrice: val.departurePrice,
                              returnPrice: val.returnPrice,
                            }
                          : val;
                      })
                    );
                  } else {
                    axios
                      .put("http://localhost:8000/admin/reserveUpdateSeats", {
                        _id: resID,
                        returnSeats: reservedSeats,
                      })
                      .then((res) => setReserveId(res.data._id));
                    setRetSeats(reservedSeats);
                    setOpenPopupSeats(false);
                    setFlights(
                      flights.map((val) => {
                        return val._id == resID
                          ? {
                              _id: val._id,
                              user: val.user,
                              departureFlight: val.departureFlight,
                              returnFlight: val.returnFlight,
                              cabin: val.cabin,
                              departureSeats: val.departureSeats,
                              returnSeats: reservedSeats,
                              price: val.price,
                              status: val.status,
                              departurePrice: val.departurePrice,
                              returnPrice: val.returnPrice,
                            }
                          : val;
                      })
                    );
                  }
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={openPopupFlight} maxWidth="lg">
        <DialogTitle>
          <div className="PopupHeaderRes">
            Choose {step === 0 ? "Departure" : "Return"} Flight
            <button
              onClick={() => {
                setOpenPopupFlight(false);
                setListOfFlights([]);
                setConfirmedPrice(false);
                setConfirmed(false);
              }}
            >
              Close
            </button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div className="listOfFlights">
            {listOfFlights.map((val) => {
              return (
                <div className="flightContainerRes">
                  <div className="flightRes">
                    <h3 id="fliNumber">
                      Flight Number: <br />
                      {val.flightNumber}
                    </h3>
                    <h3>
                      Departure Time: <br />
                      {val.departureTime}
                    </h3>
                    <h3>
                      Arrival Time: <br />
                      {val.arrivalTime}
                    </h3>
                    <h3>
                      Trip Duration: <br />
                      {val.tripDuration + " Hours"}
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
                  <button
                    onClick={() => {
                      setFlightID(val._id);
                      setOpenPopupMore(true);
                    }}
                  >
                    More Info
                  </button>
                  <button
                    id="chooseB"
                    onClick={() => {
                      chooseFlight(val);
                    }}
                  >
                    Choose
                  </button>
                </div>
              );
            })}
          </div>
          {confirmed && (
            <>
              <div style={{ textAlign: "center" }}>
                Please Choose {step === 0 ? "Departure" : "Return"} Flight Seats{" "}
              </div>
              <Seats
                flight={{
                  id: newFlightNumber,
                  seats:
                    cabin === "Economy" ? newEconomySeats : newBusinessSeats,
                  people: seatNo.length,
                  cabin: cabin,
                }}
                done={(reservedSeats) => {
                  if (step === 0) {
                    axios
                      .put("http://localhost:8000/admin/updateReserveFlights", {
                        _id: resID,
                        departureFlight: newFlightNumber,
                        departureSeats: reservedSeats,
                        departurePrice: newPrice,
                        price: newTotalPrice,
                      })
                      .then((res) => setReserveId(res.data._id));
                    setDepSeats(reservedSeats);
                    setOpenPopupFlight(false);
                    setListOfFlights([]);
                    setConfirmedPrice(false);
                    setConfirmed(false);
                    setOpenPopupDep(false);
                    setOpenPopupRet(false);
                    setFlights(
                      flights.map((val) => {
                        return val._id == resID
                          ? {
                              _id: val._id,
                              user: val.user,
                              departureFlight: newFlightNumber,
                              returnFlight: val.returnFlight,
                              cabin: val.cabin,
                              departureSeats: reservedSeats,
                              returnSeats: val.returnSeats,
                              price: newTotalPrice,
                              status: val.status,
                              departurePrice: newPrice,
                              returnPrice: val.returnPrice,
                            }
                          : val;
                      })
                    );
                  } else {
                    axios
                      .put("http://localhost:8000/admin/updateReserveFlights", {
                        _id: resID,
                        returnFlight: newFlightNumber,
                        returnSeats: reservedSeats,
                        returnPrice: newPrice,
                        price: newTotalPrice,
                      })
                      .then((res) => setReserveId(res.data._id));
                    setDepSeats(reservedSeats);
                    setOpenPopupFlight(false);
                    setListOfFlights([]);
                    setConfirmedPrice(false);
                    setConfirmed(false);
                    setOpenPopupDep(false);
                    setOpenPopupRet(false);
                    setFlights(
                      flights.map((val) => {
                        return val._id == resID
                          ? {
                              _id: val._id,
                              user: val.user,
                              departureFlight: val.departureFlight,
                              returnFlight: newFlightNumber,
                              cabin: val.cabin,
                              departureSeats: val.departureSeats,
                              returnSeats: reservedSeats,
                              price: newTotalPrice,
                              status: val.status,
                              departurePrice: val.departurePrice,
                              returnPrice: newPrice,
                            }
                          : val;
                      })
                    );
                  }
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={openPopupMore} maxWidth="lg">
        <DialogTitle>
          <div className="PopupHeaderRes">
            Flight Info
            <button onClick={() => setOpenPopupMore(false)}>Close</button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          {listOfFlights.map((val) => {
            if (val._id == flightID) {
              return (
                <div>
                  <div className="flightPopup">
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
                  <div className="flightPopup">
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
              );
            }
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserReserves;
