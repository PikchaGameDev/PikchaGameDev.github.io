import { Assets } from "pixi.js";

class TextureStore {
  textures = new Map();

  async addTexture(name, texture) {
    this.textures.set(name, texture);
    return true;
  }

  getTexture(textureName) {
    const texture = this.textures.get(textureName);

    if (!texture) {
      console.warn(`Texture ${textureName} not found`);
      return null;
    }

    return texture || null;
  }

  unloadTexture(name) {
    if (this.textures.has(name)) {
      Assets.unload(name);
      this.textures.delete(name);
    }
  }
}

export const textureStore = new TextureStore();
