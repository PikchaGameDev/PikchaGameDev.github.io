import { ProgressBar } from "@pixi/ui";
import { Container, Graphics } from "pixi.js";

const config = {
  progress: {
    bar: {
      backgroundColor: "#FFFFFF",
      border: 0,
      borderColor: "#FFFFFF",
      fillColor: "#FF00FF",
      height: 7,
      radius: 28,
      width: 200,
    },
  },
};

class AssetsProgressBar extends Container {
  defaultArgs;
  options;
  progressBar;

  constructor() {
    super();
    this.defaultArgs = {
      animate: true,
      value: 0,
      vertical: window.matchMedia("(orientation: portrait)").matches,
    };

    this.options = { ...this.defaultArgs, ...config.progress.bar };

    const background = new Graphics()
      .beginFill(this.options.borderColor, 0.2)
      .drawRoundedRect(
        0,
        0,
        this.options.width,
        this.options.height,
        this.options.radius
      )
      .beginFill(this.options.backgroundColor, 0.2)
      .drawRoundedRect(
        this.options.border,
        this.options.border,
        this.options.width - this.options.border * 2,
        this.options.height,
        this.options.radius
      );

    const filler = new Graphics()
      .beginFill(this.options.borderColor)
      .drawRoundedRect(
        0,
        0,
        this.options.width,
        this.options.height,
        this.options.radius
      )
      .beginFill(this.options.fillColor)
      .drawRoundedRect(
        this.options.border,
        this.options.border,
        this.options.width - this.options.border * 2,
        this.options.height,
        this.options.radius
      );

    this.progressBar = new ProgressBar({
      bg: background,
      fill: filler,
      progress: this.options.value,
    });

    this.addChild(this.progressBar);
    this.pivot.set(this.width / 2, this.height / 2);
  }

  setProgress(progress) {
    this.progressBar.progress = Math.floor(progress * 100);
  }

  getProgress() {
    return Number(this.progressBar.progress);
  }
}

export const progressBar = new AssetsProgressBar();
