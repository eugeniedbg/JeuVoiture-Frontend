// FruitComponent.js
import React from 'react';
import bananeImage from '../images/banane.png';
import kiwiImage from '../images/kiwi.png';

const FruitComponent = ({ type, x, y }) => {
  let fruitImage;

  switch (type) {
    case 1:
      fruitImage = bananeImage;
      break;
    case 2:
      fruitImage = kiwiImage;
      break;
    default:
      fruitImage = kiwiImage;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}px`, // Utilisation de la position y
        left: `${x}px`, // Utilisation de la position x
        width: '6em',
        height: '6em',
      }}
    >
      <img src={fruitImage} alt="Fruit" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default FruitComponent;