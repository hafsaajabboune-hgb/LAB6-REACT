import React, { useReducer, useState } from 'react';

// Initial state for the task manager / État initial du gestionnaire de tâches
const etatInitial = { 
  taches: [],        // List of tasks / Liste des tâches
  total: 0           // Total count / Nombre total
};

// Reducer to handle task actions / Reducer pour gérer les actions sur les tâches
function reducteurTaches(etat, action) {
  switch (action.type) {
    case 'AJOUTER':   // Add a task / Ajouter une tâche
      return {
        taches: [...etat.taches, { texte: action.payload, prioritaire: false }],
        total: etat.total + 1
      };
      
    case 'SUPPRIMER': // Delete a task / Supprimer une tâche
      return {
        taches: etat.taches.filter((_, index) => index !== action.payload),
        total: etat.total - 1
      };
      
    case 'VIDER':     // Clear all tasks / Vider toutes les tâches
      return { taches: [], total: 0 };
      
    case 'TOGGLE_PRIORITE': // Toggle priority / Basculer la priorité
      const nouvellesTaches = etat.taches.map((tache, index) => {
        if (index === action.payload) {
          return { ...tache, prioritaire: !tache.prioritaire };
        }
        return tache;
      });
      return { ...etat, taches: nouvellesTaches };
      
    default: // Unknown action / Action non reconnue
      return etat;
  }
}

// Main task manager component / Composant principal du gestionnaire de tâches
function GestionnaireTaches() {
  // Initialize useReducer with initial state and reducer / Initialisation du useReducer
  const [etat, envoyer] = useReducer(reducteurTaches, etatInitial);
  const [nouvelleTache, setNouvelleTache] = useState('');

  // Function to add a new task / Fonction pour ajouter une nouvelle tâche
  const ajouterTache = () => {
    if (nouvelleTache.trim()) { // Check if task is not empty / Vérifier que la tâche n'est pas vide
      envoyer({ type: 'AJOUTER', payload: nouvelleTache });
      setNouvelleTache(''); // Clear input after adding / Vider le champ après ajout
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid orange', marginBottom: '20px' }}>
      <h3>Gestionnaire de Taches</h3>
      <p>Total: {etat.total} tache(s)</p>
      
      {/* Input field for new task / Champ de saisie pour nouvelle tâche */}
      <input
        value={nouvelleTache}
        onChange={(e) => setNouvelleTache(e.target.value)}
        placeholder="Nouvelle tache..."
      />
      
      {/* Action buttons / Boutons d'action */}
      <button onClick={ajouterTache}>Ajouter</button>
      <button onClick={() => envoyer({ type: 'VIDER' })}>Vider tout</button>
      
      {/* Tasks list / Liste des tâches */}
      <ul>
        {etat.taches.map((tache, index) => (
          <li key={index} style={{ 
            backgroundColor: tache.prioritaire ? '#fff3cd' : 'transparent',
            padding: '5px',
            margin: '5px 0',
            border: tache.prioritaire ? '1px solid #ffc107' : 'none'
          }}>
            {/* Display task / Affichage de la tâche */}
            <span style={{ fontWeight: tache.prioritaire ? 'bold' : 'normal' }}>
              {tache.texte} {tache.prioritaire ? ' (Prioritaire)' : ''}
            </span>
            
            {/* Button to toggle priority / Bouton pour basculer la priorité */}
            <button onClick={() => envoyer({ type: 'TOGGLE_PRIORITE', payload: index })}>
              {tache.prioritaire ? 'Retirer priorite' : 'Marquer prioritaire'}
            </button>
            
            {/* Delete button / Bouton pour supprimer */}
            <button onClick={() => envoyer({ type: 'SUPPRIMER', payload: index })}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GestionnaireTaches;
