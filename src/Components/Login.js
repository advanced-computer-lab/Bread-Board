import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then((result) => {
        if (result.data == "Success") {
          navigate("/home");
        } else {
          alert(result.data);
        }
      });
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        login();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <div>
      <div className="Login">
        <h1>Login</h1>
      </div>
      <div className="App">
        <div className="LoginInputs">
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
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
