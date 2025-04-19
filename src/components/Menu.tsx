import React from 'react';

type MenuRenderProps = {
  type: 'start' | 'end';
  isWin?: boolean;
  onStartGame: () => void;
  onRestartGame: () => void;
  removeMenu: () => void; // Добавляем функцию для удаления меню
};

const Menu: React.FC<MenuRenderProps> = ({ type, isWin, onStartGame, onRestartGame, removeMenu }) => {
  const handleStartGame = () => {
    onStartGame();
    removeMenu(); // Удаляем меню после начала игры
  };

  const handleRestartGame = () => {
    onRestartGame();
    removeMenu();
  };

  return (
    <div 
      id="menu-container" 
      style={{ 
        position: 'absolute', 
        top: 60, 
        left: 1070, 
        transform: 'translate(-50%, -50%)', 
        backgroundColor: 'white', 
        padding: '10px', 
        borderRadius: '10px', 
        boxShadow: '0 0 10px rgba(0,0,0,0.5)', 
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left'
      }}
    >
      <h2 style={{ margin: 0 }}>{type === 'start' ? 'Начать игру' : (isWin ? 'Вы выиграли!' : 'Вы проиграли!')}</h2>
      <button onClick={type === 'start' ? handleStartGame : handleRestartGame} style={{ marginLeft: '10px' }}>
        {type === 'start' ? 'Начать' : 'Рестарт'}
      </button>
    </div>
  );
};

export default Menu;

