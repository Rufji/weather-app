"use client"
import {React, useState } from "react";


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
      const apiKey = "a49bed1b6c9041ccaa401825250509"; 
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container text-center">
        <h1 className="text-4xl font-bold mb-4">Weather App</h1>
        <p className="mt-4 mb-4">Get the latest weather updates for your location.</p>
        <input type="text" placeholder="Enter your location" value={location} onChange={handleInputChange} />
        <button onClick={handleButtonClick} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Get Weather</button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {weather && (
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </main>
  );
}
