import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CloudIcon from "../assets/icons/clouds.png";
import SunnyIcon from "../assets/icons/sun.png";
import RainyIcon from "../assets/icons/rainy.png"

const REACT_APP_API_KEY = "5d4dbe312752f3719bfe98bf11caa0fe"


const ForeCast = () => {
   
  //https://api.openweathermap.org/data/2.5/forecast/daily?q={city name}&appid={API key}
    const [forecastData, setForecastData] = useState([])
    const [loading,setLoading] = useState(true)

    const [foreCastIcons, setForecastIcons] = useState(SunnyIcon)


    const {cityName} = useParams()
    useEffect(() => {
        const fetchedForecastData = async () => {
          try{
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${REACT_APP_API_KEY}`)
            const dailyforecasts = res.data.list.filter((item,index)=> index % 8 === 0)
            setForecastData(dailyforecasts)

            setLoading(false)

          }catch(error) {
            console.log("Fetching error Weather forcast", error);
          }
        };
        fetchedForecastData();
      },[cityName]);

       
      useEffect (() => {
        if(forecastData && forecastData.weather){
          const foreCastIcons = forecastData.weather[0].main
    
        if(foreCastIcons === "Clouds"){
            setForecastIcons(CloudIcon)
     
        } else if (foreCastIcons ==="Rain"){
            setForecastIcons(RainyIcon)
       
        } else if (foreCastIcons === "Clear"){
          setForecastIcons(SunnyIcon)
      
        }
        }
    
        
      },[forecastData])


  return (
    <div className="p-2">
        <h1 className='text-center text-black text-3xl mb-2 font-bold'>Weather Forecast</h1>
        {
            loading?(
                <p>Fetching....</p>
            ):(
                <div className='flex xl:gap-5 p-4 flex-row xl:flex:row'>
                    {
                    forecastData.map((day,index)=>{
                       let weatherIcons;
                       if(day.weather[0].main === "Clouds"){
                          weatherIcons = CloudIcon
                       }else if(day.weather[0].main === "Rain"){
                        weatherIcons = RainyIcon
                       }else if(day.weather[0].main === "Clear"){
                        weatherIcons =SunnyIcon
                       }

                        const date = new Date(day.dt_txt)
                        const foreCastDate = date.toLocaleDateString("en-Us", {weekday: "long", year:"numeric", month:"long",day:"numeric"})

                       return (
                        <div key={index} className='flex p-2 flex-col xl:gap-2 rounded items-center text-gray box-shadow-200 bg-slate-300 '>
                            <p className='font-semibold'>{foreCastDate}</p>
                            <img src={weatherIcons} alt='' className='w-[40px]'/>
                            <p className='font-semibold'>Max Temp.{(day.main.temp_max-273.15).toFixed(2)}°c</p>
                            <p className='font-semibold'>Min Temp{(day.main.temp_min-273.15).toFixed(2)}°c</p>
                            
                            <p>{day.weather[0].description}</p>

                            <p >{day.pop*100}%</p>
                        </div>
                       )

                    })
                    }
                </div>
            )
        }

    </div>
  )
}

export default ForeCast