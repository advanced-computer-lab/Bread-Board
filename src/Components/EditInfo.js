import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../App.css";
import { Dialog } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

function UpdateInfo() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [passportNumber, setPassportNumber] = useState(null);
  const [email, setEmail] = useState(null);

  const [user, setUser] = useState([]);

  const home = () => {
    navigate(-1);
  };

  const updateInfo = () => {
    if (window.confirm("Are you sure to update your information?")) {
      var val = {
        emailOld: window.localStorage.getItem("user"),
        firstName: firstName,
        lastName: lastName,
        passportNumber: passportNumber,
        email: email,
      };
      Object.keys(val).forEach(
        (k) => !val[k] && val[k] !== undefined && delete val[k]
      );
      axios
        .put("http://localhost:8000/admin/updateInfo", val)
        .then((result) => {
          if (result.data == "Error") {
            alert("Email already exists!!!");
          } else {
            if (email != null) {
              axios.put("http://localhost:8000/admin/updateReservations", {
                emailOld: window.localStorage.getItem("user"),
                email: email,
              });
              window.localStorage.setItem("user", email);
            }
            user.firstName = firstName != null ? firstName : user.firstName;
            user.lastName = lastName != null ? lastName : user.lastName;
            user.passportNumber =
              passportNumber != null ? passportNumber : user.passportNumber;
            user.email = email != null ? email : user.email;
            alert("Updated Succesfully");
          }
        });
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        updateInfo();
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

  useEffect(() => {
    axios
      .post("http://localhost:8000/admin/getUser", {
        email: window.localStorage.getItem("user"),
      })
      .then((result) => {
        setUser(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      <div className="HeaderContainer">
        <div className="HeaderButton">
          <button onClick={home}>Back</button>
        </div>
        <div className="EditInfo">
          <h1>Edit Personal Information</h1>
        </div>
      </div>
      <div className="App">
        <div className="Infoinputs">
          <div className="InfoinputsSub">
            <div>
              First Name
              <input
                type="text"
                placeholder="First Name"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              Last Name
              <input
                type="text"
                placeholder="Last Name"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </div>
            <div>
              Passport Number
              <input
                type="text"
                placeholder="Passport Number"
                onChange={(event) => {
                  setPassportNumber(event.target.value);
                }}
              />
              Email
              <input
                type="text"
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
          </div>
          <button onClick={updateInfo}>Update</button>
        </div>
      </div>
      <div className="listOfFlights">
        <div className="flightSearch">
          <div className="flight">
            <h3>
              First Name:
              {" " + user.firstName}
            </h3>
            <h3>
              Last Name:
              {" " + user.lastName}
            </h3>
          </div>
          <div className="flight">
            <h3>
              Passport Number:
              {" " + user.passportNumber}
            </h3>
            <h3>
              Email:
              {" " + user.email}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateInfo;
