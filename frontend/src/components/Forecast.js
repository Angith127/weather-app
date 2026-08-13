import React from 'react';
import './Forecast.css';

function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <p className="date">{new Date(day.date).toLocaleDateString()}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt="weather"
            />
            <p className="temp">{Math.round(day.temperature)}°C</p>
            <p className="description">{day.description}</p>
            <p className="humidity">💧 {day.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;