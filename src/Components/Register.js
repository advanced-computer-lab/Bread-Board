import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const login = () => {
    navigate(-1);
  };

  const register = () => {
    if (name == "" || email == "" || password == "") {
      alert("Please fill all fields!!!");
    } else {
      axios
        .post("http://localhost:8000/register", {
          name: name,
          email: email,
          password: password,
          admin: admin,
        })
        .then((result) => {
          if (result.data.name == "ValidationError") {
            alert("Email already exists!!!");
          } else {
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
            <input
              type="text"
              placeholder="Name..."
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Email..."
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password..."
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="checkBox">
            Admin:
            <input
              type="checkbox"
              onChange={(event) => {
                setAdmin(event.target.checked);
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
