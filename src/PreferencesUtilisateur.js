import React, { useEffect } from 'react';
import usePreferences from './usePreferences';

function PreferencesUtilisateur() {
  // Using custom hook for different preferences / Utilisation du hook personnalisé pour différentes préférences
  const [theme, setTheme] = usePreferences('theme', 'clair');
  const [langue, setLangue] = usePreferences('langue', 'francais');
  const [taillePolice, setTaillePolice] = usePreferences('taillePolice', 'moyenne');

  // Apply theme to document body / Application du thème au body du document
  const appliquerTheme = () => {
    const couleurs = {
      clair: { bg: '#ffffff', text: '#000000' },
      sombre: { bg: '#333333', text: '#ffffff' },
      bleu: { bg: '#e3f2fd', text: '#0d47a1' }
    };
    
    const themeActuel = couleurs[theme];
    document.body.style.backgroundColor = themeActuel.bg;
    document.body.style.color = themeActuel.text;
  };

  // Apply font size / Application de la taille de police
  const appliquerTaillePolice = () => {
    const tailles = {
      petite: '12px',
      moyenne: '16px',
      grande: '20px'
    };
    document.body.style.fontSize = tailles[taillePolice];
  };

  // Effect to apply changes when preferences change / Effet pour appliquer les changements quand les préférences changent
  useEffect(() => {
    appliquerTheme();
    appliquerTaillePolice();
  }, [theme, taillePolice]);

  return (
    <div style={{ padding: '20px', border: '2px solid green', marginBottom: '20px' }}>
      <h3>Preferences Utilisateur</h3>
      
      {/* Theme Section / Section Thème */}
      <div style={{ marginBottom: '15px' }}>
        <h4>Theme:</h4>
        <button onClick={() => setTheme('clair')} style={{ marginRight: '5px' }}>
          Clair
        </button>
        <button onClick={() => setTheme('sombre')} style={{ marginRight: '5px' }}>
          Sombre
        </button>
        <button onClick={() => setTheme('bleu')}>
          Bleu
        </button>
        <p>Theme actuel: {theme}</p>
      </div>

      {/* Language Section / Section Langue */}
      <div style={{ marginBottom: '15px' }}>
        <h4>Langue:</h4>
        <button onClick={() => setLangue('francais')} style={{ marginRight: '5px' }}>
          Francais
        </button>
        <button onClick={() => setLangue('anglais')} style={{ marginRight: '5px' }}>
          Anglais
        </button>
        <button onClick={() => setLangue('arabe')}>
          Arabe
        </button>
        <p>Langue actuelle: {langue}</p>
      </div>

      {/* Font Size Section / Section Taille de police */}
      <div style={{ marginBottom: '15px' }}>
        <h4>Taille de police:</h4>
        <button onClick={() => setTaillePolice('petite')} style={{ marginRight: '5px' }}>
          Petite
        </button>
        <button onClick={() => setTaillePolice('moyenne')} style={{ marginRight: '5px' }}>
          Moyenne
        </button>
        <button onClick={() => setTaillePolice('grande')}>
          Grande
        </button>
        <p>Taille actuelle: {taillePolice}</p>
      </div>

      {/* localStorage info / Information sur le localStorage */}
      <div style={{ marginTop: '20px', padding: '10px', border: '1px dashed gray' }}>
        <p>Les preferences sont sauvegardees dans localStorage</p>
        <p>Ouvrez les outils developpeur - Application - Storage - Local Storage</p>
      </div>
    </div>
  );
}

export default PreferencesUtilisateur;
