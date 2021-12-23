import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../App.css";
import { Button, Dialog } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Seats from "./Seats";

function ReserveFlights() {
  const navigate = useNavigate();

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [cabin, setCabin] = useState("numberofEconomySeats");

  const [listOfFlights, setListOfFlights] = useState([]);

  const [depFli, setDepFli] = useState("departure");

  const [openPopupMore, setOpenPopupMore] = useState(false);
  const [openPopupSum, setOpenPopupSum] = useState(false);

  const [flightID, setFlightID] = useState(null);

  const [depID, setDepID] = useState(null);
  const [depFlightNumber, setDepFlightNumber] = useState(null);
  const [depDepartureTime, setDepDepartureTime] = useState(null);
  const [depArrivalTime, setDepArrivalTime] = useState(null);
  const [depEconomySeats, setDepEconomySeats] = useState(null);
  const [depArrivalDate, setDepArrivalDate] = useState(null);
  const [depDepartureDate, setDepDepartureDate] = useState(null);
  const [depBusinessSeats, setDepBusinessSeats] = useState(null);
  const [depDepartureAirport, setDepDepartureAirport] = useState(null);
  const [depArrivalAirport, setDepArrivalAirport] = useState(null);
  const [depBaggage, setDepBaggage] = useState(null);
  const [depTripDuration, setDepTripDuration] = useState(null);
  const [depPrice, setDepPrice] = useState(null);

  const [arrID, setArrID] = useState(null);
  const [arrFlightNumber, setArrFlightNumber] = useState(null);
  const [arrDepartureTime, setArrDepartureTime] = useState(null);
  const [arrArrivalTime, setArrArrivalTime] = useState(null);
  const [arrEconomySeats, setArrEconomySeats] = useState(null);
  const [arrArrivalDate, setArrArrivalDate] = useState(null);
  const [arrDepartureDate, setArrDepartureDate] = useState(null);
  const [arrBusinessSeats, setArrBusinessSeats] = useState(null);
  const [arrDepartureAirport, setArrDepartureAirport] = useState(null);
  const [arrArrivalAirport, setArrArrivalAirport] = useState(null);
  const [arrBaggage, setArrBaggage] = useState(null);
  const [arrTripDuration, setArrTripDuration] = useState(null);
  const [arrPrice, setArrPrice] = useState(null);

  const [confirmed, setConfirmed] = useState(false);
  const [step, setStep] = useState(0);
  const [depSeats, setDepSeats] = useState([]);
  const [retSeats, setRetSeats] = useState([]);
  const [reservePopup, setReservePopup] = useState(false);
  const [reserveId, setReserveId] = useState(null);

  const home = () => {
    navigate(-1);
  };

  const searchFlight = () => {
    if (
      adults == null ||
      children == null ||
      departureDate == null ||
      returnDate == null ||
      departureAirport == null ||
      arrivalAirport == null
    ) {
      alert("Please fill all fields!!!");
    } else if (adults <= 0 && children <= 0) {
      alert("please select a valid number of passengers !!!");
    } else if (adults < 0 || children < 0) {
      alert("number of passenegers cannot be less than 0 !!!");
    } else if (departureDate > returnDate) {
      alert("Please enter a valid return/arrival date !!!");
    } else {
      var val = {
        adults: adults,
        children: children,
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
        departureDate: departureDate,
        returnDate: returnDate,
        cabin: cabin,
      };
      axios
        .post("http://localhost:8000/admin/departureFlights", val)
        .then((result) => {
          if (result.data.length == 0) {
            alert(
              "There are no flights available with required search criteria!!"
            );
          }
          setListOfFlights(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setDepFli("departure");
    setDepFlightNumber(null);
    setArrFlightNumber(null);
  };

  const chooseDep = (fli) => {
    if (depFlightNumber == null) {
      setDepID(fli._id);
      setDepFlightNumber(fli.flightNumber);
      setDepDepartureTime(fli.departureTime);
      setDepArrivalTime(fli.arrivalTime);
      setDepEconomySeats(fli.numberofEconomySeats);
      setDepArrivalDate(fli.arrivalDate);
      setDepDepartureDate(fli.departureDate);
      setDepBusinessSeats(fli.numberofBusinessSeats);
      setDepDepartureAirport(fli.departureAirport);
      setDepArrivalAirport(fli.arrivalAirport);
      setDepBaggage(fli.baggage);
      setDepTripDuration(fli.tripDuration);
      setDepPrice(fli.price);
      setDepFli("return");
      var val = {
        adults: adults,
        children: children,
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
        departureDate: departureDate,
        returnDate: returnDate,
        cabin: cabin,
      };
      axios
        .post("http://localhost:8000/admin/returnFlights", val)
        .then((result) => {
          setListOfFlights(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setArrID(fli._id);
      setArrFlightNumber(fli.flightNumber);
      setArrDepartureTime(fli.departureTime);
      setArrArrivalTime(fli.arrivalTime);
      setArrEconomySeats(fli.numberofEconomySeats);
      setArrArrivalDate(fli.arrivalDate);
      setArrDepartureDate(fli.departureDate);
      setArrBusinessSeats(fli.numberofBusinessSeats);
      setArrDepartureAirport(fli.departureAirport);
      setArrArrivalAirport(fli.arrivalAirport);
      setArrBaggage(fli.baggage);
      setArrTripDuration(fli.tripDuration);
      setArrPrice(fli.price);
      setOpenPopupSum(true);
    }
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
        <div className="Reserveinputs">
          <div className="ReserveinputsSub">
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
              Departure Airport
              <input
                type="text"
                placeholder="Departure Airport"
                onChange={(event) => {
                  setDepartureAirport(event.target.value);
                }}
              />
            </div>
            <div>
              Arrival Airport
              <input
                type="text"
                placeholder="Arrival Airport"
                onChange={(event) => {
                  setArrivalAirport(event.target.value);
                }}
              />
              Departure Date
              <input
                type="date"
                onChange={(event) => {
                  setDepartureDate(event.target.value);
                }}
              />
              Return Date
              <input
                type="date"
                onChange={(event) => {
                  setReturnDate(event.target.value);
                }}
              />
            </div>
            <div className="cabinButtons">
              <label className="cabinButtons1">
                Economy Seats :
                <input
                  type="radio"
                  name="cabinClass"
                  value="numberofEconomySeats"
                  checked={cabin === "numberofEconomySeats"}
                  onChange={() => setCabin("numberofEconomySeats")}
                />
              </label>
              <label className="cabinButtons2">
                Business Seats :
                <input
                  type="radio"
                  name="cabinClass"
                  value="numberofBusinessSeats"
                  checked={cabin === "numberofBusinessSeats"}
                  onChange={() => setCabin("numberofBusinessSeats")}
                />
              </label>
            </div>
          </div>
          <button onClick={searchFlight}>Submit</button>
        </div>
      </div>
      <div className="listOfFlights">
        Choose a {depFli} flight from the below list
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
                  chooseDep(val);
                }}
              >
                Choose
              </button>
            </div>
          );
        })}
      </div>
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
      <Dialog open={openPopupSum} maxWidth="lg">
        <DialogTitle>
          <div className="PopupHeaderRes">
            Ticket Summary
            <button
              onClick={() => {
                setOpenPopupSum(false);
                setConfirmed(false);
              }}
            >
              Close
            </button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <div className="flightPopup">
              <h3 id="fliNumber">
                Flight Number: <br />
                {depFlightNumber}
              </h3>
              <h3>
                Departure Time: <br />
                {depDepartureTime}
              </h3>
              <h3>
                Departure Date: <br />
                {depDepartureDate}
              </h3>
              <h3>
                Arrival Time: <br />
                {depArrivalTime}
              </h3>
              <h3>
                Arrival Date: <br />
                {depArrivalDate}
              </h3>
              <h3>
                Trip Duration: <br />
                {depTripDuration + " Hours"}
              </h3>
            </div>
            <div className="flightPopup">
              <h3>
                Departure Airport: <br />
                {depDepartureAirport}
              </h3>
              <h3>
                Arrival Airport: <br />
                {depArrivalAirport}
              </h3>
              <h3>
                Price: <br />
                {depPrice + " L.E"}
              </h3>
            </div>
          </div>
          <br></br>
          <div>
            <div className="flightPopup">
              <h3 id="fliNumber">
                Flight Number: <br />
                {arrFlightNumber}
              </h3>
              <h3>
                Departure Time: <br />
                {arrDepartureTime}
              </h3>
              <h3>
                Departure Date: <br />
                {arrDepartureDate}
              </h3>
              <h3>
                Arrival Time: <br />
                {arrArrivalTime}
              </h3>
              <h3>
                Arrival Date: <br />
                {arrArrivalDate}
              </h3>
              <h3>
                Trip Duration: <br />
                {arrTripDuration + " Hours"}
              </h3>
            </div>
            <div className="flightPopup">
              <h3>
                Departure Airport: <br />
                {arrDepartureAirport}
              </h3>
              <h3>
                Arrival Airport: <br />
                {arrArrivalAirport}
              </h3>
              <h3>
                Price: <br />
                {arrPrice + " L.E"}
              </h3>
            </div>
            <div>
              Total Price:{" "}
              {(Number(children) + Number(adults)) *
                Number(depPrice + arrPrice)}
            </div>
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <Button
              style={{ margin: "5vh 0" }}
              variant="outlined"
              onClick={() =>
                setConfirmed(
                  window.confirm(`Are you sure you will reserve this flight?`)
                )
              }
            >
              Reserve Flight
            </Button>
          </div>
          {confirmed && !reservePopup && (
            <>
              <div style={{ textAlign: "center" }}>
                Please Reserve {step === 0 ? "Departure" : "Return"} Flight
                Seats{" "}
              </div>
              <Seats
                flight={{
                  id: step === 0 ? depFlightNumber : arrFlightNumber,
                  seats:
                    step === 0
                      ? cabin === "numberofEconomySeats"
                        ? depEconomySeats
                        : depBusinessSeats
                      : cabin === "numberofEconomySeats"
                      ? arrEconomySeats
                      : arrBusinessSeats,
                  people: Number(adults) + Number(children),
                }}
                done={(reservedSeats) => {
                  if (step === 1) {
                    axios
                      .post("http://localhost:8000/admin/reserve", {
                        user: window.localStorage.getItem("user"),
                        departureFlight: depFlightNumber,
                        returnFlight: arrFlightNumber,
                        cabin:
                          cabin === "numberofEconomySeats"
                            ? "Economy"
                            : "Business",
                        departureSeats: depSeats,
                        returnSeats: reservedSeats,
                        price:
                          (Number(adults) + Number(children)) *
                          (depPrice + arrPrice),
                      })
                      .then((res) => setReserveId(res.data._id));
                    setRetSeats(reservedSeats);
                    setOpenPopupSum(false);
                    setReservePopup(true);
                    setStep(0);
                  } else {
                    setDepSeats(reservedSeats);
                    setStep(1);
                  }
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={reservePopup} maxWidth="lg">
        <DialogTitle>
          <div className="PopupHeaderRes">
            Reservation Summary
            <button onClick={() => setReservePopup(false)}>Close</button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div>
            Booking number:{" "}
            <span style={{ fontWeight: "800" }}>{reserveId}</span>
          </div>
          <div>
            Cabin:{" "}
            <span style={{ fontWeight: "800" }}>
              {cabin === "numberofEconomySeats" ? "Economy" : "Business"} Class
            </span>
          </div>
          <div>
            Price:{" "}
            <span style={{ fontWeight: "800" }}>
              {(Number(adults) + Number(children)) * (depPrice + arrPrice)}
            </span>
          </div>
          <div>
            Departure Seats:{" "}
            <span style={{ fontWeight: "800" }}>{depSeats.join(" - ")}</span>
          </div>
          <div>
            Return Seats:{" "}
            <span style={{ fontWeight: "800" }}>{retSeats.join(" - ")}</span>
          </div>
          <div>
            Departure Date:{" "}
            <span style={{ fontWeight: "800" }}>{depDepartureDate}</span>
          </div>
          <div>
            Departure Time:{" "}
            <span style={{ fontWeight: "800" }}>{depDepartureTime}</span>
          </div>
          <div>
            Return Date:{" "}
            <span style={{ fontWeight: "800" }}>{arrArrivalDate}</span>
          </div>
          <div>
            Return Time:{" "}
            <span style={{ fontWeight: "800" }}>{arrArrivalTime}</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ReserveFlights;
