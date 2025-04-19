import { Timer } from '../Timer';
import { Scene } from 'phaser';
import { Card } from '../Card';
import { CardDealer } from '../CardDealer';
import ReactDOM from 'react-dom/client';
import Menu from '../Menu';

type SceneCreateProps = {
  isRestart?: boolean;
};

export class GameScene extends Scene {
  private _cardDealer!: CardDealer;
  private _timer!: Timer;
  private _isGameOver: boolean = false;
  private _isWin: boolean = false;
  private _isGameStarted: boolean = false; // Новое состояние для отслеживания начала игры

  showMenu() {
    const menuProps = {
      type: this._isGameOver ? 'end' as 'end' : 'start' as 'start',
      isWin: this._isWin,
      onStartGame: this.onStartGame,
      onRestartGame: this.onRestartGame,
      removeMenu: this.removeMenu, // Передаем функцию для удаления меню
    };

    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = ReactDOM.createRoot(container);
    root.render(<Menu {...menuProps} />);
  }

  onStartGame = async () => {
    this._isGameStarted = true; // Устанавливаем состояние начала игры
    await this._cardDealer.createCards();
    this._timer.start(); // Запуск таймера
    this.input.on('gameobjectdown', this.onCardClick);
    this._isGameOver = false; // Сброс состояния игры
    this.removeMenu(); // Удаляем меню сразу после начала игры
  }

  onRestartGame = () => {
    this.scene.restart({ isRestart: true });
  }

  onCardClick = (_: unknown, card: Card) => {
    if (!this._isGameStarted || this._isGameOver) return; // Игнорируем клик, если игра не начата
    this._cardDealer.openCard(card);
  }

  onTimerIsOver = () => {
    this._isGameOver = true;
    this._isWin = false; // Устанавливаем состояние проигрыша
    this.showMenu(); // Показываем меню с сообщением о поражении
  }

  onAllCardsOpen = () => {
    this._isGameOver = true;
    this._isWin = true; // Устанавливаем состояние выигрыша
    this._timer.stop(); // Стоп таймер
    this.showMenu(); // Показываем меню с сообщением о выигрыше
  }

  removeMenu = () => {
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
      menuContainer.remove();
    }
  };

  constructor() {
    super('GameScene');
  }

  async create({ isRestart }: SceneCreateProps) {
    this._isGameOver = false;
    this._cardDealer = new CardDealer(this);
    this._timer = new Timer(this, {
      maxTime: 30,
      x: 600,
      y: 10,
    });

    if (isRestart) {
      this.onStartGame();
    } else {
      this.showMenu();
    }

    this.initEvents();
  }

  initEvents() {
    this._cardDealer.onAllCardsOpen = this.onAllCardsOpen;
    this._timer.onTimeIsOver = this.onTimerIsOver;
  }
}

