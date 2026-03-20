import React, { useRef } from 'react';

// Component to demonstrate useRef usage / Composant pour démontrer l'utilisation de useRef
function SurbrillanceTexte() {
  // Creating references to DOM elements / Création de références vers les éléments DOM
  const paragrapheRef = useRef(null); // Reference to paragraph / Référence vers le paragraphe
  const titreRef = useRef(null);      // Reference to title / Référence vers le titre

  // Function to modify element styles / Fonction pour modifier le style des éléments
  const mettreEnSurbrillance = (cible) => {
    if (cible === 'paragraphe' && paragrapheRef.current) {
      // Direct DOM manipulation via useRef / Modification directe du DOM via useRef
      paragrapheRef.current.style.backgroundColor = 'yellow';
      paragrapheRef.current.style.fontWeight = 'bold';
    } else if (cible === 'titre' && titreRef.current) {
      titreRef.current.style.color = 'red';
      titreRef.current.style.fontSize = '28px';
    }
  };

  // Reset to default styles / Remet les styles par défaut
  const reinitialiser = () => {
    if (paragrapheRef.current) {
      paragrapheRef.current.style.backgroundColor = 'transparent';
      paragrapheRef.current.style.fontWeight = 'normal';
    }
    if (titreRef.current) {
      titreRef.current.style.color = 'black';
      titreRef.current.style.fontSize = '24px';
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid blue', marginBottom: '20px' }}>
      {/* The ref attribute binds the DOM element to the reference / L'attribut ref lie l'élément DOM à la référence */}
      <h3 ref={titreRef}>Section de Demonstration</h3>
      <p ref={paragrapheRef}>
        Ce texte peut etre mis en surbrillance ou modifie en cliquant sur les boutons.
        Le useRef permet de manipuler directement ces elements DOM.
      </p>
      
      {/* Control buttons / Boutons de contrôle */}
      <button onClick={() => mettreEnSurbrillance('titre')}>Modifier titre</button>
      <button onClick={() => mettreEnSurbrillance('paragraphe')}>Surligner texte</button>
      <button onClick={reinitialiser}>Reinitialiser</button>
    </div>
  );
}

export default SurbrillanceTexte;
