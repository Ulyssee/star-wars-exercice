import React from 'react';
import './ResultsList.scss';

const ResultsList = ({ results, onItemClick, activeCategories }) => {
  return (
    <div className="results-list">
      <h2>Résultats :</h2>
      <ul>
        {Object.entries(results).map(([category, items]) => {
          if (!activeCategories[category]) return null;

          return (
            <li key={category}>
              <h3>{category.toUpperCase()}</h3>
              <ul>
                {items.map((item, idx) => (
                  <li key={idx}>
                    <button onClick={() => onItemClick(item, category)}>
                      {item.name || item.title || 'Unnamed'}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResultsList;
