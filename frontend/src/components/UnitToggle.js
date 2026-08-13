import React from 'react';
import './UnitToggle.css';

function UnitToggle({ unit, setUnit }) {
  return (
    <div className="unit-toggle">
      <button
        className={`unit-btn ${unit === 'celsius' ? 'active' : ''}`}
        onClick={() => setUnit('celsius')}
      >
        °C
      </button>
      <span className="separator">|</span>
      <button
        className={`unit-btn ${unit === 'fahrenheit' ? 'active' : ''}`}
        onClick={() => setUnit('fahrenheit')}
      >
        °F
      </button>
    </div>
  );
}

export default UnitToggle;