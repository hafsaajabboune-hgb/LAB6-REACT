import React, { useState, useEffect } from 'react';

function HorlogeMondiale() {
  // FR: Liste des villes avec leurs décalages UTC
  // EN: List of cities with their UTC offsets
  const [villes, setVilles] = useState([
    { nom: 'Paris', decalage: 1 },
    { nom: 'Londres', decalage: 0 },
    { nom: 'New York', decalage: -4 },
    { nom: 'Tokyo', decalage: 9 },
    { nom: 'Sydney', decalage: 11 },
    { nom: 'Moscou', decalage: 3 },
    { nom: 'Casablanca', decalage: 1 },
    { nom: 'Pekin', decalage: 8 }
  ]);

  const [heures, setHeures] = useState({});        // FR: Stocke les heures pour chaque ville
  const [villeRecherche, setVilleRecherche] = useState(''); // FR: Input pour nouvelle ville
  const [nouveauDecalage, setNouveauDecalage] = useState(0); // FR: Décalage pour nouvelle ville
  const [format24h, setFormat24h] = useState(true); // FR: Format 12h/24h

  // FR: Mise à jour des heures chaque seconde
  // EN: Update times every second
  useEffect(() => {
    const mettreAJourHeures = () => {
      const maintenant = new Date();
      const nouvellesHeures = {};
      
      villes.forEach(ville => {
        // FR: Calcul de l'heure locale basée sur le décalage UTC
        // EN: Calculate local time based on UTC offset
        const utc = maintenant.getTime() + (maintenant.getTimezoneOffset() * 60000);
        const heureLocale = new Date(utc + (3600000 * ville.decalage));
        
        nouvellesHeures[ville.nom] = {
          heures: heureLocale.getHours(),
          minutes: heureLocale.getMinutes(),
          secondes: heureLocale.getSeconds()
        };
      });
      
      setHeures(nouvellesHeures);
    };

    mettreAJourHeures(); // FR: Mise à jour immédiate | EN: Immediate update
    const interval = setInterval(mettreAJourHeures, 1000); // FR: Puis chaque seconde

    return () => clearInterval(interval); // FR:;;;;;[[[[[[[[]]]]]]]] Nettoyage à la destruction
  }, [villes]);

  // FR: Ajouter une nouvelle ville\\\\\\\///////
  // EN: Add a new city\\\\\\\////////
  const ajouterVille = () => {
    if (villeRecherche.trim() && !villes.find(v => v.nom.toLowerCase() === villeRecherche.toLowerCase())) {
      setVilles([...villes, { nom: villeRecherche, decalage: parseInt(nouveauDecalage) || 0 }]);
      setVilleRecherche('');
      setNouveauDecalage(0);
    }
  };

  // FR: Supprimer une ville0--=====
  // EN: Delete a city====--00000
  const supprimerVille = (nomVille) => {
    setVilles(villes.filter(v => v.nom !== nomVille));
  };

  // FR: Formater l'heure selon le choix 12h/24h
  // EN: Format time according to 12h/24h choice............
  const formaterHeure = (heures, minutes, secondes) => {
    if (format24h) {
      return `${heures.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')}`;
    } else {
      const periode = heures >= 12 ? 'PM' : 'AM';
      const heures12 = heures % 12 || 12;
      return `${heures12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')} ${periode}`;
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid brown', marginBottom: '20px' }}>
      <h3>Horloge Mondiale</h3>
      
      {/* FR: Bouton de changement de format     hafsaa fst sir ,,...*/}
      <div style={{ marginBottom: '15px' }}>
        <button onClick={() => setFormat24h(!format24h)}>
          Format: {format24h ? '24h' : '12h'}
        </button>
      </div>

      {/* FR: Formulaire d'ajout de ville,,,,,,......./////// */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Ajouter une ville:</h4>
        <input
          value={villeRecherche}
          onChange={(e) => setVilleRecherche(e.target.value)}
          placeholder="Nom de la ville..."
        />
        <input
          type="number"
          value={nouveauDecalage}
          onChange={(e) => setNouveauDecalage(e.target.value)}
          placeholder="Decalage UTC"
          style={{ width: '100px', marginLeft: '5px' }}
        />
        <button onClick={ajouterVille} style={{ marginLeft: '5px' }}>
          Ajouter
        </button>
      </div>

      {/* FR: Grille d'affichage des horloges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
        {villes.map((ville) => (
          <div key={ville.nom} style={{ 
            padding: '10px', 
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{ville.nom}</strong>
              <button onClick={() => supprimerVille(ville.nom)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                X
              </button>
            </div>
            {heures[ville.nom] && (
              <div style={{ fontSize: '1.2em', marginTop: '5px' }}>
                {formaterHeure(heures[ville.nom].heures, heures[ville.nom].minutes, heures[ville.nom].secondes)}
              </div>
            )}
            <div style={{ fontSize: '0.8em', color: '#666' }}>
              UTC {ville.decalage >= 0 ? '+' : ''}{ville.decalage}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
        <p>L'horloge se met a jour automatiquement chaque seconde</p>
        <p>Les fuseaux horaires sont bases sur le decalage UTC</p>
      </div>
    </div>
  );
}

export default HorlogeMondiale;