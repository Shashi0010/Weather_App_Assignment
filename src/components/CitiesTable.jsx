import React , {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios";
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import InfiniteScroll from 'react-infinite-scroll-component'
import {BiSearch} from "react-icons/bi"
const CitiesTable = () => {
    
    const [cities, setCities] = useState([])
    const [searchCity,setSearchCity] = useState("")
    const [filterCities,setFilterCities] = useState([])
    const [sortCities,setSortCities] = useState("ASC")
    const [hasMore, setHasMore] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        getCitiesData();
        
    },[])

    const getCitiesData = () => {

        setTimeout(async () => {
            try {
                const res = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=10&offset=${(currentPage-1)*10}`)
    
                const newCities = res.data.results
            setCities(prevCities => [...prevCities, ...newCities]);
            setCurrentPage(prevPage => prevPage + 1);
                if(newCities.length === 0) {
                    setHasMore(false)
                }
    
            } catch(error) {
                console.log("Error Found Sorry For Inconvinience", error)
            }
       
        
        },1000)
    }    

    const handleSearchCity = (event) => {
        setSearchCity(event.target.value)
    }

    // console.log("city name", searchCity)
    // console.log("state",cities)
    

    // filtering

    useEffect(() => {
        const filterCity = cities.filter((city) => (
            city.name.toLowerCase().includes(searchCity.toLowerCase())
        ))

        setFilterCities(filterCity)

        /* console.log("filterCity",filterCity) */

    },[cities, searchCity])
    

    //Sorting

        const sorting = (col) =>{
            if (sortCities === "ASC"){
                const sorted=cities.sort((city) =>
                city.name.toLowerCase().includes(searchCity.toLowerCase()) > city.name.toLowerCase().includes(searchCity.toLowerCase()) ? 1 : -1
                );
                setCities(sorted);
                setSortCities("DSC");
            }
            if (sortCities === "DSC"){
                const sorted= cities.sort((city) =>
                city.name.toLowerCase().includes(searchCity.toLowerCase()) < city.name.toLowerCase().includes(searchCity.toLowerCase()) ? 1 : -1
                );
                setCities(sorted);
                setSortCities("ASC");
            }
        };
    
   
        /* console.log("filterCity",filterCity) */
   

    const handleRightClick = (e,cityName) => {
        if(e.button === 2){
            window.open(`/weather/${cityName}`, "_blank")
        }
    }
   // console.log("filter state",filterCity)

  return (
    <div className='p-2  bg-gray-500'>
    <div className='container mx-10 mt-20 border rounded-lg bg-gray-400'>
        <h2 className="text-center p-2 text-3xl font-bold mb-4">Cities Table</h2>
     <div className="flex flex-row justify-center  my-6" > 
       <div className='flex flex-row w-2/3 space-x-4 items-center justify-center'>
        <input 
          type='text'
          className="text-gray p-2 rounded-lg font-light w-[50%] shadow-xl" 
          placeholder="Search Cities....."
          onChange={handleSearchCity} 
          value={searchCity} 
        />
        <BiSearch size={30} className="cursor-pointer placeholder:lowercase focus:outline-none"/>
          
        <div className="icons-container">
            <button
              type="button"
              className="sorting-icon"
              onClick={() => sorting("cityName")}
            >
              <FcGenericSortingAsc size="20" />
            </button>
            <button
              type="button"
              className="sorting-icon"
              onClick={() => sorting("cityName")}
            >
              <FcGenericSortingDesc size="20" />
            </button>
          </div>
         </div> 
        </div> 
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <InfiniteScroll
                       dataLength={cities.length}
                       next={getCitiesData}
                       hasMore={hasMore}
                       loader={<h2 className='text-center font-bold'>Loading.....</h2>}
                       endMessage={
                        <p style={{textAlign:"center0"}}>
                        <b>No More Data for Fetching...</b>
                        </p>
                       }
                      >
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead>
                                <tr>
                                    <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500"
                                    >
                                    City
                                    </th>
                                    <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500"
                                    >
                                        Country
                                    </th>
                                    <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500"
                                    >
                                        Timezone
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {(filterCities,cities).map((city,index) =>(
                                    <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700" key={index}>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 
                                    cursor-pointer" onContextMenu={(e) =>handleRightClick(e,city.name)}>
                                        <Link to={`/weather/${city.name}`}>
                                        {city.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                        {city.cou_name_en}
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                        {city.timezone}
                                    </td>
                                </tr>    
                                ))} 
                            </tbody>
                        </table>
                        </InfiniteScroll>
                    </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  )
}

export default CitiesTable