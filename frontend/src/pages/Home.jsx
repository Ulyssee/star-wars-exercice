import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar/SearchBar';
import ResultsList from '../components/ResultsList/ResultsList';
import FilterBar from '../components/FilterBar/FilterBar';

const Home = () => {
  const [query, setQuery] = useState('');
  const { credentials } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState(null); // Stocke les résultats de l'API
  const [error, setError] = useState(null); // Stocke les erreurs éventuelles
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

    setError(null); // Réinitialise les erreurs
    setResults(null); // Réinitialise les résultats

    try {
      const res = await fetch(`http://localhost:3000/search?query=${query}`, {
        method: 'GET',
        headers: {
          username: credentials.username,
          password: credentials.password,
        },
      });

      if (res.ok) {
        const data = await res.json();

        // Stocke directement les résultats dans le state
        setResults(data.results);
        console.log('Résultats enregistrés dans le state:', data.results); // Debug
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Erreur lors de la recherche.');
      }
    } catch (err) {
      console.error('Erreur lors de la recherche :', err);
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
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

      {/* Barre de recherche */}
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {/* Barre de filtre */}
      <FilterBar activeCategories={activeCategories} toggleCategory={toggleCategory} />

      {/* Affichage des erreurs */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Affichage des résultats */}
      {results && Object.keys(results).length > 0 ? (
        <ResultsList
          results={results}
          onItemClick={handleItemClick}
          activeCategories={activeCategories}
        />
      ) : (
        !error && <p>Aucun résultat pour cette recherche.</p>
      )}
    </div>
  );
};

export default Home;
