/**
 * Web Audio API synthesizer for dreamcore atmospheric soundscape.
 * Creates an uncanny, gentle analog drone with detuned oscillators,
 * low-pass filtering, and periodic eerie dream chimes.
 */

class DreamcoreAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private chimeInterval: number | null = null;
  private volume: number = 0.35;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  public start() {
    try {
      this.initContext();
      if (!this.ctx) return;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(this.volume, this.ctx.currentTime + 2.5);
      this.masterGain.connect(this.ctx.destination);

      // Low pass filter to create a warm, muffled, distant analog feel
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(280, this.ctx.currentTime);
      lowpass.Q.setValueAtTime(3, this.ctx.currentTime);
      lowpass.connect(this.masterGain);

      // Drone Oscillator 1 (Warm Root: 55Hz - A1 note)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      // Subtle LFO for detune drift
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(2.5, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(this.droneOsc1.detune);
      lfo.start();

      // Drone Oscillator 2 (Slightly detuned octave: 110.4Hz)
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(110.4, this.ctx.currentTime);

      const oscGain1 = this.ctx.createGain();
      oscGain1.gain.value = 0.4;
      this.droneOsc1.connect(oscGain1);
      oscGain1.connect(lowpass);

      const oscGain2 = this.ctx.createGain();
      oscGain2.gain.value = 0.25;
      this.droneOsc2.connect(oscGain2);
      oscGain2.connect(lowpass);

      // Analog Tape Hiss / Noise Buffer
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();
      this.noiseNode.start();

      this.isPlaying = true;

      // Trigger uncanny dream chime every 9 seconds
      this.chimeInterval = window.setInterval(() => {
        if (this.isPlaying) {
          this.playDreamChime();
        }
      }, 9000);
    } catch {
      this.isPlaying = false;
    }
  }

  public playDreamChime(noteFreq?: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const frequencies = [220, 277.18, 329.63, 440, 523.25, 659.25, 880];
      const freq = noteFreq || frequencies[Math.floor(Math.random() * frequencies.length)];

      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Bell envelope
      const now = this.ctx.currentTime;
      chimeGain.gain.setValueAtTime(0.001, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.12, now + 0.04);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.masterGain);

      chimeOsc.start(now);
      chimeOsc.stop(now + 4.3);
    } catch {
      // Audio node cleanup safeguard
    }
  }

  public playGlitchSfx() {
    if (!this.ctx) {
      this.initContext();
    }
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.18);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // safe
    }
  }

  public stop() {
    if (!this.ctx) return;
    try {
      if (this.chimeInterval) {
        clearInterval(this.chimeInterval);
        this.chimeInterval = null;
      }
      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      }
      setTimeout(() => {
        try {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.noiseNode?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.noiseNode?.disconnect();
        } catch {
          // ignore
        }
        this.isPlaying = false;
      }, 850);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const audioEngine = new DreamcoreAudioEngine();
