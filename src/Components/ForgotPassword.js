import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function ForgotPasswword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  const back = () => {
    navigate(-1);
  };

  const forgotPasswword = () => {
    if (email == "" || userName == "") {
      alert("Please enter your email and username");
    } else {
      axios
        .put("http://localhost:8000/admin/forgotPassword", {
          email: email,
          userName: userName,
        })
        .then((result) => {
          if (result.data == "Password Changed") {
            axios
              .post("http://localhost:8000/admin/sendEmail", {
                email: email,
                password: "password123",
              })
              .then((result) => {
                alert(result.data);
                navigate(-1);
              });
          } else {
            alert(result.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        forgotPasswword();
      }
      if (event.code === "Escape") {
        event.preventDefault();
        back();
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
          <button onClick={back}>Back</button>
        </div>
        <div className="EditPassword">
          <h1>Forgot Password</h1>
        </div>
      </div>
      <div className="App">
        <div className="Passwordinputs">
          <Grid
            item
            component={Paper}
            elevation={6}
            sx={{
              height: "200px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              Your Email:
              <input
                type="text"
                placeholder="Enter Your Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              Your Username:
              <input
                type="text"
                placeholder="Enter Your Username"
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>
            <button onClick={forgotPasswword}>Send Mail</button>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswword;
