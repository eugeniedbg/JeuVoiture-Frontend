import React, { useEffect, useState } from 'react';
import CarComponent from './CarComponent';
import FruitComponent from './FruitComponent';
import TreeComponent from './TreeComponent';
import '../GameComponent.css';

const Game = () => {
  const [bonuses, setBonuses] = useState([]);
  const [maluses, setMaluses] = useState([]);
  const [carPosition, setCarPosition] = useState(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [carRotation, setCarRotation] = useState(0); // Nouvel état pour stocker la rotation de la voiture

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          moveCar('bottom');
          setCarRotation(-90); // Rotation vers le haut
          break;
        case 'ArrowDown':
          moveCar('top');
          setCarRotation(90); // Rotation vers le bas
          break;
        case 'ArrowLeft':
          moveCar('left');
          setCarRotation(180); // Rotation vers la gauche
          break;
        case 'ArrowRight':
          moveCar('right');
          setCarRotation(0); // Rotation vers la droite
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // L'effet ne s'exécute qu'une seule fois au montage du composant

  const moveCar = async (direction) => {
    try {
      const response = await fetch(`http://localhost:8080/game/commande/${direction}`);
      const newData = await response.json();
      console.log('New data:', newData);
      const positionCarData = newData.find(item => item.Car); 

      setBonuses(newData.filter(item => item.Bonus)); // Mise à jour des bonus
      setMaluses(newData.filter(item => item.Malus)); // Mise à jour des malus
      setCarPosition({ x: positionCarData.x, y: positionCarData.y }); // Mise à jour de la position de la voiture
      setScore(newData.find(item => item.Score).score); // Mise à jour du score
    } catch (error) {
      console.error('Error moving car:', error);
    }
  };


  const startGame = async () => {
    try {
      const responseStop = await fetch('http://localhost:8080/game/commande/stop');
      const dataStop = await responseStop.json();
      console.log('Game stopped:', dataStop);
      const response = await fetch('http://localhost:8080/game/commande/debut');
      const data = await response.json();
      console.log('Game started:', data);
      const positionCarData = data.find(item => item.Car); 
      console.log('positionCarData:', positionCarData);
      const scoreData = data.find(item => item.Score); 
      console.log(data);
      console.log('log : ',data.filter(item => item.Bonus));
      const bonus = data.filter(item => item.Bonus);
      for (let i = 0; i < bonus.length; i++) {
        console.log('bonus : ',bonus[i].x,bonus[i].y)
        bonuses.push({x:bonus[i].x,y:bonus[i].y,type:bonus[i].type})
      }
      console.log('list bonus : ',bonuses)
      //setBonuses(data.filter(item => item.Bonus)); // Filtrer uniquement les bonus
      console.log('Bonuses:', bonuses);
      setMaluses(data.filter(item => item.Malus)); // Filtrer uniquement les malus

      setCarPosition({ x: positionCarData.x, y: positionCarData.y });
      setScore(scoreData.score);
      setGameStarted(true);
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };


  return (
    <div className="Game">
      {!gameStarted && <button onClick={startGame}>Start game</button>}
      {carPosition !== null && <CarComponent x={carPosition.x} y={carPosition.y} rotation={carRotation} />} 
      {bonuses.map((bonus, index) => (
      <FruitComponent key={index} x={bonus.x} y={bonus.y} type={bonus.type} />
      ))}
      {maluses.map((malus, index) => (
        <TreeComponent key={index} x={malus.x} y={malus.y} type={malus.type} />
      ))}
    </div>
  );
};

export default Game;
