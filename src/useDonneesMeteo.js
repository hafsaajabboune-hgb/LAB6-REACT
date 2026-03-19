import { useState, useEffect } from 'react';

// FR: Hook personnalisé pour récupérer des données météo
// EN: Custom hook to fetch weather data
// AR: خطاف مخصص لجلب بيانات الطقس
// ES: Hook personalizado para obtener datos meteorológicos
function useDonneesMeteo(ville) {
  // FR: États pour gérer les données, chargement et erreurs
  // EN: States to manage data, loading and errors
  const [infos, setInfos] = useState(null);        // FR: Données météo | EN: Weather data
  const [enChargement, setEnChargement] = useState(true); // FR: État de chargement
  const [probleme, setProbleme] = useState(null);  // FR: Erreur éventuelle | EN: Possible error

  // FR: useEffect se déclenche quand la ville change
  // EN: useEffect triggers when city changes
  useEffect(() => {
    // FR: Fonction asynchrone pour simuler une API
    // EN: Async function to simulate an API
    async function recupererMeteo() {
      setEnChargement(true); // FR: Début du chargement | EN: Start loading
      
      try {
        // FR: Simulation d'un délai réseau (1.5 secondes)
        // EN: Simulate network delay (1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // FR: Base de données simulée de températures
        // EN: Simulated temperature database
        const temperatures = {
          'paris': 18,
          'londres': 15,
          'casablanca': 25,
          'new york': 20
        };
        
        // FR: Température par défaut si ville inconnue
        // EN: Default temperature if city unknown
        const temp = temperatures[ville.toLowerCase()] || 22;
        
        // FR: Mise à jour des informations météo
        // EN: Update weather information
        setInfos({
          ville: ville,
          temperature: temp,
          condition: temp > 20 ? 'Ensoleille' : 'Nuageux',
          humidite: Math.floor(Math.random() * 40 + 40) // FR: Humidité aléatoire
        });
        
        setProbleme(null); // FR: Pas d'erreur | EN: No error
      } catch (err) {
        setProbleme('Erreur de chargement'); // FR: Gestion d'erreur | EN: Error handling
      } finally {
        setEnChargement(false); // FR: Fin du chargement | EN: Loading finished
      }
    }

    if (ville) { // FR: Ne faire la requête que ;;;;;;;;;;;;;si une ville est spécifiée
      recupererMeteo();
    }
  }, [ville]); // FR: Dépendance ,,,;;;;;;;;: la ville | EN: Dependency: city

  // FR: Retourne les données pour le composant.........
  // EN: Return data for the component///////////
  return { infos, enChargement, probleme };
}

export default useDonneesMeteo;