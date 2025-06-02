import { Assets } from "pixi.js";
import { Preload } from "../components/Preload/Preload";
import { progressBar } from "../components/ProgressBar/ProgressBar";
import { TEXTURES_NAMES } from "../constants";
import { atlasStore } from "../stores/AtlasStore";
import { textureStore } from "../stores/TextureStore";

export default class PreloadScene {
  pixiApp;

  preload;

  constructor(pixiApp) {
    this.pixiApp = pixiApp;

    this.preload = new Preload();
  }

  async preloadGameAssets() {
    Assets.add({
      alias: "guiAtlas",
      src: "assets/gui/atlas/texture_gui.json",
    });

    TEXTURES_NAMES.forEach((textureName) => {
      Assets.add({
        alias: `${textureName}Texture`,
        src: `assets/textures/${textureName}.png`,
      });
    });

    const textures = await Assets.load(
      ["guiAtlas", ...TEXTURES_NAMES.map((name) => `${name}Texture`)],
      (progress) => {
        progressBar.setProgress(progress);
      }
    );

    Object.keys(textures).forEach((key) => {
      if (key.includes("Texture")) {
        textureStore.addTexture(key, textures[key]);

        return;
      }
      if (key.includes("Atlas")) {
        atlasStore.addAtlas(key, textures[key]);
      }
    });
  }

  async build() {
    await this.preload.view.build();

    this.pixiApp.stage.addChild(this.preload.view.getView());
  }

  destroy() {
    this.preload.view.destroy();
  }
}
