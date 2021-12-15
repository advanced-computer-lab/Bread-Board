import { useNavigate } from "react-router-dom";
import "../App.css";

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
          <button onClick={logout}>Logout</button>
        </div>
        <div className="Home">
          <h1>Home</h1>
          <h2>Welcome User</h2>
        </div>
      </div>
      <div className="App">
        <div className="UserHomeButtons">
          <button onClick={reserveFlight}>Reserve Flights</button>
          <button onClick={editInfo}>Edit Personal Information</button>
          <button onClick={() => navigate("/user/home/flights")}>
            My Flights
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
