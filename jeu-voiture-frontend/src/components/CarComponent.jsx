// CarComponent.js
import React from 'react';
// import voitureImage from '../images/spaceship-net2.png';
import voitureImage from '../images/voiture2.png';

const CarComponent = ({ x, y, rotation }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}px`, // Utilisation de la position y
        left: `${x}px`, // Utilisation de la position x
        width: '9.5em',
        height: '8em',
        // pivoter sur la droite de 90 degre
        transform: `rotate(${rotation}deg)` // Rotation de la voiture
        }}
    > <img
    src={voitureImage}
    alt="voiture"
    style={{ width: '100%', height: '100%' }}
    />
    </div>
  );
};

export default CarComponent;
