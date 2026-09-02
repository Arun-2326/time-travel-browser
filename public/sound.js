// Procedural Web Audio Sound Engine for Time-Travel Browser (Zero Dependencies)
class SoundManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.volume = 0.55;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Generic modern click / UI tap
    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(850, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);
        gain.gain.setValueAtTime(this.volume * 0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.04);
    }

    // Stone Age: Deep rock clack
    playRockClack() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.exponentialRampToValueAtTime(35, t + 0.1);
        gain.gain.setValueAtTime(this.volume * 0.8, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
        this.noiseBurst(0.05, 300, 1200, 0.4);
    }

    // Flint spark sound
    playSpark() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        this.noiseBurst(0.08, 1500, 7000, 0.6);
    }

    // Stone Age: Mammoth stampede rumble & roar
    playMammothRumble() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // Stomp beats
        [0, 0.2, 0.45, 0.7, 0.95].forEach((delay) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(85, t + delay);
            osc.frequency.exponentialRampToValueAtTime(25, t + delay + 0.12);
            gain.gain.setValueAtTime(this.volume * 0.7, t + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.12);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t + delay);
            osc.stop(t + delay + 0.12);
        });
        // Low mammoth trumpet
        const oscT = this.ctx.createOscillator();
        const gainT = this.ctx.createGain();
        oscT.type = 'sawtooth';
        oscT.frequency.setValueAtTime(140, t + 0.2);
        oscT.frequency.exponentialRampToValueAtTime(280, t + 0.5);
        oscT.frequency.exponentialRampToValueAtTime(110, t + 0.9);
        gainT.gain.setValueAtTime(0.01, t + 0.2);
        gainT.gain.linearRampToValueAtTime(this.volume * 0.4, t + 0.4);
        gainT.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
        oscT.connect(gainT);
        gainT.connect(this.ctx.destination);
        oscT.start(t + 0.2);
        oscT.stop(t + 0.9);
    }

    // Medieval: Parchment friction
    playParchmentPull() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        this.noiseBurst(0.22, 250, 1800, 0.35);
    }

    // Medieval: Wax seal crack
    playWaxCrack() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.09);
        gain.gain.setValueAtTime(this.volume * 0.7, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.09);
        this.noiseBurst(0.06, 800, 3500, 0.5);
    }

    // Medieval: Royal herald trumpet chime
    playRoyalChime() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        [587.33, 739.99, 880.00].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t + idx * 0.09);
            gain.gain.setValueAtTime(this.volume * 0.35, t + idx * 0.09);
            gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.09 + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t + idx * 0.09);
            osc.stop(t + idx * 0.09 + 0.35);
        });
    }

    // Medieval: Knight galloping hooves
    playKnightGallop() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        [0, 0.12, 0.28, 0.40, 0.56, 0.68, 0.84, 0.96].forEach((delay, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(i % 2 === 0 ? 220 : 160, t + delay);
            osc.frequency.exponentialRampToValueAtTime(40, t + delay + 0.06);
            gain.gain.setValueAtTime(this.volume * 0.6, t + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.06);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t + delay);
            osc.stop(t + delay + 0.06);
        });
        this.playRoyalChime();
    }

    // Industrial: Mechanical gear ratchet tick
    playGearTick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, t);
        osc.frequency.exponentialRampToValueAtTime(110, t + 0.035);
        gain.gain.setValueAtTime(this.volume * 0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.035);
    }

    // Industrial: Real Morse code beep (duration in ms)
    playMorseBeep(durationMs = 80) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const dur = durationMs / 1000;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, t);
        gain.gain.setValueAtTime(this.volume * 0.4, t);
        gain.gain.setValueAtTime(this.volume * 0.4, t + dur - 0.005);
        gain.gain.linearRampToValueAtTime(0.0001, t + dur);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + dur);
    }

    // Industrial: Steam pressure release hiss
    playSteamHiss() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        this.noiseBurst(0.5, 300, 3200, 0.5);
    }

    // Industrial: Steam locomotive whistle and chug
    playTrainWhistle() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        // Dual-tone steam whistle
        [587.33, 783.99].forEach(freq => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.01, t);
            gain.gain.linearRampToValueAtTime(this.volume * 0.4, t + 0.08);
            gain.gain.setValueAtTime(this.volume * 0.4, t + 0.45);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.7);
        });
        this.noiseBurst(0.6, 600, 3800, 0.35);
    }

    // Present: Modern dual-tone ping
    playModernPing() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        [523.25, 659.25].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t + idx * 0.07);
            gain.gain.setValueAtTime(this.volume * 0.35, t + idx * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.07 + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t + idx * 0.07);
            osc.stop(t + idx * 0.07 + 0.25);
        });
    }

    // Present: Delivery Drone propeller buzz and drop
    playDroneWhir() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.linearRampToValueAtTime(540, t + 0.4);
        osc.frequency.linearRampToValueAtTime(280, t + 0.9);
        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(this.volume * 0.35, t + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.9);
        setTimeout(() => this.playModernPing(), 450);
    }

    // Future: Sci-fi laser pulse / holographic hum
    playSciFiPulse(freq = 900) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.8, t + 0.12);
        gain.gain.setValueAtTime(this.volume * 0.45, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.15);
    }

    // Future: Synthesizer chord
    playFutureChord() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        [440, 554.37, 659.25, 880].forEach((freq) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(this.volume * 0.15, t);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.6);
        });
    }

    // Future: Sci-Fi Hovercar Hyperspace flyby
    playHovercarFlyby() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.exponentialRampToValueAtTime(1400, t + 0.35);
        osc.frequency.exponentialRampToValueAtTime(180, t + 0.85);
        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(this.volume * 0.5, t + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.85);
        this.noiseBurst(0.7, 400, 6000, 0.4);
    }

    // Universal: Time Travel Warp Portal Sound
    playWarpSound() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        
        // Deep sub-bass riser
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(50, t);
        osc.frequency.exponentialRampToValueAtTime(800, t + 0.85);
        osc.frequency.exponentialRampToValueAtTime(100, t + 1.25);
        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(this.volume * 0.65, t + 0.65);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 1.25);

        // High shimmer
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(350, t + 0.2);
        osc2.frequency.linearRampToValueAtTime(1400, t + 0.85);
        gain2.gain.setValueAtTime(0.01, t + 0.2);
        gain2.gain.linearRampToValueAtTime(this.volume * 0.35, t + 0.7);
        gain2.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start(t + 0.2);
        osc2.stop(t + 1.2);
    }

    // Helper: Filtered noise generator
    noiseBurst(duration, lowFreq, highFreq, level) {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime((lowFreq + highFreq) / 2, t);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(this.volume * level, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(t);
    }
}

const audio = new SoundManager();
