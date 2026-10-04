import React, { useState, useEffect } from 'react';
import { Radio, RefreshCw, EyeOff, ShieldCheck, Zap, Download } from 'lucide-react';
import { audioEngine } from '../utils/audio';

import entityImg from '../assets/images/game_cover_entity_1791123198885.jpg';

interface Feed {
  id: string;
  name: string;
  location: string;
  img: string;
  staticRate: number;
  message: string;
}

const FEEDS: Feed[] = [
  {
    id: 'CAM-01',
    name: 'Sector 01: The Mounds & Carousel',
    location: 'Coordinates [34.02, -118.49] // Void Plateau 0',
    img: '/photo1.jpg',
    staticRate: 15,
    message: 'Carousel bars are rotating clockwise. No atmospheric breeze registered.',
  },
  {
    id: 'CAM-02',
    name: 'Sector 02: Brick Promenade',
    location: 'Coordinates [00.00, 00.00] // Subterranean Deck',
    img: '/photo2.jpg',
    staticRate: 35,
    message: 'Fluorescent tubes buzzing at 60Hz. Footstep audio echoes delayed by 2.1s.',
  },
  {
    id: 'CAM-03',
    name: 'Sector 03: Infinite Descent Tunnel',
    location: 'Coordinates [12.98, -45.10] // Claustrophobic Corridor',
    img: '/photo3.jpg',
    staticRate: 50,
    message: 'Doorway scale shrinking exponentially with camera approach velocity.',
  },
  {
    id: 'CAM-04',
    name: 'CAM-04: Entity Room 404',
    location: 'Coordinates [UNDEFINED] // Deviation Core',
    img: entityImg,
    staticRate: 85,
    message: 'WARNING: Signal feed contains self-aware electrical distortion.',
  },
];

interface DreamTerminalProps {
  onOpenDownload: () => void;
}

export const DreamTerminal: React.FC<DreamTerminalProps> = ({ onOpenDownload }) => {
  const [selectedCam, setSelectedCam] = useState<number>(0);
  const [lucidity, setLucidity] = useState<number>(78);
  const [isGlitching, setIsGlitching] = useState<boolean>(false);
  const [eyesClosed, setEyesClosed] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<number>(432);
  const [logMessages, setLogMessages] = useState<string[]>([
    '03:14:02 - Signal synced with Hi8 analog recorder buffer.',
    '03:14:15 - In-game sector coordinates locked to Windows DirectX 12 renderer.',
    '03:14:29 - Sector 01 carousel rotation detected: 0.5 RPM.',
  ]);

  const currentFeed = FEEDS[selectedCam];

  // Random glitch spike
  const triggerScanGlitch = () => {
    setIsGlitching(true);
    audioEngine.playGlitchSfx();
    setTimeout(() => {
      setIsGlitching(false);
    }, 450);
  };

  const handleBlink = () => {
    setEyesClosed(true);
    audioEngine.playDreamChime(180);
    setTimeout(() => {
      setEyesClosed(false);
      // Lucidity changes
      setLucidity((prev) => Math.min(100, prev + 12));
      const newLog = `03:${Math.floor(Math.random() * 50 + 10)}:12 - Blink complete. Geometry re-indexed (+12% Lucidity).`;
      setLogMessages((prev) => [newLog, ...prev.slice(0, 4)]);
    }, 900);
  };

  const handleTuneFreq = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setFrequency(val);
    if (val % 30 === 0) {
      audioEngine.playDreamChime(val);
    }
  };

  // Passive slight lucidity decay
  useEffect(() => {
    const interval = setInterval(() => {
      setLucidity((prev) => {
        if (prev <= 25) return 25;
        return prev - 1;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="terminal" className="relative border-t border-white/10 bg-[#060609] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Terminal Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
              <Zap className="h-3.5 w-3.5 text-purple-400" />
              <span>Interactive Surveillance Feed</span>
              <span aria-hidden="true">·</span>
              <span>Direct Windows Engine Stream</span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Dream Terminal & Camcorder Monitor
            </h2>
            <p className="mt-2 text-sm text-neutral-400 max-w-xl">
              Simulate in-game camcorder telemetry across actual game environments. Switch feeds, monitor your lucidity,
              and observe anomalies before launching the full Windows game.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBlink}
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3.5 py-2 text-xs font-mono text-purple-300 hover:bg-purple-500/20 cursor-pointer transition-colors"
            >
              <EyeOff className="h-4 w-4" />
              <span>Blink / Reset Geometry</span>
            </button>
            <button
              onClick={triggerScanGlitch}
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-mono text-neutral-300 hover:text-white cursor-pointer transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Pulse Glitch</span>
            </button>
          </div>
        </div>

        {/* Console Container */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main CCTV Monitor (Col 8) */}
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black lg:col-span-8 shadow-2xl">
            {/* Aspect container */}
            <div className={`relative aspect-[16/10] w-full overflow-hidden transition-all duration-300 ${isGlitching ? 'animate-glitch filter hue-rotate-90' : ''}`}>
              {eyesClosed ? (
                <div className="flex h-full w-full flex-col items-center justify-center bg-black p-8 text-center">
                  <div className="h-3 w-3 rounded-full bg-purple-500 animate-ping" />
                  <p className="mt-4 font-mono text-sm tracking-widest text-neutral-400 uppercase">
                    Eyes Closed... You hear the carousel moving in the dark.
                  </p>
                </div>
              ) : (
                <>
                  <img
                    src={currentFeed.img}
                    alt={currentFeed.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                  <div className="crt-overlay absolute inset-0 opacity-50 pointer-events-none" />
                  <div className="crt-vignette absolute inset-0 pointer-events-none" />
                </>
              )}

              {/* Monitor Top Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-emerald-400">
                <div className="flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE FEED: {currentFeed.id}</span>
                </div>
                <div className="bg-black/60 px-2.5 py-1 rounded border border-white/10 text-neutral-300">
                  <span>FREQ: {frequency} Hz</span>
                </div>
              </div>

              {/* Monitor Bottom Status */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-lg border border-white/10 bg-black/75 p-3 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-purple-300 font-medium">{currentFeed.name}</span>
                    <span className="text-neutral-400">{currentFeed.location}</span>
                  </div>
                  <p className="mt-1 text-xs font-mono text-neutral-300">
                    <span className="text-emerald-400">ANOMALY: </span>
                    {currentFeed.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Camera Switcher Buttons (Bottom of monitor) */}
            <div className="grid grid-cols-2 border-t border-white/10 bg-neutral-950 sm:grid-cols-4">
              {FEEDS.map((feed, idx) => (
                <button
                  key={feed.id}
                  onClick={() => {
                    setSelectedCam(idx);
                    audioEngine.playDreamChime(300 + idx * 100);
                  }}
                  type="button"
                  className={`flex flex-col items-start p-3 text-left border-r border-white/10 last:border-r-0 transition-colors cursor-pointer ${
                    selectedCam === idx
                      ? 'bg-purple-600/20 text-white border-b-2 border-b-purple-400'
                      : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
                  }`}
                >
                  <span className="text-[11px] font-mono font-bold tracking-wider">{feed.id}</span>
                  <span className="text-xs truncate w-full text-neutral-300">{feed.name.split(':')[1] || feed.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Control & Telemetry Panel (Col 4) */}
          <div className="flex flex-col justify-between space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:col-span-4">
            <div>
              {/* Lucidity Gauge */}
              <div className="border-b border-white/10 pb-5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-purple-400" />
                    <span>Lucidity Gauge</span>
                  </span>
                  <span className={`font-bold tabular-nums ${lucidity < 40 ? 'text-red-400 animate-pulse' : 'text-purple-300'}`}>
                    {lucidity}%
                  </span>
                </div>

                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      lucidity < 40 ? 'bg-red-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                    }`}
                    style={{ width: `${lucidity}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-neutral-400">
                  {lucidity > 70
                    ? 'State: Stable. Dream architecture remains rigid.'
                    : lucidity > 40
                    ? 'State: Destabilizing. Corridors are beginning to mirror.'
                    : 'State: CRITICAL. Do not look directly into reflections.'}
                </p>
              </div>

              {/* Subconscious Frequency Dial */}
              <div className="border-b border-white/10 py-5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Tuning Dial</span>
                  <span className="text-purple-300 font-mono tabular-nums">{frequency} Hz</span>
                </div>
                <input
                  type="range"
                  min="110"
                  max="880"
                  step="10"
                  value={frequency}
                  onChange={handleTuneFreq}
                  className="mt-3 w-full accent-purple-500 cursor-pointer"
                />
                <div className="mt-1 flex justify-between text-[10px] font-mono text-neutral-500">
                  <span>110 Hz (Delta)</span>
                  <span>432 Hz (Liminal)</span>
                  <span>880 Hz (Waking)</span>
                </div>
              </div>

              {/* Real-time Log Feed */}
              <div className="pt-4">
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                  <Radio className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Telemetry Log Stream</span>
                </span>
                <div className="mt-2 space-y-2 font-mono text-[11px] text-neutral-400 bg-black/40 p-3 rounded-lg border border-white/5">
                  {logMessages.map((msg, i) => (
                    <div key={i} className="leading-tight text-neutral-300">
                      {msg}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Windows Game button */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={onOpenDownload}
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600/90 hover:bg-purple-500 px-4 py-3 text-xs font-mono uppercase tracking-wider text-white font-semibold transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download Windows Game (.exe)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
