import { PreloadView } from "./PreloadView";

export class Preload {
  view;

  constructor() {
    this.view = new PreloadView();
  }

  getView() {
    return this.view.getView();
  }
}
