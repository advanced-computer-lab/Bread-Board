import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import CreateFlight from "./Components/CreateFlight";
import SearchFlight from "./Components/SearchFlight";
import DeleteFlight from "./Components/DeleteFlight";
import UpdateFlight from "./Components/UpdateFlight";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateFlight />} />
        <Route path="/search" element={<SearchFlight />} />
        <Route path="/update" element={<UpdateFlight />} />
        <Route path="/delete" element={<DeleteFlight />} />
      </Routes>
    </Router>
  );
}

export default App;
