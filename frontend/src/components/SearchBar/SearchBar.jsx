import React from 'react';
import './SearchBar.scss'; 

const SearchBar = ({ query, setQuery, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher dans la base de données..."
      />
      <button
        className="search-button"
        onClick={onSearch}
      >
        Rechercher
      </button>
    </div>
  );
};

export default SearchBar;
