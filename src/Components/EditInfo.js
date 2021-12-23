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
  const [password, setPassword] = useState(null);
  const [homeAddress, setHomeAddress] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [telephoneNumber, setTelephoneNumber] = useState(null);
  const [secondTelephoneNumber, setSecondTelephoneNumber] = useState(null);
  const [userName, setUserName] = useState(null);

  const [user, setUser] = useState([]);

  const home = () => {
    navigate(-1);
  };

  const passwordChanging = () => {
    navigate("/user/home/editPassword");
  };

  const updateInfo = () => {
    if (countryCode < 0) {
      alert("Country code can't be negative");
    } else if (telephoneNumber < 0) {
      alert("Telephone number can't be negative");
    } else if (telephoneNumber > 0) {
      if (telephoneNumber.length < 11 || telephoneNumber.length > 11) {
        alert("Telephone number must be 11 digits");
      }
    } else if (secondTelephoneNumber < 0) {
      alert("Second telephone number can't be negative");
    } else if (secondTelephoneNumber > 0) {
      if (
        secondTelephoneNumber.length < 11 ||
        secondTelephoneNumber.length > 11
      ) {
        alert("Second telephone must be 11 digits");
      }
    } else {
      if (window.confirm("Are you sure to update your information?")) {
        var val = {
          emailOld: window.localStorage.getItem("user"),
          firstName: firstName,
          lastName: lastName,
          passportNumber: passportNumber,
          email: email,
          homeAddress: homeAddress,
          countryCode: countryCode != 0 ? countryCode : null,
          telephoneNumber: telephoneNumber != 0 ? telephoneNumber : null,
          secondTelephoneNumber:
            secondTelephoneNumber != 0 ? secondTelephoneNumber : null,
          userName: userName,
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
              user.homeAddress =
                homeAddress != null ? homeAddress : user.homeAddress;
              user.countryCode =
                countryCode != null ? countryCode : user.countryCode;
              user.telephoneNumber =
                telephoneNumber != null
                  ? telephoneNumber
                  : user.telephoneNumber;
              user.secondTelephoneNumber =
                secondTelephoneNumber != null
                  ? secondTelephoneNumber
                  : user.secondTelephoneNumber;
              user.userName = userName != null ? userName : user.userName;
              alert("Updated Succesfully");
            }
          });
      }
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
        <div className="HeaderButtonInfo">
          <button onClick={home}>Back</button>
        </div>
        <div className="EditInfo">
          <h1>Edit Personal Information</h1>
        </div>
        <div id="passwordB" className="HeaderButtonInfo">
          <button onClick={passwordChanging}>Change Password</button>
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
              UserName
              <input
                type="text"
                placeholder="UserName"
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>
            <div>
              Home Address
              <input
                type="text"
                placeholder="Address"
                onChange={(event) => {
                  setHomeAddress(event.target.value);
                }}
              />
              Country Code
              <input
                type="number"
                placeholder="Country Code"
                onChange={(event) => {
                  setCountryCode(event.target.value);
                }}
              />
              Passport Number
              <input
                type="text"
                placeholder="Passport Number"
                onChange={(event) => {
                  setPassportNumber(event.target.value);
                }}
              />
            </div>
            <div>
              Email
              <input
                type="text"
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              Telephone Number
              <input
                type="number"
                placeholder="Telephone Number"
                onChange={(event) => {
                  setTelephoneNumber(event.target.value);
                }}
              />
              Second Telephone Number
              <input
                type="number"
                placeholder="Second Telephone Number"
                onChange={(event) => {
                  setSecondTelephoneNumber(event.target.value);
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
            <h3>
              UserName:
              {" " + user.userName}
            </h3>
            <h3>
              Home Address:
              {" " + user.homeAddress}
            </h3>
            <h3>
              Country Code:
              {" +" + user.countryCode}
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
            <h3>
              Telephone Number:
              {" " + user.telephoneNumber}
            </h3>
            <h3>
              Second Telephone Number:
              {" " + user.secondTelephoneNumber}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateInfo;
