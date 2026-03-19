import { useState, useEffect } from 'react';

// FR: Hook personnalisé pour gérer les préférences dans localStorage
// EN: Custom hook to manage preferences in localStorage
// AR: خطاف مخصص لإدارة التفضيلات في التخزين المحلي
// ES: Hook personalizado para gestionar preferencias en localStorage
function usePreferences(nomPreference, valeurParDefaut) {
  // FR: Initialisation de l'état avec la valeur du localStorage ou la valeur par défaut
  // EN: State initialization with localStorage value or default value
  const [preference, setPreference] = useState(() => {
    try {
      const valeurStockee = localStorage.getItem(nomPreference);
      // FR: Retourne la valeur stockée ou la valeur par défaut
      // EN: Return stored value or default value
      return valeurStockee ? JSON.parse(valeurStockee) : valeurParDefaut;
    } catch (error) {
      console.log('Erreur de lecture localStorage');
      return valeurParDefaut;
    }
  });

  // FR:,,,,,,,,, Sauvegarde automatique dans localStorage quand la préférence change
  // EN: Auto-save..////////// to localStorage when preference changes
  useEffect(() => {
    try {
      localStorage.setItem(nomPreference, JSON.stringify(preference));
      console.log(`Preference ${nomPreference} sauvegardee:`, preference);
    } catch (error) {
      console.log('Erreur de sauvegarde localStorage');
    }
  }, [nomPreference, preference]); // FR: Dépendances | EN: Dependencies

  // FR: Retourne la valeur et le setter (comme useState)...///,,,,,,
  // EN: Return value and setter (like useState)
  return [preference, setPreference];
}

export default usePreferences;