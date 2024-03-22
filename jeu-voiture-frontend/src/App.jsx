import React, { useState } from 'react';
import Game from './components/GameComponent';
import Navbar from './components/Navbar';

const App = () => {
  const [score, setScore] = useState(0);

  return (
    <div>
      <Navbar score={score} />
      <Game setScore={setScore} />
    </div>
  );
};

export default App;
