import { Container, Sprite } from "pixi.js";
import { APP_HEIGHT, APP_WIDTH } from "../../constants";
import { textureStore } from "../../stores/TextureStore";
import { atlasStore } from "../../stores/AtlasStore";

export class FinalScreenView {
  finalScreenContainer = new Container();

  finalScreen;

  build() {
    const textureScreen = textureStore.getTexture("final_screenTexture");

    this.finalScreen = new Sprite(textureScreen);
    this.finalScreen.anchor.set(0.5);
    this.finalScreen.eventMode = "static";
    this.finalScreen.cursor = "pointer";

    this.finalScreenContainer.addChild(this.finalScreen);

    this.updateElementsScale();
    this.updateElementsPositions();
  }

  updateElementsScale() {
    const elementsScale = [
      {
        x: 0.5,
        y: 0.7,
      },
    ];

    [this.finalScreen].forEach((element, i) => {
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

    [this.finalScreen].forEach((element, i) => {
      element.x = elementsPosition[i].x;
      element.y = elementsPosition[i].y;
    });
  }

  getView() {
    return this.finalScreenContainer;
  }

  destroy() {
    this.finalScreenContainer.destroy();
  }
}
