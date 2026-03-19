import React, { useRef, useEffect, useState } from 'react';

// FR: Composant chronomètre avec compteur de rendus
// EN: Stopwatch component with render counter
function ChronometreSession() {
  const [temps, setTemps] = useState(0);        // FR: Temps écoulé | EN: Elapsed time
  const [actif, setActif] = useState(false);    // FR: État du chrono | EN: Chrono state
  
  // FR: useRef pour persister sans re-render
  // EN: useRef to persist without re-render
  const compteurRendus = useRef(0);    // FR: Compte les rendus | EN: Counts renders
  const intervalRef = useRef(null);    // FR: Référence vers l'intervalle | EN: Reference to interval

  // FR: useEffect s'exécute après chaque rendu
  // EN: useEffect runs after every render
  useEffect(() => {
    compteurRendus.current += 1; // FR: Incrémente à chaque rendu | EN: Increment on each render
    console.log(`Session #${compteurRendus.current} - Temps: ${temps}s`);

    // FR: Fonction de nettoyage (cleanup)
    // EN: Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // FR: Nettoie l'intervalle | EN: Clear interval
      }
    };
  }); // FR: Pas de dépendances = s'exécute à chaque rendu | EN: No deps = runs on each render

  const demarrerTimer = () => {
    if (!actif) {
      setActif(true);
      // FR: Sauvegarde de l'ID de l'intervalle dans useRef
      // EN: Save interval ID in useRef
      intervalRef.current = setInterval(() => {
        setTemps(t => t + 1); // FR: Incrémente le temps chaque seconde | EN: Increment time every second
      }, 1000);
    }
  };

  const arreterTimer = () => {
    setActif(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // FR: Arrête l'intervalle | EN: Stop interval
    }
  };

  const reinitialiser = () => {
    setTemps(0);
    setActif(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid purple', marginBottom: '20px' }}>
      <h3>Chronometre de Session</h3>
      <p>Temps: {temps} secondes</p>
      <p>Rendus: {compteurRendus.current} (voir console)</p>
      
      {/* FR:;;;;;;;;;;; Boutons avec états désactivés selon contexte | EN: Buttons with disabled states */}
      <button onClick={demarrerTimer} disabled={actif}>Demarrer</button>
      <button onClick={arreterTimer} disabled={!actif}>Pause</button>
      <button onClick={reinitialiser}>Reinitialiser</button>
    </div>
  );
}

export default ChronometreSession;