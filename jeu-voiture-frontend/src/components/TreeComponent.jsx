// TreeComponent.js
import React from 'react';
//import arbre1Image from '../images/alien.png';
import arbre1Image from '../images/arbre1.png';
//import arbre2Image from '../images/alien2.png';
import arbre2Image from '../images/arbre5.png';

const TreeComponent = ({ type, x, y }) => {
  let treeImage;

  switch (type) {
    case 1:
      treeImage = arbre1Image;
      break;
    case 2:
      treeImage = arbre2Image;
      break;
    default:
      treeImage = arbre1Image;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}px`, // Utilisation de la position y
        left: `${x}px`, // Utilisation de la position x
        width: '8em',
        height: '10em',
      }}
    >
      <img src={treeImage} alt="Arbre" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default TreeComponent;