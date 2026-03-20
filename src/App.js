import React, { useState } from 'react';
import GestionnaireTaches from './GestionnaireTaches';
import SurbrillanceTexte from './SurbrillanceTexte';
import ChronometreSession from './ChronometreSession';
import CarteMeteo from './CarteMeteo';
import RappelAutomatique from './RappelAutomatique';
import PreferencesUtilisateur from './PreferencesUtilisateur';
import HorlogeMondiale from './HorlogeMondiale';
import './App.css';

function App() {
  // State to show or hide all components / État pour afficher ou cacher tous les composants
  const [afficherComposants, setAfficherComposants] = useState(true);

  return (
    <div className="App" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: 'navy' }}>
        TP Hooks Personnalise
      </h1>
      
      {/* Global button to show/hide / Bouton global pour afficher/cacher */}
      <button 
        onClick={() => setAfficherComposants(!afficherComposants)}
        style={{ 
          marginBottom: '20px', 
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {afficherComposants ? 'Cacher' : 'Afficher'} les composants
      </button>

      {/* Conditional display of all components / Affichage conditionnel de tous les composants */}
      {afficherComposants && (
        <>
          <GestionnaireTaches />
          <SurbrillanceTexte />
          <ChronometreSession />
          <CarteMeteo />
          <RappelAutomatique />
          <PreferencesUtilisateur />
          <HorlogeMondiale />
        </>
      )}
    </div>
  );
}

export default App;
