import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const POPULAR_CITIES = [
    'New York', 'London', 'Tokyo', 'Paris', 'Dubai',
    'Sydney', 'Singapore', 'Toronto', 'Berlin', 'Mumbai'
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 0) {
      const filtered = POPULAR_CITIES.filter(city =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    onSearch(city);
    setInput('');
    setShowSuggestions(false);
  };

  return (
    <div className="search-wrapper">
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for a city..."
            value={input}
            onChange={handleChange}
            onFocus={() => input && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {input && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => {
                setInput('');
                setSuggestions([]);
              }}
            >
              ✕
            </button>
          )}
        </div>
        <button type="submit" className="search-btn">Search</button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((city, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(city)}
            >
              📍 {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;