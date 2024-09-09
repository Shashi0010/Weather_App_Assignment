// src/components/SearchBar.js
import React, { useState } from 'react';
import './index.css'

const SearchBar = ({ setFilteredCities, cities }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = e => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredCities = cities.filter(city =>
      city.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCities(filteredCities);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
