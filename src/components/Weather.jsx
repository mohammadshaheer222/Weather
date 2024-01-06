import { useEffect, useState } from "react";
import { FaWind } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaCompass } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const App = () => {
  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [submit, setSubmit] = useState(false);
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13q=${searchField}`;
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
      setData([result]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    weatherData();
  }, []);

  const changingEvent = (event) => {
    setSearchField(
      event.target.value.charAt(0).toLocaleUpperCase() +
        event.target.value.slice(1)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clickEvent();
  };
  const clickEvent = () => {
    weatherData();
    setSearchField("");
    setSubmit(true);
  };

  return (
    <>
      <div className="bg-hero bg-cover h-screen flex flex-col items-center justify-center space-y-20 text-gray-600">
        <div className="flex items-center justify-center ">
          <h1 className="text-4xl font-bold md:text-6xl md:font-bold ">
            Weather Forecast
          </h1>
        </div>
        {data.map((data) => (
          <div
            key={data.current.last_updated_epoch}
            className=" w-64 p-4 bg-opacity-60 text-gray-300 bg-gray-800 rounded-xl space-y-5 border-2 border-gray-500 md:w-96 md:p-7 md:space-y-5"
          >
            <div className="md:flex md:justify-center md:items-center md:flex-col">
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <FaLocationDot className="absolute inset-y-3.5 start-3 text-white" />
                  <input
                    className="bg-gray-800 bg-opacity-30 w-56 p-2 rounded-md placeholder:text-xs px-10 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 md:w-80"
                    type="text"
                    placeholder="Find your location"
                    required
                    value={searchField}
                    onChange={changingEvent}
                  />
                  <FaSearch
                    onClick={clickEvent}
                    className="absolute inset-y-3.5 end-3 text-white cursor-pointer"
                  />
                </div>
              </form>
            </div>
            {submit ? (
              <div>
                <div>
                  <h3 className="text-lg font-medium">{data.location.name}</h3>
                </div>
                <div>
                  <h1 className="text-7xl font-semibold">
                    {data.current.temp_c}°C
                  </h1>

                  <img
                    className="w-24"
                    src={`${data.current.condition.icon}`}
                    alt=""
                  />
                  <p className="text-lg font-semibold ml-5 mb-8">
                    {data.current.condition.text}
                  </p>
                </div>
                <div className="flex justify-between px-2">
                  <p className="flex items-center">
                    <FaWind className="mx-2" />
                    {data.current.wind_degree}°
                  </p>
                  <p className="flex items-center">
                    <FaDroplet className="mx-2" />
                    {data.current.humidity}km/hr
                  </p>
                  <p className="flex items-center">
                    <FaCompass className="mx-2" />
                    {data.current.wind_dir}
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default App;
