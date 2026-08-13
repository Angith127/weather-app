import React from 'react';
import './HourlyForecast.css';

function HourlyForecast({ hourly }) {
  const chartData = hourly.slice(0, 12);
  const temps = chartData.map(item => Math.round(item.temperature));
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = maxTemp - minTemp || 1;

  const chartPoints = chartData
    .map((item, index) => {
      const x = (index / Math.max(chartData.length - 1, 1)) * 100;
      const y = 100 - ((Math.round(item.temperature) - minTemp) / range) * 70 - 15;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="hourly-forecast">
      <div className="section-header">
        <h3>Hourly Forecast</h3>
        <span className="trend-label">Next 12 hours</span>
      </div>

      <div className="hourly-chart-wrap">
        <svg className="hourly-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Hourly temperature trend">
          <defs>
            <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <polyline
            points={`0,100 ${chartPoints} 100,100`}
            fill="url(#trendFill)"
            stroke="none"
          />
          <polyline
            points={chartPoints}
            fill="none"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {chartData.map((hour, index) => {
            const temp = Math.round(hour.temperature);
            const x = (index / Math.max(chartData.length - 1, 1)) * 100;
            const y = 100 - ((temp - minTemp) / range) * 70 - 15;
            return <circle key={hour.time} cx={x} cy={y} r="2.5" fill="#ffffff" />;
          })}
        </svg>
      </div>

      <div className="hourly-container">
        {chartData.map((hour, index) => (
          <div key={`${hour.time}-${index}`} className="hourly-card">
            <p className="time">{hour.time}</p>
            <img
              src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
              alt="hourly weather"
            />
            <p className="temp">{Math.round(hour.temperature)}°</p>
            <p className="pop">{hour.precipitation}% 🌧️</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;