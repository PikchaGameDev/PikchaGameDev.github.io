import { Container, Sprite } from "pixi.js";
import { APP_HEIGHT, APP_WIDTH } from "../../constants";
import { textureStore } from "../../stores/TextureStore";

export class BackgroundView {
  backgroundContainer = new Container();

  background;

  build() {
    const texture = textureStore.getTexture("phoneTexture");

    this.background = new Sprite(texture);
    this.background.anchor.set(0.5);

    this.backgroundContainer.addChild(this.background);

    this.updateElementsScale();
    this.updateElementsPositions();
  }

  updateElementsScale() {
    const elementsScale = [
      {
        x: 0.5,
        y: 0.5,
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
    ];

    [this.background].forEach((element, i) => {
      element.x = elementsPosition[i].x;
      element.y = elementsPosition[i].y;
    });
  }

  getView() {
    return this.backgroundContainer;
  }

  destroy() {
    this.backgroundContainer.destroy();
  }
}
