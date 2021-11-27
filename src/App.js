import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import CreateFlight from "./Components/CreateFlight";
import SearchFlight from "./Components/SearchFlight";
import DeleteFlight from "./Components/DeleteFlight";
import UpdateFlight from "./Components/UpdateFlight";
import New from "./Components/New";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/create" element={<New />} />
        <Route path="/admin/search" element={<SearchFlight />} />
        <Route path="/admin/update" element={<UpdateFlight />} />
        <Route path="/admin/delete" element={<DeleteFlight />} />
      </Routes>
    </Router>
  );
}

export default App;
