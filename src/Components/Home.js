import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  const createFlight = () => {
    navigate("/create");
  };

  const searchFlight = () => {
    navigate("/search");
  };

  const updateFlight = () => {
    navigate("/update");
  };

  const deleteFlight = () => {
    navigate("/delete");
  };

  const logout = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="HeaderContainer">
        <div className="HeaderButton">
          <button onClick={logout}>Logout</button>
        </div>
        <div className="Home">
          <h1>Home</h1>
          <h2>Welcome Admin</h2>
        </div>
      </div>
      <div className="App">
        <div className="HomeButtons">
          <div>
            <button onClick={createFlight}>Create Flights</button>
            <button onClick={searchFlight}>Search Flights</button>
          </div>
          <div>
            <button onClick={updateFlight}>Update Flights</button>
            <button onClick={deleteFlight}>Delete Flights</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
