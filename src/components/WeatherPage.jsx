import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams } from 'react-router-dom'


import CloudIcon from "../assets/icons/clouds.png";
import SunnyIcon from "../assets/icons/sun.png";
import RainyIcon from "../assets/icons/rainy.png"
import CloudBg from "../assets/images/cloudy.jpg";
import SunnyBg from "../assets/images/sunny.jpg";
import RainyBg from "../assets/images/rainy-bg.jpg"
import ForeCast from './ForeCast';

const REACT_APP_API_KEY = "5d4dbe312752f3719bfe98bf11caa0fe"


const WeatherPage = () => {

  //https://api.openweathermap.org/data/2.5/weather/daily?q={city name}&appid={API key}

  const {cityName} = useParams()

  console.log("cityname", cityName)

  const [weatherData, setWeatherData] = useState(null);

  const [weatherIcons, setWeatherIcons] = useState(SunnyIcon)
  
  const [weatherBg, setWeatherBg] = useState(SunnyBg)
  
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const fetchedWeatherData = async () => {
      try{
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${REACT_APP_API_KEY}`)
        setWeatherData(res.data)
      }catch(error) {
        console.log("Fetching error Weather", error);
      }
    };
    fetchedWeatherData();
  },[cityName]);

   //console.log("state", weatherData);
 
  useEffect (() => {
    if(weatherData && weatherData.weather){
      const weatherIcons = weatherData.weather[0].main

    if(weatherIcons === "Clouds"){
      setWeatherIcons(CloudIcon)
      setWeatherBg(CloudBg)
    } else if (weatherIcons ==="Rain"){
      setWeatherIcons(RainyIcon)
      setWeatherBg(RainyBg)
    } else if (weatherIcons === "Clear"){
      setWeatherIcons(SunnyIcon)
      setWeatherBg(SunnyBg)
    }
    }

    const date = new Date()
  
    const options = {weekday: "long", year:"numeric", month:"long",day:"numeric"}
    setCurrentDate(date.toLocaleDateString("en-Us", options))
  },[weatherData])

  return (
    <div >
      <div>
        {
          weatherData && (<div className="min-h-screen flex items-center flex-col sm:flex-row xl:flex-col justify-center gap-5" 
          style={{backgroundImage: `url(${weatherBg})`,backgroundSize:"Cover" , backgroundPosition:"center"}}>
          <div className="flex flex-col p-6 bg-white rounded w-full max-w-xs border-2 mt-0 sm:mt-0">
            <div className="font-bold text-xl">{cityName}</div>
            <div className="text-sm text-gray-500">{currentDate}</div>
            <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
              <img src={weatherIcons} alt="" />
            </div>
            <div className="flex flex-row items-center justify-center mt-6">
              <div className="font-medium text-6xl">{(weatherData.main.temp - 273.15).toFixed(1)}°C</div>
              <div className="flex flex-col items-center ml-6">
                <div>{weatherData.weather[0].main}</div>
                <div className="mt-1">
                  <span className="text-sm">
                    <i className="far fa-long-arrow-up" />
                  </span>
                  <span className="text-sm font-light text-gray-500">{(weatherData.main.temp_max - 273.15).toFixed(1)}°C</span>
                </div>
                <div>
                  <span className="text-sm">
                    <i className="far fa-long-arrow-down" />
                  </span>
                  <span className="text-sm font-light text-gray-500">{(weatherData.main.temp_min - 273.15).toFixed(1)}°C</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-6">
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Wind</div>
                <div className="text-sm text-gray-500">{weatherData.wind.speed}m/s</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Humidity</div>
                <div className="text-sm text-gray-500">{weatherData.main.humidity}%</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Pressure</div>
                <div className="text-sm text-gray-500">{weatherData.main.pressure}hpa</div>
              </div>
            </div>
          </div>
          <ForeCast/>
        </div>)
        }
        
      </div>
    </div>
  )
}

export default WeatherPage