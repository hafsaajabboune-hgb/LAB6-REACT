import React, { useRef, useEffect, useState } from 'react';

// Stopwatch component with render counter / Composant chronomètre avec compteur de rendus
function ChronometreSession() {
  const [temps, setTemps] = useState(0);        // Elapsed time / Temps écoulé
  const [actif, setActif] = useState(false);    // Chrono state / État du chrono
  
  // useRef to persist without re-render / useRef pour persister sans re-render
  const compteurRendus = useRef(0);    // Counts renders / Compte les rendus
  const intervalRef = useRef(null);    // Reference to interval / Référence vers l'intervalle

  // useEffect runs after every render / useEffect s'exécute après chaque rendu
  useEffect(() => {
    compteurRendus.current += 1; // Increment on each render / Incrémente à chaque rendu
    console.log(`Session #${compteurRendus.current} - Temps: ${temps}s`);

    // Cleanup function / Fonction de nettoyage
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clear interval / Nettoie l'intervalle
      }
    };
  }); // No deps = runs on each render / Pas de dépendances = s'exécute à chaque rendu

  const demarrerTimer = () => {
    if (!actif) {
      setActif(true);
      // Save interval ID in useRef / Sauvegarde de l'ID de l'intervalle dans useRef
      intervalRef.current = setInterval(() => {
        setTemps(t => t + 1); // Increment time every second / Incrémente le temps chaque seconde
      }, 1000);
    }
  };

  const arreterTimer = () => {
    setActif(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Stop interval / Arrête l'intervalle
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
      
      {/* Buttons with disabled states / Boutons avec états désactivés selon contexte */}
      <button onClick={demarrerTimer} disabled={actif}>Demarrer</button>
      <button onClick={arreterTimer} disabled={!actif}>Pause</button>
      <button onClick={reinitialiser}>Reinitialiser</button>
    </div>
  );
}

export default ChronometreSession;
