import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './index.css'; // Separate CSS for styling

const WeatherPage = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [background, setBackground] = useState('');

  const API_KEY = '5d4dbe312752f3719bfe98bf11caa0fe';

  useEffect(() => {
    if (!cityName) {
      setError('City name is missing.');
      return;
    }

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
        );
        setWeatherData(response.data);
        setDynamicBackground(response.data.weather[0].main);
      } catch (err) {
        setError('Unable to fetch weather data. Please try again later.');
      }
    };
    fetchWeather();
  }, [cityName]);

  // Set dynamic background based on weather condition
  const setDynamicBackground = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        setBackground('sunny-bg');
        break;
      case 'Clouds':
        setBackground('cloudy-bg');
        break;
      case 'Rain':
        setBackground('rainy-bg');
        break;
      default:
        setBackground('default-bg');
        break;
    }
  };
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!weatherData) {
    return <div className="loading">Loading weather data...</div>;
  }

  return (
    <div className='weather-div-container'>
      <div className={`weather-container ${background}`}>
      <h1>{weatherData.name}</h1>
      <p>Temperature: {weatherData.main.temp} °C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity} %</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      <p>Atmospheric Pressure: {weatherData.main.pressure} hPa</p>
    </div>
    </div>
  );
};

export default WeatherPage;
