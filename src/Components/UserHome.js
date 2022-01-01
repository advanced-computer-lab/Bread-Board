import { useNavigate } from "react-router-dom";
import "../App.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function UserHome() {
  const navigate = useNavigate();

  const reserveFlight = () => {
    navigate("/user/home/reserveFlights");
  };

  const editInfo = () => {
    navigate("/user/home/editInfo");
  };

  const logout = () => {
    navigate(-1);
    window.localStorage.removeItem("user");
  };

  return (
    <div>
      <div className="HeaderContainer">
        <div className="HeaderButton">
          <Button type="button" variant="contained" onClick={logout}>
            Logout
          </Button>
        </div>
        <div className="Home">
          <h1>Home</h1>
          <h2>Welcome User</h2>
        </div>
      </div>
      <div className="App">
        <div className="UserHomeButtons">
          <Grid
            item
            component={Paper}
            elevation={6}
            sx={{
              height: "149px",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button type="button" variant="contained" onClick={reserveFlight}>
              Reserve Flights
            </Button>
            <Button type="button" variant="contained" onClick={editInfo}>
              Edit Personal Information
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={() => navigate("/user/home/flights")}
            >
              My Flights
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
