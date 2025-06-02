import { Container, Sprite } from "pixi.js";
import { APP_HEIGHT, APP_WIDTH, TILES_NAMES } from "../../constants";
import { atlasStore } from "../../stores/AtlasStore";

export class BasketView {
  basketContainer = new Container();

  basket;
  tile;

  build() {
    const textureBasket = atlasStore.getTextureFromAtlas(
      "guiAtlas",
      "basket.png"
    );

    this.basket = new Sprite(textureBasket);
    this.basket.anchor.x = 0.5;

    this.createTile();

    this.basketContainer.addChild(this.basket, this.tile);

    this.resize();
  }

  updateElementsScale() {
    const elementsScale = [
      {
        x: 0.1,
        y: 0.1,
      },
      {
        x: 0.2,
        y: 0.2,
      },
    ];

    [this.basket, this.tile].forEach((element, i) => {
      element.scale = elementsScale[i];
    });
  }

  updateElementsPositions() {
    const centerX = APP_WIDTH / 2;
    const centerY = APP_HEIGHT / 2;

    const elementsPosition = [
      {
        x: centerX - 90,
        y: centerY - 60,
      },
      {
        x: centerX - 90,
        y: centerY - 30,
      },
    ];

    [this.basket, this.tile].forEach((element, i) => {
      element.position.set(elementsPosition[i].x, elementsPosition[i].y);
    });
  }

  createTile(x = 0, y = 0) {
    const tileElementName =
      TILES_NAMES[Math.floor(Math.random() * TILES_NAMES.length)];
    const tileElementTexture = atlasStore.getTextureFromAtlas(
      "guiAtlas",
      `${tileElementName}.png`
    );

    this.tile?.destroy();
    this.tile = new Sprite(tileElementTexture);
    this.tile.label = tileElementName;
    this.tile.anchor.set(0.5);
    this.tile.x = x;
    this.tile.y = y;

    this.basketContainer.addChild(this.tile);
  }

  resize() {
    this.updateElementsScale();
    this.updateElementsPositions();
  }

  getView() {
    return this.basketContainer;
  }

  destroy() {
    this.basketContainer.destroy();
  }
}
