import React from 'react';
import './DetailView.scss';

const DetailView = ({ item, type, onBack }) => {
  if (!item) return null;

  return (
    <div className="detail-view">
      <div className="header">
        <h2 className="detail-title">Fiche détaillée ({type.toUpperCase()})</h2>
        <button className="back-button" onClick={onBack}>
          Retour
        </button>
      </div>

      <div className="detail-cards">
      {type === 'people' && (
        <div className="detail-card">
          <p className='name-detail-card'><strong>Nom :</strong> {item.name}</p>
          <div className='tab-detail-card'>
            <div>
              <p><strong>Date de naissance :</strong> {item.birth_year}</p>
              <p><strong>Genre :</strong> {item.gender}</p>
            </div>
            <div>
              <p><strong>Taille :</strong> {item.height} cm</p>
              <p><strong>Poids :</strong> {item.mass} kg</p>
            </div>
          </div>
          
          
          {item.homeworldObject && (
            <div className="detail-card">
              <h3>Planète</h3>
              <p><strong>Nom :</strong> {item.homeworldObject.name}</p>
              <p><strong>Population :</strong> {item.homeworldObject.population}</p>
              <p><strong>Terrain :</strong> {item.homeworldObject.terrain}</p>
            </div>
          )}
          <div className="detail-card-film">
          {item.filmsObjects.map((film, index) => (
            <div className="detail-card">
              <h3>Film {index + 1}</h3>
              <li key={index}>
                <strong>Titre :</strong> {film.title}
                <br />
                <strong>Date de sortie :</strong> {film.release_date}
              </li>
            </div>
          ))}
          </div>
          {(item.speciesObjects && item.speciesObjects.length > 0) ? (
            <div className="detail-card">
              <h3>Espèce(s)</h3>
              <ul>
                {item.speciesObjects.map((sp, index) => (
                  <li key={index}>{sp.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="detail-card">
              <h3>Espèce(s) :</h3>
              <p>Humaine</p>
            </div>
          )}
          {item.starshipsObjects && item.starshipsObjects.length > 0 && (
            <div className="detail-card">
              <h3>Vaisseau(s) Utilisé(s):</h3>
              <ul>
                {item.starshipsObjects.map((starships, index) => (
                  <li key={index}>{starships.name}</li>
                ))}
              </ul>
            </div>
          )}
          {item.vehiclesObjects && item.vehiclesObjects.length > 0 && (
            <div className="detail-card">
              <h3>Véhicule(s) Utilisé(s) :</h3>
              <ul>
                {item.vehiclesObjects.map((veh, index) => (
                  <li key={index}>
                    <strong>Nom du véhicule :</strong> {veh.name}, <strong>Model :</strong> {veh.model}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}
      </div>
      <div className="detail-cards">
      {type === 'films' && (
        <div className="detail-card">
          <p><strong>Titre :</strong> {item.title}</p>
          <p><strong>Numéro de l'épisode :</strong> {item.episode_id}</p>
          <p><strong>Directeur :</strong> {item.director}</p>
          <p><strong>Production :</strong> {item.producer}</p>
          <p><strong>Date de sortie :</strong> {item.release_date}</p>
          {(item.speciesObjects && item.speciesObjects.length > 0) ? (
            <div className="detail-card">
              <h3>Espèce(s)</h3>
              <ul>
                {item.speciesObjects.map((sp, index) => (
                  <li key={index}>{sp.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="detail-card">
              <h3>Espèce(s) :</h3>
              <p>Humaine</p>
            </div>
          )}
          {item.starshipsObjects && item.starshipsObjects.length > 0 && (
            <div className="detail-card">
              <h3>Vaisseau(s) Utilisé(s):</h3>
              <ul>
                {item.starshipsObjects.map((starships, index) => (
                  <li key={index}>{starships.name}</li>
                ))}
              </ul>
            </div>
          )}
          {item.vehiclesObjects && item.vehiclesObjects.length > 0 && (
            <div className="detail-card">
              <h3>Véhicule(s) Utilisé(s) :</h3>
              <ul>
                {item.vehiclesObjects.map((veh, index) => (
                  <li key={index}>
                    <strong>Nom du véhicule :</strong> {veh.name}, <strong>Model :</strong> {veh.model}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.charactersObjects && item.charactersObjects.length > 0 && (
            <div className="detail-card">
              <h3>Personnage(s) :</h3>
              <ul>
                {item.charactersObjects.map((char, index) => (
                  <li key={index}>{char.name}</li>
                ))}
              </ul>
            </div>
          )}
          {item.planetsObjects && item.planetsObjects.length > 0 && (
            <div className="detail-card">
            <h3>Planète(s)</h3>
            <ul>
              {item.planetsObjects.map((pl, index) => (
                <li key={index}>{pl.name}</li>
              ))}
            </ul>
            </div>
          )}
          
          <h3>Opening Crawl</h3>
          <pre>{item.opening_crawl}</pre>
        </div>
      )}
      </div>
      <div className="detail-cards">
      {type === 'starships' && (
        <div className="detail-card">
          <p><strong>Name :</strong> {item.name}</p>
          <p><strong>Modèle :</strong> {item.model}</p>
          <p><strong>Classe :</strong> {item.starship_class}</p>
          <p><strong>Manufacturer :</strong> {item.manufacturer}</p>
          <p><strong>Son prix :</strong> {item.cost_in_credits}</p>
          <p><strong>Taille :</strong> {item.length}</p>
          <p><strong>Nbr de personnel :</strong> {item.crew}</p>
          <p><strong>Nbr de passengers :</strong> {item.passengers}</p>
          <p><strong>Vitesse Max :</strong> {item.max_atmosphering_speed }</p>
          <p><strong>Son classement hyperdrive :</strong> {item.hyperdrive_rating }</p>
          <p><strong>Maximum Nbr de MGLT :</strong> {item.MGLT}</p>
          <p><strong>Cargo capacity :</strong> {item.cargo_capacity}</p>
          <p><strong>Consumables :</strong> {item.consumables}</p>
          {item.filmsObjects.map((film, index) => (
            <div className="detail-card">
            <h3>Film {index + 1}</h3>
            <li key={index}>
              <strong>Titre :</strong> {film.title}
              <br />
              <strong>Date de sortie :</strong> {film.release_date}
            </li>
            </div>
          ))}
        </div>
      )}
      </div>
      <div className="detail-cards">
      {type === 'vehicles' && (
        <div className="detail-card">
          <p><strong>Name :</strong> {item.name}</p>
          <p><strong>Modèle :</strong> {item.model}</p>
          <p><strong>Classe :</strong> {item.starship_class}</p>
          <p><strong>Manufacturer :</strong> {item.manufacturer}</p>
          <p><strong>Taille :</strong> {item.length}</p>
          <p><strong>Son prix :</strong> {item.cost_in_credits}</p>
          <p><strong>Nbr de personnel :</strong> {item.crew}</p>
          <p><strong>Nbr de passengers :</strong> {item.passengers}</p>
          <p><strong>Vitesse Max :</strong> {item.max_atmosphering_speed }</p>
          <p><strong>Cargo capacity :</strong> {item.cargo_capacity}</p>
          <p><strong>Consumables :</strong> {item.consumables}</p>
          {item.filmsObjects.map((film, index) => (
            <div className="detail-card">
            <h3>Film {index + 1}</h3>
            <li key={index}>
              <strong>Titre :</strong> {film.title}
              <br />
              <strong>Date de sortie :</strong> {film.release_date}
            </li>
            </div>
          ))}
        </div>
      )}
      </div>
      <div className="detail-cards">
      {type === 'species' && (
        <div className="detail-card">
          <p><strong>Nom :</strong> {item.name}</p>
          <p><strong>Classification :</strong> {item.classification}</p>
          <p><strong>Designation :</strong> {item.designation}</p>
          <p><strong>Taille :</strong> {item.average_height} cm</p>
          <p><strong>Espérence de vie :</strong> {item.average_lifespan } ans</p>
          <p><strong>Couleur des yeux :</strong> {item.eye_colors}</p>
          <p><strong>Couleur des cheveux :</strong> {item.hair_colors}</p>
          <p><strong>Couleur de peau :</strong> {item.skin_colors}</p>
          <p><strong>Langage :</strong> {item.language}</p>
          {item.homeworldObject && (
            <div className="detail-card">
              <h3>Leur Planète :</h3>
              <ul>
                <li><strong>Name :</strong> {item.homeworldObject.name}</li>
                <li><strong>Population :</strong> {item.homeworldObject.population}</li>
              </ul>
            </div>
          )}
          {item.peoplesObjects && item.peoplesObjects.length > 0 && (
            <div className="detail-card">
            <h3>Peuple(s)</h3>
            <ul>
              {item.peoplesObjects.map((people, index) => (
                <li key={index}>{people.name}</li>
              ))}
            </ul>
            </div>
          )}
          
          {item.filmsObjects.map((film, index) => (
            <div className="detail-card">
            <h3>Film {index + 1}</h3>
            <li key={index}>
              <strong>Titre :</strong> {film.title}
              <br />
              <strong>Date de sortie :</strong> {film.release_date}
            </li>
            </div>
          ))}
        </div>
      )}
      </div>
      <div className="detail-cards">
      {type === 'planets' && (
        <div className="detail-card">
          <p><strong>Name :</strong> {item.name}</p>
          <p><strong>Diamètre :</strong> {item.diameter} km</p>
          <p><strong>Nbr de Rotation :</strong> {item.rotation_period}</p>
          <p><strong>Jour en Orbite :</strong> {item.orbital_period } jours</p>
          <p><strong>Gravité :</strong> {item.gravity}</p>
          <p><strong>Nbr de Population :</strong> {item.population}</p>
          <p><strong>Climat :</strong> {item.climate}</p>
          <p><strong>Terrain :</strong> {item.terrain}</p>
          <p><strong>Surface de l'eau :</strong> {item.surface_water} %</p>
          {item.residentsObjects && item.residentsObjects.length > 0 && (
            <div className="detail-card">
              <h3>Résidents</h3>
              <ul>
                {item.residentsObjects.map((res, index) => (
                  <li key={index}>{res.name}</li>
                ))}
              </ul>
            </div>
          )}
          {item.filmsObjects.map((film, index) => (
            <div className="detail-card">
            <li key={index}>
              <strong>Title :</strong> {film.title}
              <br />
              <strong>Release date :</strong> {film.release_date}
            </li>
            </div>
          ))}
        </div>
      )}
      </div>

      <button onClick={onBack} className="back-button bottom">
        Retour aux résultats
      </button>
    </div>
  );
};

export default DetailView;

