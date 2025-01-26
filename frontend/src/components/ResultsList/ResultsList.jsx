import React from 'react';
import './ResultsList.scss';

const ResultsList = ({ results, onItemClick, activeCategories }) => {
  if (!results || Object.keys(results).length === 0) {
    return <p>Aucun résultat trouvé.</p>;
  }

  return (
    <div className="results-list">
      <h2>Résultats :</h2>
      {Object.entries(results).map(([category, items]) => {
        if (!activeCategories[category]) return null; // Ignore les catégories désactivées

        return (
          <div key={category} className="category-section">
            <h3>{category.toUpperCase()}</h3>
            {items.length > 0 ? (
              <ul>
                {items.map((item) => (
                  <li key={item.url}>
                    <button onClick={() => onItemClick(item, category)}>
                      {item.name || item.title || 'Unnamed'}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun résultat pour cette catégorie.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ResultsList;
