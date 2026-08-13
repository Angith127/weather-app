import React from 'react';
import './ComfortIndex.css';

function ComfortIndex({ weather, convertTemp, unit }) {
  // Calculate dew point (simplified formula)
  const calculateDewPoint = (temp, humidity) => {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
    return (b * alpha) / (a - alpha);
  };

  // Calculate heat index
  const calculateHeatIndex = (temp, humidity) => {
    if (temp < 27) return temp;
    const c1 = -42.379;
    const c2 = 2.04901523;
    const c3 = 10.14333127;
    const c4 = -0.22475541;
    const c5 = -0.00683783;
    const c6 = -0.05481717;
    const c7 = 0.00122874;
    const c8 = 0.00085282;
    const c9 = -0.00000199;

    const t = temp;
    const rh = humidity;

    return (
      c1 +
      c2 * t +
      c3 * rh +
      c4 * t * rh +
      c5 * t * t +
      c6 * rh * rh +
      c7 * t * t * rh +
      c8 * t * rh * rh +
      c9 * t * t * rh * rh
    );
  };

  const temp = weather.temperature;
  const humidity = weather.humidity;
  const dewPoint = calculateDewPoint(temp, humidity);
  const heatIndex = calculateHeatIndex(temp, humidity);

  const getComfortLevel = (heatIndex) => {
    if (heatIndex < 27) return { level: 'Comfortable', emoji: '😊', color: '#2ecc71' };
    if (heatIndex < 32) return { level: 'Warm', emoji: '🙂', color: '#f39c12' };
    if (heatIndex < 41) return { level: 'Hot', emoji: '😓', color: '#e74c3c' };
    return { level: 'Very Hot', emoji: '🥵', color: '#c0392b' };
  };

  const comfort = getComfortLevel(heatIndex);

  return (
    <div className="comfort-index">
      <h3>Comfort Metrics</h3>
      <div className="comfort-grid">
        <div className="comfort-card">
          <span className="comfort-icon">💧</span>
          <p className="comfort-label">Dew Point</p>
          <p className="comfort-value">
            {Math.round(convertTemp(dewPoint))}°{unit === 'celsius' ? 'C' : 'F'}
          </p>
          <p className="comfort-description">
            {dewPoint < 10 ? 'Dry air' : dewPoint < 20 ? 'Comfortable' : 'Humid'}
          </p>
        </div>

        <div className="comfort-card">
          <span className="comfort-icon">🌡️</span>
          <p className="comfort-label">Heat Index</p>
          <p className="comfort-value">
            {Math.round(convertTemp(heatIndex))}°{unit === 'celsius' ? 'C' : 'F'}
          </p>
          <p className="comfort-description">Feels like temperature</p>
        </div>

        <div className="comfort-card" style={{ borderColor: comfort.color }}>
          <span className="comfort-icon">{comfort.emoji}</span>
          <p className="comfort-label">Comfort Level</p>
          <p className="comfort-value" style={{ color: comfort.color }}>
            {comfort.level}
          </p>
          <p className="comfort-description">Overall feel</p>
        </div>
      </div>
    </div>
  );
}

export default ComfortIndex;