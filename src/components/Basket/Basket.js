import signal from "signal-js";
import {
  APP_WIDTH,
  BASKET_OFFSET_AFTER_WIN,
  BASKET_SPEED,
} from "../../constants";
import { soundService } from "../../services/soundServices";
import { BasketView } from "./BasketView";

export class Basket {
  view;

  isSendTargetPos = false;

  constructor() {
    this.view = new BasketView();

    this.view.build();

    this.openConnections();
    signal.emit("current_target", this.view.tile.label);
  }

  tick() {
    this.view.basket.x += BASKET_SPEED;
    this.view.tile.x += BASKET_SPEED;

    if (this.view.basket.x > APP_WIDTH) {
      signal.emit("show_finish");
    }

    if (this.isSendTargetPos) {
      signal.emit("update_target_pos", this.view.tile.x, this.view.tile.y);
    }
  }

  openConnections() {
    signal.on("trips_complete", () => {
      this.isSendTargetPos = true;

      signal.emit("to_target", this.view.tile);
    });

    signal.on("fly_stop", this.handleFlyTilesStop.bind(this));
  }

  handleFlyTilesStop() {
    this.isSendTargetPos = false;
    soundService.play("rollBack");
    this.view.basket.x -= BASKET_OFFSET_AFTER_WIN;
    this.view.tile.x -= BASKET_OFFSET_AFTER_WIN;

    this.view.createTile(this.view.tile.x, this.view.tile.y);

    signal.emit("current_target", this.view.tile.label);

    this.view.updateElementsScale();
  }

  resize() {
    this.view.resize();
  }

  getView() {
    return this.view.getView();
  }
}
