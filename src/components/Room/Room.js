import { RoomView } from "./RoomView";

export class Room {
  view;

  constructor() {
    this.view = new RoomView();

    this.view.build();
  }

  getView() {
    return this.view.getView();
  }
}
