import React from 'react';
import './ThemeToggle.css';

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button 
      className="theme-toggle"
      onClick={() => setDarkMode(!darkMode)}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;