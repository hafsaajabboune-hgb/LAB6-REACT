import React, { useReducer, useState } from 'react';

// FR: État initial du gestionnaire de tâches
// EN: Initial state of the task manager
// AR: الحالة الأولية لمدير المهام
// ES: Estado inicial del gestor de tareas
const etatInitial = { 
  taches: [],        // FR: Liste des tâches | EN: Tasks list | AR: قائمة المهام | ES: Lista de tareas
  total: 0           // FR: Nombre total | EN: Total count | AR: العدد الإجمالي | ES: Conteo total
};

// FR: Reducer pour gérer les actions sur les tâches
// EN: Reducer to handle task actions
// AR: مختزل للتعامل مع إجراءات المهام
// ES: Reductor para manejar acciones de tareas
function reducteurTaches(etat, action) {
  switch (action.type) {
    case 'AJOUTER':   // FR: Ajouter une tâche | EN: Add a task | AR: إضافة مهمة | ES: Agregar tarea
      return {
        taches: [...etat.taches, { texte: action.payload, prioritaire: false }],
        total: etat.total + 1
      };
      
    case 'SUPPRIMER': // FR: Supprimer une tâche | EN: Delete a task | AR: حذف مهمة | ES: Eliminar tarea
      return {
        taches: etat.taches.filter((_, index) => index !== action.payload),
        total: etat.total - 1
      };
      
    case 'VIDER':     // FR: Vider toutes les tâches | EN: Clear all tasks | AR: حذف كل المهام | ES: Vaciar todas las tareas
      return { taches: [], total: 0 };
      
    case 'TOGGLE_PRIORITE': // FR: Basculer la priorité | EN: Toggle priority | AR: تبديل الأولوية | ES: Alternar prioridad
      const nouvellesTaches = etat.taches.map((tache, index) => {
        if (index === action.payload) {
          return { ...tache, prioritaire: !tache.prioritaire };
        }
        return tache;
      });
      return { ...etat, taches: nouvellesTaches };
      
    default: // FR: Action non reconnue | EN: Unknown action | AR: إجراء غير معروف | ES: Acción desconocida
      return etat;
  }
}

// FR: Composant principal du gestionnaire de tâches
// EN: Main task manager component
// AR: المكون الرئيسي لمدير المهام
// ES: Componente principal del gestor de tareas
function GestionnaireTaches() {
  // FR: Initialisation du useReducer avec l'état initial et le reducer
  // EN: Initializing useReducer with initial state and reducer
  const [etat, envoyer] = useReducer(reducteurTaches, etatInitial);
  const [nouvelleTache, setNouvelleTache] = useState('');

  // FR: Fonction pour ajouter une nouvelle tâche
  // EN: Function to add a new task
  const ajouterTache = () => {
    if (nouvelleTache.trim()) { // FR: Vérifier que la tâche n'est pas vide | EN: Check if task is not empty
      envoyer({ type: 'AJOUTER', payload: nouvelleTache });
      setNouvelleTache(''); // FR: Vider le champ après ajout | EN: Clear input after adding
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid orange', marginBottom: '20px' }}>
      <h3>Gestionnaire de Taches</h3>
      <p>Total: {etat.total} tache(s)</p>
      
      {/* FR: Champ de saisie pour nouvelle tâche | EN: Input field for new task */}
      <input
        value={nouvelleTache}
        onChange={(e) => setNouvelleTache(e.target.value)}
        placeholder="Nouvelle tache..."
      />
      
      {/* FR: Boutons d'action | EN: Action buttons */}
      <button onClick={ajouterTache}>Ajouter</button>
      <button onClick={() => envoyer({ type: 'VIDER' })}>Vider tout</button>
      
      {/* FR: Liste des tâches | EN: Tasks list */}
      <ul>
        {etat.taches.map((tache, index) => (
          <li key={index} style={{ 
            backgroundColor: tache.prioritaire ? '#fff3cd' : 'transparent',
            padding: '5px',
            margin: '5px 0',
            border: tache.prioritaire ? '1px solid #ffc107' : 'none'
          }}>
            {/* FR: Affichage de la tâche | EN: Display task */}
            <span style={{ fontWeight: tache.prioritaire ? 'bold' : 'normal' }}>
              {tache.texte} {tache.prioritaire ? ' (Prioritaire)' : ''}
            </span>
            
            {/* FR: Bouton pour============== basculer la priorité | EN: Button to toggle priority */}
            <button onClick={() => envoyer({ type: 'TOGGLE_PRIORITE', payload: index })}>
              {tache.prioritaire ? 'Retirer priorite' : 'Marquer prioritaire'}
            </button>
            
            {/* FR: Bouton pour supprimer | EN: Delete button */}
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