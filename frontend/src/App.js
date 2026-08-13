import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import HourlyForecast from './components/HourlyForecast';
import AirQuality from './components/AirQuality';
import SearchHistory from './components/SearchHistory';
import ThemeToggle from './components/ThemeToggle';
import UnitToggle from './components/UnitToggle';
import UVIndex from './components/UVIndex';
import ComfortIndex from './components/ComfortIndex';
import Alerts from './components/Alerts';

function App() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [unit, setUnit] = useState('celsius'); // celsius or fahrenheit

  const API_BASE_URL = 'http://127.0.0.1:8001/api';

  // Load saved data from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherHistory');
    const savedFavorites = localStorage.getItem('weatherFavorites');

    if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Save search history to localStorage
  useEffect(() => {
    localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Get geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.log('Geolocation not available, using default city');
          fetchWeather(city);
        }
      );
    } else {
      fetchWeather(city);
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const weatherRes = await fetch(
        `${API_BASE_URL}/weather/current/coords?lat=${lat}&lon=${lon}`
      );
      if (weatherRes.ok) {
        const weatherData = await weatherRes.json();
        setWeather(weatherData);
        setCity(weatherData.city);
        
        const forecastRes = await fetch(
          `${API_BASE_URL}/weather/forecast/${weatherData.city}`
        );
        if (forecastRes.ok) {
          const forecastData = await forecastRes.json();
          setForecast(forecastData.forecast || null);
          setHourly(forecastData.hourly || null);
        }
      }
    } catch (err) {
      console.error('Geolocation fetch error:', err);
      fetchWeather(city);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const weatherRes = await fetch(`${API_BASE_URL}/weather/current/${cityName}`);
      if (!weatherRes.ok) throw new Error('City not found');
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastRes = await fetch(`${API_BASE_URL}/weather/forecast/${cityName}`);
      if (forecastRes.ok) {
        const forecastData = await forecastRes.json();
        setForecast(forecastData.forecast || null);
        setHourly(forecastData.hourly || null);
      }

      addToHistory(cityName);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = (cityName) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(item => 
        item.city.toLowerCase() !== cityName.toLowerCase()
      );
      return [
        { city: cityName, timestamp: new Date().toLocaleString() },
        ...filtered
      ].slice(0, 10);
    });
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeather(searchCity);
  };

  const handleHistoryClick = (historyCity) => {
    handleSearch(historyCity);
  };

  const convertTemp = (celsius) => {
    return unit === 'fahrenheit' 
      ? (celsius * 9/5) + 32 
      : celsius;
  };

  const isFavorite = (cityName) => {
    return favorites.some(item => item.toLowerCase() === cityName.toLowerCase());
  };

  const toggleFavorite = (cityName) => {
    if (!cityName) return;
    setFavorites(prev => {
      const exists = prev.some(item => item.toLowerCase() === cityName.toLowerCase());
      if (exists) {
        return prev.filter(item => item.toLowerCase() !== cityName.toLowerCase());
      }
      return [cityName, ...prev].slice(0, 6);
    });
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <header className="header">
          <div className="header-left">
            <h1>🌤️ Weather Pro</h1>
          </div>
          <div className="header-controls">
            <UnitToggle unit={unit} setUnit={setUnit} />
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </header>

        <SearchBar onSearch={handleSearch} />

        <div className="utility-row">
          <div className="favorite-row">
            {favorites.length > 0 ? (
              favorites.map((favorite, index) => (
                <button
                  key={`${favorite}-${index}`}
                  className="favorite-chip"
                  onClick={() => handleHistoryClick(favorite)}
                  type="button"
                >
                  {favorite}
                </button>
              ))
            ) : (
              <span className="favorite-empty">No favorites yet</span>
            )}
          </div>

          {weather && (
            <button
              type="button"
              className={`favorite-toggle ${isFavorite(city) ? 'active' : ''}`}
              onClick={() => toggleFavorite(city)}
            >
              {isFavorite(city) ? '★ Saved' : '☆ Save city'}
            </button>
          )}
        </div>

        {error && <div className="error-message">❌ {error}</div>}
        
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {weather && !loading && (
          <>
            <CurrentWeather 
              weather={weather} 
              unit={unit}
              convertTemp={convertTemp}
            />

            <div className="insights-grid">
              <div className="insight-card">
                <span className="insight-label">Feels like</span>
                <strong>{Math.round(convertTemp(weather.feels_like))}°</strong>
              </div>
              <div className="insight-card">
                <span className="insight-label">Sunrise</span>
                <strong>{weather.sunrise ? new Date(weather.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</strong>
              </div>
              <div className="insight-card">
                <span className="insight-label">Sunset</span>
                <strong>{weather.sunset ? new Date(weather.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</strong>
              </div>
              <div className="insight-card">
                <span className="insight-label">Visibility</span>
                <strong>{weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : 'N/A'}</strong>
              </div>
            </div>

            {hourly && <HourlyForecast hourly={hourly} />}
            
            <Alerts weather={weather} />
            
            {weather.uvi && <UVIndex uvi={weather.uvi} />}
            
            <ComfortIndex weather={weather} convertTemp={convertTemp} unit={unit} />
            
            {airQuality && <AirQuality airQuality={airQuality} />}
            
            {forecast && (
              <Forecast 
                forecast={forecast}
                unit={unit}
                convertTemp={convertTemp}
              />
            )}
          </>
        )}

        {searchHistory.length > 0 && (
          <SearchHistory 
            history={searchHistory} 
            onHistoryClick={handleHistoryClick}
          />
        )}
      </div>
    </div>
  );
}

export default App;