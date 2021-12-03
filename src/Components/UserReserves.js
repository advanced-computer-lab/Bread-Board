import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../constants";

const UserReserves = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState(null);
  const user = window.localStorage.getItem("user");
  const fetch = (user) => {
    axios
      .get(API_URL + "/userReserve/" + user)
      .then(({ data }) => setFlights(data))
      .catch((err) => alert(err));
  };
  useEffect(() => {
    fetch(user);
  }, [user]);
  if (!flights) return <div>Loading...</div>;
  return (
    <div style={{ padding: "10vh 10vw" }}>
      <Button variant="outlined" onClick={() => navigate("/user/home")}>
        Back
      </Button>
      {flights.map(
        ({
          _id,
          departureFlight,
          returnFlight,
          cabin,
          departureSeats,
          returnSeats,
          price,
        }) => (
          <div className="reserve">
            <div>Departure Flight: {departureFlight}</div>
            <div>Return Flight: {returnFlight}</div>
            <div>Cabin: {cabin} Class</div>
            <div>Departure Seats: {departureSeats.join(" - ")}</div>
            <div>Return Seats: {returnSeats.join(" - ")}</div>
            <div>Price: {price}</div>
            <Button
              variant="outlined"
              onClick={() =>
                window.confirm(`Are you sure you will cancel this flight?`)
                  ? axios
                      .put(API_URL + "/cancelUserReserve/" + _id)
                      .then((res) => {
                        alert(
                          res.data.status === "Canceled"
                            ? "Canceled Successfully"
                            : "Error Occurred"
                        );
                        fetch(user);
                      })
                      .catch((err) => alert(err))
                  : null
              }
            >
              Cancel
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default UserReserves;
