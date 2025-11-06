import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherModule = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('London');

  const fetchWeather = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:3001/api/weather?city=${city}`);
      setData(response.data);
    } catch (err) {
      setError('Could not fetch weather data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div>
      <h2>Weather Information</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit" disabled={isLoading}>
          Get Weather
        </button>
      </form>

      {isLoading && <div className="loading">Loading...</div>}
      
      {error && <div className="error">{error}</div>}

      {data && !isLoading && (
        <div className="weather-data">
          <h3>{data.city}, {data.country}</h3>
          <p>Temperature: {data.temperature}°C</p>
          <p>Condition: {data.description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherModule;