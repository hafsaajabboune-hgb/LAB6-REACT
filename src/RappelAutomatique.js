import { useState, useEffect } from 'react';

function RappelAutomatique() {
  const [message, setMessage] = useState('');
  const [secondesRestantes, setSecondesRestantes] = useState(5);
  const [rappelActif, setRappelActif] = useState(false);

  // Timer management with automatic cleanup / Gestion du minuteur avec nettoyage automatique
  useEffect(() => {
    let minuteur;

    if (rappelActif && secondesRestantes > 0) {
      // Create interval if reminder is active / Création de l'intervalle si le rappel est actif
      minuteur = setInterval(() => {
        setSecondesRestantes(s => s - 1);
      }, 1000);
    } else if (secondesRestantes === 0) {
      // Trigger reminder / Déclenchement du rappel
      setMessage("C'est l'heure de faire une pause!");
      setRappelActif(false);
    }

    // Cleanup function (crucial to avoid memory leaks) / Fonction de nettoyage (cruciale pour éviter les fuites mémoire)
    return () => {
      if (minuteur) {
        clearInterval(minuteur);
        console.log('Nettoyage du minuteur');
      }
    };
  }, [rappelActif, secondesRestantes]);

  const demarrerRappel = () => {
    setRappelActif(true);
    setSecondesRestantes(5);
    setMessage('');
  };

  const annulerRappel = () => {
    setRappelActif(false);
    setSecondesRestantes(5);
    setMessage('Rappel annule');
  };

  return (
    <div style={{ padding: '20px', border: '2px solid crimson', marginBottom: '20px' }}>
      <h3>Rappel Automatique</h3>
      {rappelActif ? (
        <p>Rappel dans {secondesRestantes} secondes...</p>
      ) : (
        <p>{message || 'Aucun rappel actif'}</p>
      )}
      <button onClick={demarrerRappel} disabled={rappelActif}>
        Demarrer rappel (5s)
      </button>
      <button onClick={annulerRappel} disabled={!rappelActif}>
        Annuler
      </button>
    </div>
  );
}

export default RappelAutomatique;
