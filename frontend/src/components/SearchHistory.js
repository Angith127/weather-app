import React from 'react';
import './SearchHistory.css';

function SearchHistory({ history, onHistoryClick }) {
  return (
    <div className="search-history">
      <h3>📍 Recent Searches</h3>
      <div className="history-items">
        {history.map((item, index) => (
          <button
            key={index}
            className="history-item"
            onClick={() => onHistoryClick(item.city)}
            title={item.timestamp}
          >
            {item.city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;