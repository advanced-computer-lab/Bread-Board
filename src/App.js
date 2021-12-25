import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManageFlights from "./Components/ManageFlights";
import SearchFlights from "./Components/SearchFlights";
import ReserveFlights from "./Components/ReserveFlights";
import UserHome from "./Components/UserHome";
import UserReserves from "./Components/UserReserves";
import ReserveFlightsForGuests from "./Components/ReserveFlightsForGuests";
import EditInfo from "./Components/EditInfo";
import EditPassword from "./Components/EditPassword";
import ForgotPassword from "./Components/ForgotPassword";
import New from "./Components/New";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/admin" element={<ManageFlights />} />
        <Route path="/admin/search" element={<SearchFlights />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/home/reserveFlights" element={<ReserveFlights />} />
        <Route path="/user/home/flights" element={<UserReserves />} />
        <Route path="/user/home/editInfo" element={<EditInfo />} />
        <Route path="/user/home/editPassword" element={<EditPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/guest/home/reserveFlights"
          element={<ReserveFlightsForGuests />}
        />
      </Routes>
    </Router>
  );
}

export default App;
