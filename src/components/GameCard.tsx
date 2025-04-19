import { useEffect } from 'react';
import { Game, Types, AUTO } from 'phaser';
import { PreloadScene } from './scenes/PreloadScene';
import { GameScene } from './scenes/GemeReactScene';
import gameConfig from './gameConfig';

interface GameCardProps {
    onGameEnd: () => void; // Явно указываем тип для onGameEnd
}

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: gameConfig.screenWidth,
    height: gameConfig.screenHeight,
    backgroundColor: gameConfig.backgroundColor,
    scene: [
        PreloadScene,
        GameScene
    ]
};

const GameCard = ({ onGameEnd }: GameCardProps) => {
    useEffect(() => {
        const newGame = new Game(config);

        // Слушаем событие окончания игры и вызываем onGameEnd
        newGame.events.on('gameOver', () => {
            onGameEnd(); // Уведомляем App о завершении игры

            
        });

        return () => {
            // Удаляем контейнер меню, если он существует
            const menuContainer = document.getElementById('menu-container');
            if (menuContainer) {
                menuContainer.remove();
            }
            newGame.destroy(true);
        };
    }, [onGameEnd]);

    return null; // Компонент не рендерит ничего
};

export default GameCard;
