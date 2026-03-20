import { useState, useEffect } from 'react';

// Custom hook to manage preferences in localStorage / Hook personnalisé pour gérer les préférences dans localStorage
function usePreferences(nomPreference, valeurParDefaut) {
  // State initialization with localStorage value or default value / Initialisation de l'état avec la valeur du localStorage ou la valeur par défaut
  const [preference, setPreference] = useState(() => {
    try {
      const valeurStockee = localStorage.getItem(nomPreference);
      // Return stored value or default value / Retourne la valeur stockée ou la valeur par défaut
      return valeurStockee ? JSON.parse(valeurStockee) : valeurParDefaut;
    } catch (error) {
      console.log('Erreur de lecture localStorage');
      return valeurParDefaut;
    }
  });

  // Auto-save to localStorage when preference changes / Sauvegarde automatique dans localStorage quand la préférence change
  useEffect(() => {
    try {
      localStorage.setItem(nomPreference, JSON.stringify(preference));
      console.log(`Preference ${nomPreference} sauvegardee:`, preference);
    } catch (error) {
      console.log('Erreur de sauvegarde localStorage');
    }
  }, [nomPreference, preference]); // Dependencies / Dépendances

  // Return value and setter (like useState) / Retourne la valeur et le setter (comme useState)
  return [preference, setPreference];
}

export default usePreferences;
