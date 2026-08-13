import React from 'react';
import './AirQuality.css';

function AirQuality({ airQuality }) {
  const getAQILabel = (aqi) => {
    const labels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    return labels[aqi - 1] || 'Unknown';
  };

  const getAQIColor = (aqi) => {
    const colors = ['#2ecc71', '#f39c12', '#e74c3c', '#c0392b', '#7f1d1d'];
    return colors[aqi - 1] || '#95a5a6';
  };

  return (
    <div className="air-quality">
      <h3>Air Quality Index</h3>
      <div className="aqi-card" style={{ borderColor: getAQIColor(airQuality.aqi) }}>
        <div className="aqi-value" style={{ color: getAQIColor(airQuality.aqi) }}>
          {airQuality.aqi}
        </div>
        <div className="aqi-label">{getAQILabel(airQuality.aqi)}</div>
        <div className="pollutants">
          <div className="pollutant">
            <span>PM2.5</span>
            <p>{airQuality.pm25} µg/m³</p>
          </div>
          <div className="pollutant">
            <span>PM10</span>
            <p>{airQuality.pm10} µg/m³</p>
          </div>
          <div className="pollutant">
            <span>O₃</span>
            <p>{airQuality.o3} µg/m³</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirQuality;