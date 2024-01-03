import { useEffect, useState } from "react";
import {FaWind} from "react-icons/fa"
import {FaDroplet} from "react-icons/fa6"
import {FaCompass} from "react-icons/fa"

const App = () => {
  const [data, setData] = useState([]);
  const url =
    "https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13/kerala";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b9412172c1msh51981e8b89020bdp107981jsn56afa8dc0afb",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  const weatherData = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setData([result]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    weatherData();
  }, []);
  console.log(data);
  return (
    <>
      <div className="bg-hero bg-cover h-screen flex flex-col items-center justify-center space-y-8">
        <form>
          <div className="relative">
            <input
              className="bg-black bg-opacity-70 w-80 p-2 rounded-full placeholder:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-300 sm:w-96 md:w-[600px] lg:w-[750px]"
              type="text"
              placeholder="Find your location..."
              required
            />
            <button className="absolute bg-blue-500 text-white rounded-full px-4 py-1 end-1.5 bottom-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm md:px-7">
              Find
            </button>
          </div>
        </form>

        {data.map((data) => (
          <div className="w-80 p-4 bg-opacity-60 text-gray-300 bg-gray-800 rounded-xl space-y-5 sm:w-96 md:w-[600px] lg:w-[750px]">
            <div>
              <h3 className="text-lg  font-medium">
                {data.location.name}
              </h3>
            </div>
            <div>
              <h1 className="text-8xl font-semibold">
                {data.current.temp_c}°C
              </h1>
              <img
                className="w-24"
                src={`${data.current.condition.icon}`}
                alt=""
              />
            </div>
            <div className="flex justify-between px-2">
              <p className="flex items-center"><FaWind className="mx-2"/>{data.current.wind_degree}°</p>
              <p className="flex items-center"><FaDroplet className="mx-2"/>{data.current.humidity}km/hr</p>
              <p className="flex items-center"><FaCompass className="mx-2"/>{data.current.wind_dir}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default App;
