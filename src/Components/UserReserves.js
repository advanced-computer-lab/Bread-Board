import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../constants";

function UserReserves() {
  const navigate = useNavigate();

  const [flights, setFlights] = useState(null);

  const user = window.localStorage.getItem("user");

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
    if (window.confirm("Are you sure you want to receive an email about this reservation?")) {
      axios
        .post(API_URL + "/emailmeUserReserve/" + id)
        .then((res) => {
          fetch(user);
        })
        .catch((err) => alert(err));
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
            <div className="flightRes">
              <h3>
                Departure Flight: <br />
                {val.departureFlight}
              </h3>
              <h3>
                Return Flight: <br />
                {val.returnFlight}
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
                Return Seats: <br />
                {val.returnSeats.join(" - ")}
              </h3>
              <h3>
                Price: <br />
                {val.price}
              </h3>
            </div>
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
            <button
              id="chooseB"
              // onClick={() => {
              //   chooseDep(val);
              // }}
            >
              Choose
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserReserves;
