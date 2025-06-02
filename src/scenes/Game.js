import { Container } from "pixi.js";
import { Background } from "../components/Background/Background";
import { FinalScreen } from "../components/FinalScreen/FinalScreen";
import { FlyingTiles } from "../components/FlyingTiles/FlyingTiles";
import { GameField } from "../components/GameField/GameField";
import { Basket } from "../components/Basket/Basket";
import { Room } from "../components/Room/Room";
import { soundService } from "../services/soundServices";

export default class Game {
  pixiApp;

  worldContainer;

  background;
  finalScreen;
  gameField;
  basket;
  room;
  flyingTiles;

  constructor(pixiApp) {
    this.pixiApp = pixiApp;

    this.worldContainer = new Container();
    this.pixiApp.stage.addChild(this.worldContainer);
  }

  initGameObjects() {
    this.background = new Background();
    this.finalScreen = new FinalScreen();
    this.flyingTiles = new FlyingTiles();
    this.gameField = new GameField();
    this.basket = new Basket();
    this.room = new Room();

    this.worldContainer.addChild(
      this.room.getView(),
      this.gameField.getView(),
      this.basket.getView(),
      this.flyingTiles.getView(),
      this.finalScreen.getView(),
      this.background.getView()
    );

    soundService.play("music", 0.1, true);
  }

  tick() {
    this.basket.tick();
    this.flyingTiles.tick();
  }
}
