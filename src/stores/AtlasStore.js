import { Assets, Texture } from "pixi.js";

class AtlasStore {
  atlases = new Map();

  constructor() {
    this.atlases = new Map();
  }

  async addAtlas(name, atlas) {
    this.atlases.set(name, atlas);
    return true;
  }

  getTextureFromAtlas(atlasName, textureName) {
    const atlas = this.atlases.get(atlasName);
    if (!atlas) {
      console.warn(`Atlas ${atlasName} not found`);
      return Texture.EMPTY;
    }
    return atlas.textures[textureName] || Texture.EMPTY;
  }

  unloadAtlas(name) {
    if (this.atlases.has(name)) {
      Assets.unload(name);
      this.atlases.delete(name);
    }
  }
}

export const atlasStore = new AtlasStore();
