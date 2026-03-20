import { useState, useEffect } from 'react';

// Custom hook to fetch weather data / Hook personnalisé pour récupérer des données météo
function useDonneesMeteo(ville) {
  // States to manage data, loading and errors / États pour gérer les données, chargement et erreurs
  const [infos, setInfos] = useState(null);        // Weather data / Données météo
  const [enChargement, setEnChargement] = useState(true); // Loading state / État de chargement
  const [probleme, setProbleme] = useState(null);  // Possible error / Erreur éventuelle

  // useEffect triggers when city changes / useEffect se déclenche quand la ville change
  useEffect(() => {
    // Async function to simulate an API / Fonction asynchrone pour simuler une API
    async function recupererMeteo() {
      setEnChargement(true); // Start loading / Début du chargement
      
      try {
        // Simulate network delay (1.5 seconds) / Simulation d'un délai réseau (1.5 secondes)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulated temperature database / Base de données simulée de températures
        const temperatures = {
          'paris': 18,
          'londres': 15,
          'casablanca': 25,
          'new york': 20
        };
        
        // Default temperature if city unknown / Température par défaut si ville inconnue
        const temp = temperatures[ville.toLowerCase()] || 22;
        
        // Update weather information / Mise à jour des informations météo
        setInfos({
          ville: ville,
          temperature: temp,
          condition: temp > 20 ? 'Ensoleille' : 'Nuageux',
          humidite: Math.floor(Math.random() * 40 + 40) // Random humidity / Humidité aléatoire
        });
        
        setProbleme(null); // No error / Pas d'erreur
      } catch (err) {
        setProbleme('Erreur de chargement'); // Error handling / Gestion d'erreur
      } finally {
        setEnChargement(false); // Loading finished / Fin du chargement
      }
    }

    if (ville) { // Only fetch if a city is specified / Ne faire la requête que si une ville est spécifiée
      recupererMeteo();
    }
  }, [ville]); // Dependency: city / Dépendance : la ville

  // Return data for the component / Retourne les données pour le composant
  return { infos, enChargement, probleme };
}

export default useDonneesMeteo;
