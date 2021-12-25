import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../constants";

const Seats = ({ flight, done }) => {
  const { id, seats, people, cabin } = flight;
  const [reserved, setReserved] = useState(false);
  const [reservedSeats, setReservedSeats] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "/reserve/" + id + "/" + cabin)
      .then(({ data }) => setReserved(data))
      .catch((err) => alert(err));
  }, [id]);

  useEffect(() => {
    if (reservedSeats.length === people) {
      done(reservedSeats);
      setReservedSeats([]);
      setReserved(false);
    }
  }, [reservedSeats, done, people]);

  if (reserved === false) return <div>Loading ...</div>;

  return (
    <div style={{ textAlign: "center" }}>
      <div>People: {people}</div>
      <div>Left: {people - reservedSeats.length}</div>
      <div className="seats">
        {[...Array(seats)].map((_, i) => {
          const userReserved = reservedSeats.filter((r) => r === i).length > 0;
          const otherReserved =
            reserved.filter((r) =>
              r.returnFlight === id
                ? r.returnSeats.includes(i)
                : r.departureSeats.includes(i)
            ).length > 0;
          return (
            <div
              className="seat"
              key={i}
              style={{
                backgroundColor: userReserved
                  ? "yellow"
                  : otherReserved
                  ? "red"
                  : "green",
              }}
              onClick={() => {
                if (userReserved || otherReserved)
                  return alert("Can not select already taken seat");
                const n = [...reservedSeats];
                n.push(i);
                setReservedSeats(n);
              }}
            >
              {i}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Seats;
