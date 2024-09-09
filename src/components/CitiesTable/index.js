import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css'

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // Fetch Cities API
  const fetchCities = useCallback(async () => {
    const response = await axios.get(
      `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=20&start=${page}`
    );
    const newCities = response.data.records.map(record => record.fields);
    setCities(prevCities => [...prevCities, ...newCities]);
    setFilteredCities(prevCities => [...prevCities, ...newCities]);

    if (newCities.length === 0) setHasMore(false);
  }, [page]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  // Handle Search
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length === 0) {
      setFilteredCities(cities);
    } else {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${e.target.value}&rows=20`
      );
      const suggestions = response.data.records.map(record => record.fields);
      setFilteredCities(suggestions);
    }
  };

  // Handle Sorting with fallback for undefined or null values
  const handleSort = (key) => {
    const sortedCities = [...filteredCities].sort((a, b) => {
      const valueA = a[key] || ''; // Fallback for undefined/null
      const valueB = b[key] || ''; // Fallback for undefined/null
      return valueA.localeCompare(valueB);
    });
    setFilteredCities(sortedCities);
  };

  // Navigate to Weather Page
  const handleCityClick = (cityName) => {
    navigate(`/weather/${cityName}`);
  };

  // Open in New Tab
  const handleRightClick = (e, cityName) => {
    e.preventDefault();
    window.open(`/weather/${cityName}`, '_blank');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <InfiniteScroll
        dataLength={filteredCities.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<h4>Loading more cities...</h4>}
        endMessage={<p>No more cities to load.</p>}
      >
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>City</th>
              <th onClick={() => handleSort('country_name')}>Country</th>
              <th onClick={() => handleSort('timezone')}>Timezone</th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.map((city, index) => (
              <tr
                key={`${city.geoname_id}-${index}`} // Use geoname_id and index for a unique key
                onClick={() => handleCityClick(city.name)}
                onContextMenu={(e) => handleRightClick(e, city.name)}
              >
                <td>{city.name}</td>
                <td>{city.cou_name_en}</td>
                <td>{city.timezone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CitiesTable;
