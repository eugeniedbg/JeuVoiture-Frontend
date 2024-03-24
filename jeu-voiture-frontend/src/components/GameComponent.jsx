// GameComponent.jsx
import React, { useEffect, useState } from 'react';
import CarComponent from './CarComponent';
import FruitComponent from './FruitComponent';
import TreeComponent from './TreeComponent';
import '../GameComponent.css';

const Game = ({ setScore }) => {
  const [bonuses, setBonuses] = useState([]);
  const [maluses, setMaluses] = useState([]);
  const [carPosition, setCarPosition] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [carRotation, setCarRotation] = useState(0);
  const [gameOver, setGameOver] = useState(false);

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
  }, [gameStarted]);

  const moveCar = async (direction) => {
    try {
      const response = await fetch(`http://localhost:8080/game/commande/${direction}`);
      const newData = await response.json();
      console.log('New data:', newData);
      // Vérifie si le jeu est terminé
      const gameResult = newData.find(item => item.Game);
      console.log('Game result:', gameResult);
      if (gameResult && gameResult.Game === "Jeux terminé") {
        setGameOver(true);
      }
      const positionCarData = newData.find(item => item.Car); 

      setBonuses(newData.filter(item => item.Bonus));
      setMaluses(newData.filter(item => item.Malus));
      setCarPosition({ x: positionCarData.x, y: positionCarData.y });
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
      const scoreData = data.find(item => item.Score); 

      setBonuses(data.filter(item => item.Bonus));
      setMaluses(data.filter(item => item.Malus));
      setCarPosition({ x: positionCarData.x, y: positionCarData.y });
      setScore(scoreData.score); // Initialisation du score
      setGameStarted(true);
      setGameOver(false); // Réinitialiser le statut du jeu terminé
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const restartGame = () => {
    setGameOver(false); // Réinitialise l'état de fin de partie
    startGame(); // Recommencer le jeu
  }

  return (
    <div className="Game">
      {!gameStarted && !gameOver && <button onClick={startGame}>Start game</button>}
      {gameOver && <button onClick={restartGame}>Recommencer la partie</button>}
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
