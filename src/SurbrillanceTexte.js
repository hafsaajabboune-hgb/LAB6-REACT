import React, { useRef } from 'react';

// FR: Composant pour démontrer l'utilisation de useRef
// EN: Component to demonstrate useRef usage
// AR: مكون لإظهار استخدام useRef
// ES: Componente para demostrar el uso de useRef
function SurbrillanceTexte() {
  // FR: Création de références vers les éléments DOM
  // EN: Creating references to DOM elements
  const paragrapheRef = useRef(null); // FR: Référence vers le paragraphe | EN: Reference to paragraph
  const titreRef = useRef(null);      // FR: Référence vers le titre | EN: Reference to title

  // FR: Fonction pour modifier le style des éléments
  // EN: Function to modify element styles
  const mettreEnSurbrillance = (cible) => {
    if (cible === 'paragraphe' && paragrapheRef.current) {
      // FR: Modification directe du DOM via useRef
      // EN: Direct DOM manipulation via useRef
      paragrapheRef.current.style.backgroundColor = 'yellow';
      paragrapheRef.current.style.fontWeight = 'bold';
    } else if (cible === 'titre' && titreRef.current) {
      titreRef.current.style.color = 'red';
      titreRef.current.style.fontSize = '28px';
    }
  };

  // FR: Remet les styles par défaut
  // EN: Reset to default styles
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
      {/* FR: L'attribut ref lie l'élément DOM à la référence */}
      {/* EN: The ref attribute binds the DOM element to the reference */}
      <h3 ref={titreRef}>Section de Demonstration</h3>
      <p ref={paragrapheRef}>
        Ce texte peut etre mis en surbrillance ou modifie en cliquant sur les boutons.
        Le useRef permet de manipuler directement ces elements DOM.
      </p>
      
      {/* FR: Boutons de contrôle | EN: Control buttons......../////////// */}
      <button onClick={() => mettreEnSurbrillance('titre')}>Modifier titre</button>
      <button onClick={() => mettreEnSurbrillance('paragraphe')}>Surligner texte</button>
      <button onClick={reinitialiser}>Reinitialiser</button>
    </div>
  );
}

export default SurbrillanceTexte;