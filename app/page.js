"use client"
import React, {useState } from "react";


export default function Home() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleButtonClick = async () => {
    setError("");
    setWeather(null);
    if (!location) {
      setError("Please enter a location.");
      return;
    }
    try {
      const apiKey = "8ce2af65cfc2163ba47b486914077ff0"; 
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Location not found");
      }
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <input className="border text-black border-gray-300 p-1.5 rounded bg-white outline-none" type="text" placeholder="Enter your location" value={location} onChange={handleInputChange} />
          <button onClick={handleButtonClick} className="bg-white text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200"><img src="./Assets/search.png" alt="Search" /></button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {weather && (
          <div className="mt-4">
            <div className="mt-4 flex justify-center items-center">
              <img className="scale-150 w-20 h-20" src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt={weather?.weather[0].description} />
            </div>
              <div className="flex flex-col items-center justify-center"><p className="mb-4  capitalize flex flex-col items-center justify-center text-gray-200">{weather.weather[0].description}</p></div>
              <div className="p-4 flex flex-col items-center justify-center gap-2">
                <p className="text-4xl font-semibold font-sans">{weather.main.temp}°C</p>
                <p className="text-xl font-extralight font-poppins">{weather.name}</p>
              </div>
              
              <div className="mt-2 flex flex-row items-center justify-center gap-4">
                <div className="flex flex-col items-center"><span>wind speed</span> <span className="text-purple-200">{weather.wind.speed} m/s</span></div>
                <div className="flex flex-col items-center"><span>humidity</span> <span className="text-purple-200">{weather.main.humidity}%</span></div>
                <div className="flex flex-col items-center"><span>wind direction</span> <span className="text-purple-200">{weather.wind.deg}°</span></div>
              </div>
          </div>
        )}
      </div>
    </main>
  );
}
// {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//   <div className="w-full max-w-sm bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 text-white p-6 rounded-2xl shadow-lg">
//     {/* Input */}
//     <div className="flex items-center gap-2 mb-6">
//       <input
//         type="text"
//         placeholder="Enter location"
//         className="flex-1 px-3 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-white outline-none"
//       />
//       <button className="bg-white text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200">
//         🔍
//       </button>
//     </div>

//     {/* Weather Icon */}
//     <div className="flex justify-center mb-3">
//       <div className="w-20 h-20">🌥️</div>
//     </div>

//     {/* Weather Info */}
//     // <p className="text-lg mb-1">{weather?.weather[0].description}</p>
//     // <p className="text-4xl font-bold mb-2">{weather?.main.temp}°C</p>
//     // <p className="text-xl font-semibold mb-4">{weather?.name}</p>

//     {/* Extra Info */}
//   //   <div className="grid grid-cols-3 gap-3 text-sm text-gray-200 border-t border-white/20 pt-3">
//   //     <p>💨 {weather?.wind.speed} m/s</p>
//   //     <p>🧭 {weather?.wind.deg}°</p>
//   //     <p>💧 {weather?.main.humidity}%</p>
//   //   </div>
//   // </div>
// </div> */}