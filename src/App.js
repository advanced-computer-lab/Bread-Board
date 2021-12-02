import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ManageFlights from "./Components/ManageFlights";
import SearchFlights from "./Components/SearchFlights";
import New from "./Components/New";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ManageFlights />} />
        <Route path="/admin/search" element={<SearchFlights />} />
      </Routes>
    </Router>
  );
}

export default App;
