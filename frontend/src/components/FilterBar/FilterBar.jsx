import React from 'react';
import './FilterBar.scss';

const categories = ['people', 'planets', 'starships', 'vehicles', 'species', 'films'];

const FilterBar = ({ activeCategories, toggleCategory }) => {
  return (
    <div className="filter-bar">
      {categories.map((cat) => (
        <label key={cat} className="filter-item">
          <input
            type="checkbox"
            checked={activeCategories[cat]}
            onChange={() => toggleCategory(cat)}
          />
          {cat.toUpperCase()}
        </label>
      ))}
    </div>
  );
};

export default FilterBar;
