import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../App.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function UpdatePasswword() {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const back = () => {
    navigate(-1);
  };

  const updateInfo = () => {
    if (oldPassword == "" || newPassword == "" || confirmNewPassword == "") {
      alert("Please fill all fields!!!");
    } else if (newPassword != confirmNewPassword) {
      alert("Passwords don't match");
    } else {
      if (window.confirm("Are you sure to change your password?")) {
        var val = {
          email: window.localStorage.getItem("user"),
          oldPassword: oldPassword,
          password: newPassword,
        };
        axios
          .put("http://localhost:8000/admin/updatePassword", val)
          .then((result) => {
            if (result.data.message == "Your Session Expired") {
              alert(result.data.message);
              navigate("/");
            } else if (result.data.message == "Success") {
              alert("Updated Succesfully");
              navigate(-1);
            } else {
              alert(result.data.message);
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
          <h1>Edit Password</h1>
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
              Old Password
              <input
                type="password"
                placeholder="Old Password"
                onChange={(event) => {
                  setOldPassword(event.target.value);
                }}
              />
              New Password
              <input
                type="password"
                placeholder="New Password"
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />
              Confirm new Password
              <input
                type="password"
                placeholder="New Password"
                onChange={(event) => {
                  setConfirmNewPassword(event.target.value);
                }}
              />
            </div>
            <button onClick={updateInfo}>Change Password</button>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default UpdatePasswword;
