import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ManageFlights from "./Components/ManageFlights";
import SearchFlights from "./Components/SearchFlights";
import ReserveFlights from "./Components/ReserveFlights";
import UserHome from "./Components/UserHome";
import UserReserves from "./Components/UserReserves";
import ReserveFlightsForGuests from "./Components/ReserveFlightsForGuests";
import EditInfo from "./Components/EditInfo";
import New from "./Components/New";
import Sign from "./Components/Sign";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ManageFlights />} />
        <Route path="/admin/search" element={<SearchFlights />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/home/reserveFlights" element={<ReserveFlights />} />
        <Route path="/user/home/flights" element={<UserReserves />} />
        <Route path="/user/home/editInfo" element={<EditInfo />} />
        <Route
          path="/guest/home/reserveFlights"
          element={<ReserveFlightsForGuests />}
        />
      </Routes>
    </Router>
  );
}

export default App;
