import React from 'react';
import './UVIndex.css';

function UVIndex({ uvi }) {
  const getUVLevel = (index) => {
    if (index < 3) return { level: 'Low', color: '#2ecc71', advice: 'No protection needed' };
    if (index < 6) return { level: 'Moderate', color: '#f39c12', advice: 'Wear sunscreen' };
    if (index < 8) return { level: 'High', color: '#e74c3c', advice: 'Extra sun protection needed' };
    if (index < 11) return { level: 'Very High', color: '#c0392b', advice: 'Limit sun exposure' };
    return { level: 'Extreme', color: '#7f1d1d', advice: 'Avoid sun exposure' };
  };

  const uvData = getUVLevel(uvi);

  return (
    <div className="uv-index">
      <div className="uv-card" style={{ borderColor: uvData.color }}>
        <div className="uv-header">
          <span className="uv-icon">☀️</span>
          <h3>UV Index</h3>
        </div>
        
        <div className="uv-value">
          <span className="uv-number" style={{ color: uvData.color }}>
            {uvi}
          </span>
          <span className="uv-level">{uvData.level}</span>
        </div>

        <div className="uv-bar">
          <div 
            className="uv-fill" 
            style={{ 
              width: `${(uvi / 11) * 100}%`,
              background: uvData.color
            }}
          ></div>
        </div>

        <div className="uv-scale">
          <span>0</span>
          <span>11+</span>
        </div>

        <div className="uv-advice" style={{ backgroundColor: `${uvData.color}15` }}>
          <span className="advice-icon">💡</span>
          <p>{uvData.advice}</p>
        </div>
      </div>
    </div>
  );
}

export default UVIndex;