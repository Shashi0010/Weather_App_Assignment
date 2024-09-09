import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CitiesTable from './components/CitiesTable';
import WeatherPage from './components/WeatherPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<CitiesTable />} />
          <Route path="/weather/:cityName" element={<WeatherPage />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
//:city/:country