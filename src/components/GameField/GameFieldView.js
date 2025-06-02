import { Container, Sprite } from "pixi.js";
import {
  APP_HEIGHT,
  APP_WIDTH,
  TILES_COLUMNS_COUNT,
  TILES_COLUMN_SIZE,
  TILES_NAMES,
} from "../../constants";
import { atlasStore } from "../../stores/AtlasStore";
import { textureStore } from "../../stores/TextureStore";

export class GameFieldView {
  gameFieldContainer = new Container();

  tilesContainer = new Container();
  tiles = [];

  board;

  build() {
    const boardTexture = textureStore.getTexture("woodTexture");
    this.board = new Sprite(boardTexture);
    this.board.anchor.set(0.5);

    this.createTilesField();

    this.gameFieldContainer.addChild(this.board, this.tilesContainer);

    this.updateElementsScale();
    this.updateElementsPositions();
  }

  createTilesField() {
    for (let i = 1; i < TILES_COLUMNS_COUNT + 1; i++) {
      const tilesContainer = [];

      const tilesColumn = {
        container: tilesContainer,
      };

      for (let j = 1; j < TILES_COLUMN_SIZE + 1; j++) {
        const tileContainer = new Container();
        tileContainer.eventMode = "static";
        tileContainer.cursor = "pointer";
        tileContainer.zIndex = i * j;

        const tileBackground = this.getTileBackground();
        const tileElement = this.getTileElement();

        tileContainer.addChild(tileBackground, tileElement);

        tilesContainer.push(tileContainer);

        this.tilesContainer.addChild(tileContainer);
      }

      this.tiles.push(tilesColumn);
    }
  }

  changeTile(tile, columnIndex, rowIndex) {
    tile.children[1].destroy();
    tile.x = 0;
    tile.y = 0;
    tile.zIndex = columnIndex * rowIndex;
    tile.addChild(this.getTileElement());
    tile.visible = true;

    this.tilesContainer.addChildAt(tile, (columnIndex - 1) * (rowIndex - 1));
    this.tilesContainer.sortChildren();
  }

  getTileBackground() {
    const tileBackgroundTexture = atlasStore.getTextureFromAtlas(
      "guiAtlas",
      "tile.png"
    );
    const tileBackground = new Sprite(tileBackgroundTexture);

    tileBackground.anchor.set(0.5);

    return tileBackground;
  }

  getTileElement() {
    const tileElementName =
      TILES_NAMES[Math.floor(Math.random() * TILES_NAMES.length)];

    const tileElementTexture = atlasStore.getTextureFromAtlas(
      "guiAtlas",
      `${tileElementName}.png`
    );
    const tileElement = new Sprite(tileElementTexture);
    tileElement.anchor.set(0.5);
    tileElement.label = tileElementName;
    tileElement.scale.x = 0.2;
    tileElement.scale.y = 0.2;

    return tileElement;
  }

  updateElementsScale() {
    const elementsScale = [
      {
        x: 0.5,
        y: 0.5,
      },
    ];

    this.tiles.forEach((tilesColumn) => {
      tilesColumn.container.forEach((tileContainer) => {
        tileContainer.scale = {
          x: 0.5,
          y: 0.5,
        };
      });
    });

    [this.board].forEach((element, i) => {
      element.scale = elementsScale[i];
    });
  }

  updateElementsPositions() {
    const centerX = APP_WIDTH / 2;
    const centerY = APP_HEIGHT / 2;

    this.tiles.forEach((tilesColumn, i) => {
      tilesColumn.container.forEach((tileContainer, j) => {
        tileContainer.x = 24 + i * 44.4;
        tileContainer.y = centerY + 73 + j * 42.6;
        tileContainer.children[1].y = -8;
      });
    });

    this.board.position.set(centerX, APP_HEIGHT - this.board.height / 2);
  }

  getView() {
    return this.gameFieldContainer;
  }

  destroy() {
    this.gameFieldContainer.destroy();
  }
}
