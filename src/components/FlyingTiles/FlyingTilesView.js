import { Container } from "pixi.js";

export class FlyingTilesView {
  flyingTilesContainer = new Container();

  getView() {
    return this.flyingTilesContainer;
  }

  destroy() {
    this.flyingTilesContainer.destroy();
  }
}
