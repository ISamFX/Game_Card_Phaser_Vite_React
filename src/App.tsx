import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './vite.svg';
import phaserLogo from './assets/phaser-seeklogo.png';
import GameCard from '../src/components/GameCard';
import './App.css';


function App() {
  const [count, setCount] = useState(0);
  const [showGameCard, setShowGameCard] = useState(false); // состояние для отображения GameCard

  const handleGameButtonClick = () => {
    setShowGameCard(true);
  };

  const handleGameEnd = () => {
    setShowGameCard(false); // Скрываем GameCard после завершения игры
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://phaser.io/" target="_blank">
          <img src={phaserLogo} className="logo react" alt="Phaser logo" />
        </a>
      </div>
      <h1>Vite + React + Phaser</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
        {showGameCard ? (
          <button onClick={handleGameEnd}>
            GAME OVER
          </button>
        ) : (
          <button onClick={handleGameButtonClick}>
            GAME
          </button>
        )}
      </div>
      {showGameCard && <GameCard onGameEnd={handleGameEnd} />} {/* Передаем функцию завершения игры */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;


