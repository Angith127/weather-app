import React from 'react';
import './CurrentWeather.css';

function CurrentWeather({ weather, unit, convertTemp }) {
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const temp = Math.round(convertTemp(weather.temperature));
  const feelsLike = Math.round(convertTemp(weather.feels_like));
  const temperatureMood = temp >= 30 ? 'Very warm' : temp >= 22 ? 'Comfortable' : temp >= 12 ? 'Mild' : 'Cool';
  const summary = `${temperatureMood} conditions with ${weather.description}. Humidity is ${weather.humidity}% and wind is ${weather.wind_speed} m/s.`;

  const outfitSuggestion =
    temp >= 30
      ? 'Light clothing, sunglasses, and plenty of water.'
      : temp >= 22
        ? 'A breathable T-shirt and light layers are ideal.'
        : temp >= 12
          ? 'A light jacket or hoodie will be comfortable.'
          : 'Warm layers and a coat will keep you comfortable.';

  return (
    <div className="current-weather">
      <div className="location-header">
        <div>
          <h2>{weather.city}, {weather.country}</h2>
          <p className="last-updated">
            Updated: {new Date(weather.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <span className="temp">{temp}°{unit === 'celsius' ? 'C' : 'F'}</span>
          <span className="description">{weather.description}</span>
          <span className="feels-like">Feels like {feelsLike}°</span>
        </div>
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
            alt="weather icon"
          />
        </div>
      </div>

      <div className="weather-summary">
        <span className="summary-badge">Today</span>
        <p>{summary}</p>
      </div>

      <div className="outfit-card">
        <div className="outfit-icon">👕</div>
        <div className="outfit-copy">
          <span className="outfit-label">What to wear</span>
          <p>{outfitSuggestion}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail">
          <span>💧 Humidity</span>
          <p>{weather.humidity}%</p>
        </div>
        <div className="detail">
          <span>💨 Wind Speed</span>
          <p>{weather.wind_speed} m/s</p>
        </div>
        <div className="detail">
          <span>🧭 Direction</span>
          <p>{getWindDirection(weather.wind_degrees || 0)}</p>
        </div>
        <div className="detail">
          <span>📊 Pressure</span>
          <p>{weather.pressure} mb</p>
        </div>
        <div className="detail">
          <span>☁️ Cloud Cover</span>
          <p>{weather.clouds}%</p>
        </div>
        <div className="detail">
          <span>👁️ Visibility</span>
          <p>{(weather.visibility / 1000).toFixed(1)} km</p>
        </div>
      </div>

      {weather.sunrise && weather.sunset && (
        <div className="sun-times">
          <div className="sun-item">
            <span>🌅 Sunrise</span>
            <p>{new Date(weather.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
          <div className="sun-item">
            <span>🌇 Sunset</span>
            <p>{new Date(weather.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;