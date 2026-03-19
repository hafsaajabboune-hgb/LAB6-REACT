import React, { useState } from 'react';
import useDonneesMeteo from './useDonneesMeteo';

function CarteMeteo() {
  // FR: États pour la recherche de ville
  // EN: States for city search
  const [villeRecherchee, setVilleRecherchee] = useState('Casablanca');
  const [inputVille, setInputVille] = useState('');
  
  // FR: Utilisation du hook personnalisé
  // EN: Using the custom hook
  const { infos, enChargement, probleme } = useDonneesMeteo(villeRecherchee);

  // FR: Liste des villes populaires pour raccourcis
  // EN: Popular cities list for shortcuts
  const villesPopulaires = ['Paris', 'Londres', 'Casablanca', 'New York'];

  return (
    <div style={{ padding: '20px', border: '2px solid teal', marginBottom: '20px' }}>
      <h3>Application Meteo</h3>
      
      {/* FR: Barre de recherche | EN: Search bar */}
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

      {/* FR: Raccourcis villes populaires | EN: Popular cities shortcuts */}
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

      {/* FR: Affichage conditionnel des données | EN: Conditional data display */}
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