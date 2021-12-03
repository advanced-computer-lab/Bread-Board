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
          alert("update succesful");
        });
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
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
      <div className="listOfFlights"></div>
    </div>
  );
}

export default UpdateInfo;
