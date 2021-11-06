import './App.css';
import { Component, useState,useEffect } from 'react';
import axios from 'axios';
import CreateFlight from './Components/createFlight';
import SearchFlight from './Components/searchFlight';
import UpdateFlight from './Components/updateFlight';

function App() {
  return (
    <searchFlight />
  );
}

export default App;