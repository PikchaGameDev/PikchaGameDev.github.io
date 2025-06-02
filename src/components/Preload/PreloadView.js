import { Assets, Container, Sprite, Texture } from "pixi.js";
import { APP_HEIGHT, APP_WIDTH } from "../../constants";
import { progressBar } from "../ProgressBar/ProgressBar";

export class PreloadView {
  preloadContainer = new Container();

  background;

  async build() {
    const backgroundTexture = new Texture(
      await Assets.load(`assets/textures/preload_background.png`)
    );

    this.background = new Sprite(backgroundTexture);
    this.background.anchor.set(0.5);

    this.preloadContainer.addChild(this.background, progressBar);

    this.updateElementsPositions();
    this.updateElementsScale();
  }

  updateElementsScale() {
    const elementsScale = [
      {
        x: 0.5,
        y: 0.7,
      },
    ];

    [this.background].forEach((element, i) => {
      element.scale = elementsScale[i];
    });
  }

  updateElementsPositions() {
    const centerX = APP_WIDTH / 2;
    const centerY = APP_HEIGHT / 2;

    const elementsPosition = [
      {
        x: centerX,
        y: centerY,
      },
      {
        x: centerX,
        y: centerY,
      },
    ];

    [this.background, progressBar].forEach((element, i) => {
      element.x = elementsPosition[i].x;
      element.y = elementsPosition[i].y;
    });
  }

  getView() {
    return this.preloadContainer;
  }

  destroy() {
    this.preloadContainer.destroy();
  }
}
