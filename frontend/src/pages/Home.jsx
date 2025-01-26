import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import ResultsList from '../components/ResultsList/ResultsList';
import FilterBar from '../components/FilterBar/FilterBar';

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [activeCategories, setActiveCategories] = useState({
    people: true,
    planets: true,
    starships: true,
    vehicles: true,
    species: true,
    films: true,
  });
  const navigate = useNavigate();


  const handleSearch = async () => {
    if (!query) {
      alert('Veuillez entrer un terme de recherche.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/search?query=${query}`);
      //Si vous voulez faire un test sur l'API Node : mettre le port 3001 et lancer le serveur_Node.js
      const data = await res.json();
      setResults(data.results);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  const handleItemClick = (item, category) => {
    if (!item.url) {
      return;
    }
    const parts = item.url.split('/').filter(Boolean); 
    const id = parts[parts.length - 1];               

    navigate(`/detail/${category}/${id}`);
  };

  const toggleCategory = (cat) => {
    setActiveCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };
  
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Star Wars Rebels Alliance Search System</h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />

      <FilterBar
        activeCategories={activeCategories}
        toggleCategory={toggleCategory}
      />

      {results && (
        <ResultsList
          results={results}
          onItemClick={handleItemClick}
          activeCategories={activeCategories}
        />
      )}
    </div>
  );
};

export default Home;
