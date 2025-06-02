import { Application } from "pixi.js";
import { APP_HEIGHT, APP_WIDTH } from "./constants";
import Game from "./scenes/Game";
import Preload from "./scenes/Preload";

(async () => {
  try {
    const app = new Application({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      autoDensity: true,
      backgroundAlpha: 0,
      antialias: true,
    });

    let gameContainer = document.getElementById("app");

    gameContainer?.appendChild(app.view);

    const preloadScene = new Preload(app);

    await preloadScene.build();

    await preloadScene.preloadGameAssets();

    const gameScene = new Game(app);

    gameScene.initGameObjects();

    preloadScene.destroy();

    app.ticker.add(() => {
      gameScene.tick();
    });
  } catch (e) {
    console.log(e);
  }
})();
