import { Container, Sprite } from "pixi.js";
import { APP_HEIGHT, APP_WIDTH } from "../../constants";
import { textureStore } from "../../stores/TextureStore";
import { atlasStore } from "../../stores/AtlasStore";

export class RoomView {
  roomContainer = new Container();

  background;

  build() {
    const backgroundTexture = textureStore.getTexture("backgroundTexture");

    this.background = new Sprite(backgroundTexture);
    this.background.anchor.x = 0.5;

    this.roomContainer.addChild(this.background);

    this.updateElementsScale();
    this.updateElementsPositions();
  }

  updateElementsScale() {
    const elementsScale = [
      {
        x: 0.8,
        y: 0.8,
      },
    ];

    [this.background].forEach((element, i) => {
      element.scale = elementsScale[i];
    });
  }

  updateElementsPositions() {
    const centerX = APP_WIDTH / 2;

    const elementsPosition = [
      {
        x: centerX,
        y: 0,
      },
    ];

    [this.background].forEach((element, i) => {
      element.position.set(elementsPosition[i].x, elementsPosition[i].y);
    });
  }

  getView() {
    return this.roomContainer;
  }

  destroy() {
    this.roomContainer.destroy();
  }
}
