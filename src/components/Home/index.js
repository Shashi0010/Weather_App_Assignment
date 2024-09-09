// src/pages/Home.js
import React, { useState } from 'react';
import CitiesTable from '../CitiesTable';
import SearchBar from '../SearchBar';

const Home = () => {
  const [filteredCities, setFilteredCities] = useState([]);

  return (
    <div>
      <SearchBar setFilteredCities={setFilteredCities} />
      <CitiesTable filteredCities={filteredCities} />
    </div>
  );
};

export default Home;
