import React from 'react';
import './Alerts.css';

function Alerts({ weather }) {
  const getAlerts = () => {
    const alerts = [];

    // Temperature alerts
    if (weather.temperature > 35) {
      alerts.push({
        type: 'danger',
        icon: '🌡️',
        title: 'Heat Alert',
        message: 'Extreme heat conditions. Stay hydrated!'
      });
    }

    if (weather.temperature < 0) {
      alerts.push({
        type: 'warning',
        icon: '❄️',
        title: 'Frost Alert',
        message: 'Sub-zero temperatures. Bundle up!'
      });
    }

    // Wind alerts
    if (weather.wind_speed > 10) {
      alerts.push({
        type: 'warning',
        icon: '💨',
        title: 'High Wind Alert',
        message: `Strong winds at ${weather.wind_speed} m/s`
      });
    }

    // Cloud/visibility alerts
    if (weather.clouds > 90) {
      alerts.push({
        type: 'info',
        icon: '☁️',
        title: 'Heavy Cloud Cover',
        message: 'Mostly overcast. Limited sunshine expected.'
      });
    }

    if (weather.visibility < 1000) {
      alerts.push({
        type: 'warning',
        icon: '🌫️',
        title: 'Low Visibility',
        message: 'Poor visibility. Drive with caution.'
      });
    }

    // Humidity alerts
    if (weather.humidity > 90) {
      alerts.push({
        type: 'info',
        icon: '💧',
        title: 'High Humidity',
        message: 'Very humid conditions. Feels muggy.'
      });
    }

    return alerts;
  };

  const alerts = getAlerts();

  if (alerts.length === 0) {
    return (
      <div className="alerts">
        <div className="no-alerts">
          <span className="no-alerts-icon">✅</span>
          <p>No weather alerts. Conditions are normal.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="alerts">
      <h3>⚠️ Weather Alerts</h3>
      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div key={index} className={`alert alert-${alert.type}`}>
            <span className="alert-icon">{alert.icon}</span>
            <div className="alert-content">
              <p className="alert-title">{alert.title}</p>
              <p className="alert-message">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;