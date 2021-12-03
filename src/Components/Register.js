import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passportNumber, setPassportNumber] = useState("");

  const login = () => {
    navigate(-1);
  };

  const register = () => {
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == "" ||
      passportNumber == ""
    ) {
      alert("Please fill all fields!!!");
    } else {
      axios
        .post("http://localhost:8000/register", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          passportNumber: passportNumber,
          admin: false,
        })
        .then((result) => {
          if (result.data.name == "ValidationError") {
            alert("Email already exists!!!");
          } else {
            alert("Registered Succefully");
            navigate(-1);
          }
        });
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        register();
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
          <button onClick={login}>Login</button>
        </div>
        <div className="Register">
          <h1>Register</h1>
        </div>
      </div>
      <div className="App">
        <div className="RegisterInputs">
          <div>
            First Name:
            <input
              type="text"
              placeholder="First Name..."
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
            Last Name:
            <input
              type="text"
              placeholder="Last Name..."
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
            Email:
            <input
              type="text"
              placeholder="Email..."
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div>
            Passport Number:
            <input
              type="text"
              placeholder="Passport Number..."
              onChange={(event) => {
                setPassportNumber(event.target.value);
              }}
            />
            Password:
            <input
              type="password"
              placeholder="Password..."
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <button onClick={register}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
