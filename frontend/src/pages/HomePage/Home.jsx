import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import ResultsList from '../../components/ResultsList/ResultsList';
import FilterBar from '../../components/FilterBar/FilterBar';

import './Home.scss';

const Home = () => {
  const [query, setQuery] = useState('');
  const { credentials } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [activeCategories, setActiveCategories] = useState({
    people: true,
    planets: true,
    starships: true,
    vehicles: true,
    species: true,
    films: true,
  });

  const handleSearch = async () => {
    if (!query) {
      alert('Veuillez entrer un terme de recherche.');
      return;
    }

    setError(null); 
    setResults(null); 
    setLoading(true);

    const MIN_LOADING_TIME = 3000; 
    const startTime = Date.now(); 

    try {
      const res = await fetch(`http://localhost:3000/search?query=${query}`, {
        //Si vous voulez test pour le server Node, modifier le port en 3001
        method: 'GET',
        headers: {
          username: credentials.username,
          password: credentials.password,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setResults(data.results);

        const elapsedTime = Date.now() - startTime;
        const remainingTime = MIN_LOADING_TIME - elapsedTime;

        if (remainingTime > 0) {
          setTimeout(() => setLoading(false), remainingTime);
        } else {
          setLoading(false);
        }
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Erreur lors de la recherche.');
        setLoading(false);
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      setLoading(false);
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
    <div className="home">
      <h1 className="home-title">Système de Recherche de la Résistance</h1>
      <p className="home-subtitle">Rechercher des personnages, des planètes, des vaisseaux et plus encore...</p>
      <p className='home-subtitle'>Que la force soit avec la resistance !</p>

      <SearchBar 
        query={query} 
        setQuery={setQuery} 
        onSearch={handleSearch} 
      />
      
      <FilterBar 
        activeCategories={activeCategories} 
        toggleCategory={toggleCategory} 
      />

      {error && <p className="error-message">{error}</p>}

      {loading ? ( 
        <div className="loading-container">
          <img
            src="/assets/Stars_Wars.gif" 
            alt="Chargement..."
            className="loading-gif"
          />
        </div>
      ) : results && Object.keys(results).length > 0 ? (
        <ResultsList
          results={results}
          onItemClick={handleItemClick}
          activeCategories={activeCategories}
        />
      ) : (
        !error && <p className="no-results">Aucun résultat pour cette recherche.</p>
      )}
    </div>
  );
};

export default Home;
