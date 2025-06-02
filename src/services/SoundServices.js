import { sound } from "@pixi/sound";
import { SOUNDS } from "../constants";

class SoundService {
  constructor() {
    SOUNDS.forEach((soundName) => {
      sound.add(`${soundName}`, `assets/audio/${soundName}.mp3`);
    });
  }

  play(alias, volume = 0.4, isLoop = false) {
    return sound.play(alias, { volume: volume, loop: isLoop });
  }

  stop(alias) {
    sound.stop(alias);
  }
}

export const soundService = new SoundService();
