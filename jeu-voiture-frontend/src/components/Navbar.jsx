import React from 'react';
import ScoreComponent from './ScoreComponent';

const Navbar = ({ score }) => {
  return (
    <nav style={{ backgroundColor: 'black', color: 'white', padding: '10px', border: '1px solid white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Mon jeu voiture</h1>
        <div><ScoreComponent score={score} /></div>
      </div>
    </nav>
  );
};

export default Navbar;
