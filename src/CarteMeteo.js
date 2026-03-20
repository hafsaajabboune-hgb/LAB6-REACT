import React, { useState } from 'react';
import useDonneesMeteo from './useDonneesMeteo';

function CarteMeteo() {
  // States for city search / États pour la recherche de ville
  const [villeRecherchee, setVilleRecherchee] = useState('Casablanca');
  const [inputVille, setInputVille] = useState('');
  
  // Using the custom hook / Utilisation du hook personnalisé
  const { infos, enChargement, probleme } = useDonneesMeteo(villeRecherchee);

  // Popular cities list for shortcuts / Liste des villes populaires pour raccourcis
  const villesPopulaires = ['Paris', 'Londres', 'Casablanca', 'New York'];

  return (
    <div style={{ padding: '20px', border: '2px solid teal', marginBottom: '20px' }}>
      <h3>Application Meteo</h3>
      
      {/* Search bar / Barre de recherche */}
      <div>
        <input
          value={inputVille}
          onChange={(e) => setInputVille(e.target.value)}
          placeholder="Nom de la ville..."
        />
        <button onClick={() => setVilleRecherchee(inputVille)}>
          Rechercher
        </button>
      </div>

      {/* Popular cities shortcuts / Raccourcis villes populaires */}
      <div style={{ marginTop: '10px' }}>
        {villesPopulaires.map(ville => (
          <button 
            key={ville}
            onClick={() => {
              setVilleRecherchee(ville);
              setInputVille(ville);
            }}
            style={{ marginRight: '5px' }}
          >
            {ville}
          </button>
        ))}
      </div>

      {/* Conditional data display / Affichage conditionnel des données */}
      <div style={{ marginTop: '20px' }}>
        {enChargement && <p>Chargement des donnees...</p>}
        {probleme && <p style={{color: 'red'}}>{probleme}</p>}
        {infos && (
          <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '10px' }}>
            <h4>{infos.ville}</h4>
            <p>Temperature: {infos.temperature}°C</p>
            <p>{infos.condition}</p>
            <p>Humidite: {infos.humidite}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarteMeteo;
