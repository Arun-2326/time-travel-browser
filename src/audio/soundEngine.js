// Procedural Web Audio API Sound Synthesizer - Completely Muted / Silent Mode
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.volume = 0;
  }
  init() {}
  setVolume() {}
  toggleSound() { return false; }
  playRockClack() {}
  playSpark() {}
  playStoneGrind() {}
  playQuillScratch() {}
  playWaxCrack() {}
  playBellDing() {}
  playScrollUnroll() {}
  playTypewriterClack() {}
  playSteamHiss() {}
  playGearTick() {}
  playModernPing() {}
  playModernClick() {}
  playSciFiBeep() {}
  playHoloHum() {}
  playWarpDrive() {}
  playParadoxGlitch() {}
  playNoiseBurst() {}
}

export const sound = new SoundEngine();

