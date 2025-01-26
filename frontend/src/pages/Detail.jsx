import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailView from '../components/DetailView/DetailView';
import { fetchResource, fetchMultipleResources } from '../utils/fetchSWAPI';

const Detail = () => {
  const { category, id } = useParams(); 
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/${category}/${id}/`);
        const data = await response.json();

        let detailedItem = { ...data };

        if (data.homeworld) {
          const homeworldData = await fetchResource(data.homeworld);
          detailedItem.homeworldObject = homeworldData;
        }
        if (data.films && data.films.length > 0) {
          const filmsData = await fetchMultipleResources(data.films);
          detailedItem.filmsObjects = filmsData;
        }
        if (data.residents && data.residents.length > 0) {
          const residentsData = await fetchMultipleResources(data.residents);
          detailedItem.residentsObjects = residentsData;
        }
        if (data.species && data.species.length > 0) {
          const speciesData = await fetchMultipleResources(data.species);
          detailedItem.speciesObjects = speciesData;
        }
        if (data.vehicles && data.vehicles.length > 0) {
          const vehiclesData = await fetchMultipleResources(data.vehicles);
          detailedItem.vehiclesObjects = vehiclesData;
        }
        if (data.starships && data.starships.length > 0) {
          const starshipsData = await fetchMultipleResources(data.starships);
          detailedItem.starshipsObjects = starshipsData;
        }
        if (data.characters && data.characters.length > 0) {
          const charactersData = await fetchMultipleResources(data.characters);
          detailedItem.charactersObjects = charactersData;
        }
        if (data.planets && data.planets.length > 0) {
          const planetsData = await fetchMultipleResources(data.planets);
          detailedItem.planetsObjects = planetsData;
        }
        if (data.people && data.people.length > 0) {
          const peopleData = await fetchMultipleResources(data.people);
          detailedItem.peopleObjects = peopleData;
        }

        setItem(detailedItem);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails :', error);
      }
    };

    loadItem();
  }, [category, id]);

  const handleBack = () => {
    navigate('/');
  };

  if (!item) {
    return <p>Chargement...</p>;
  }

  return (
    <DetailView
      item={item}
      type={category}
      onBack={handleBack}
    />
  );
};

export default Detail;
