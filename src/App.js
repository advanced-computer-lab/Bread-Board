import "./App.css";
import { Component, useState, useEffect } from "react";
import axios from "axios";
import CreateFlight from "./Components/CreateFlight";
import SearchFlight from "./Components/searchFlight";
import DeleteFlight from "./Components/DeleteFlight";
import UpdateFlight from "./Components/UpdateFlight";

function App() {
  return <CreateFlight />;
}

export default App;
