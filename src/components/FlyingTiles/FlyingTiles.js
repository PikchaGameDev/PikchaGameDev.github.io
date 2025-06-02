import signal from "signal-js";
import { FlyingTilesView } from "./FlyingTilesView";
import { soundService } from "../../services/soundServices";
import { TILES_SPEED_MAX, TILES_SPEED_MIN } from "../../constants";

export class FlyingTiles {
  view;

  targetTile;
  tiles = [];

  speed = [];
  speedIncrements = [];

  isSoundWinPlay = false;

  constructor() {
    this.view = new FlyingTilesView();

    this.openConnections();
  }

  getView() {
    return this.view.getView();
  }

  isCheckIntersection(entity, area) {
    return (
      entity.x < area.x + area.width / 5 &&
      entity.x + entity.width / 5 > area.x &&
      entity.y < area.y + area.height / 5 &&
      entity.y + entity.height / 5 > area.y
    );
  }

  tick() {
    if (!this.tiles.length) {
      return;
    }

    const visibleTiles = this.moveTiles();

    if (!visibleTiles) {
      signal.emit("fly_stop");

      this.view.flyingTilesContainer.removeChildren();

      this.tiles = [];
      this.speed = [];
      this.speedIncrements = [];

      this.isSoundWinPlay = false;
    }
  }

  moveTiles() {
    let visibleTiles = 3;

    this.tiles.forEach(({ tile }, i) => {
      if (this.isCheckIntersection(tile, this.targetTile)) {
        !this.isSoundWinPlay && soundService.play("miniWin");

        this.isSoundWinPlay = true;
        tile.visible = false;
        visibleTiles--;
      }

      tile.x += tile.x < this.targetTile.x ? this.speed[i].x : -this.speed[i].x;

      if (tile.y > this.targetTile.y) {
        tile.y -= this.speed[i].y;
      }

      this.speed[i].x += this.speedIncrements[i].x;
      this.speed[i].y += this.speedIncrements[i].y;
    });

    return visibleTiles;
  }

  speedCalculation() {
    this.tiles.forEach(({ tile }) => {
      this.speedIncrements.push(
        tile.y - this.targetTile.y >
          Math.max(tile.x, this.targetTile.x) -
            Math.min(tile.x, this.targetTile.x)
          ? { x: TILES_SPEED_MIN, y: TILES_SPEED_MAX }
          : { x: TILES_SPEED_MAX, y: TILES_SPEED_MIN }
      );

      this.speed.push({
        x: 0,
        y: 0,
      });
    });
  }

  handleGetTarget(targetTile) {
    this.targetTile = targetTile;

    this.tiles.forEach(({ tile }) => {
      const globalCoords = tile.toGlobal(
        this.view.flyingTilesContainer.parent.position
      );

      tile.x = globalCoords.x;
      tile.y = globalCoords.y;

      tile.visible = true;

      this.view.flyingTilesContainer.addChild(tile);
    });

    this.speedCalculation();
  }

  openConnections() {
    signal.on("to_target", this.handleGetTarget.bind(this));

    signal.on("from_tiles", (tiles) => {
      this.tiles = tiles;
    });

    signal.on("update_target_pos", (x, y) => {
      this.tiles.x = x;
      this.tiles.y = y;
    });
  }
}
