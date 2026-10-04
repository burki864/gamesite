import React from 'react';
import { Download, Play, Github, HardDrive, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audio';
import heroImg from '../assets/images/hero_dreamcore_meadow_1791123161861.jpg';

interface HeroProps {
  onOpenDownload: () => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload, onOpenTerminal }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-20 md:pt-12 md:pb-28">
      {/* Background image container with 16:9 ratio and atmospheric scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Endless dreamcore meadow under a surreal purple sky with a lonely door"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multilayer contrast scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070b]/60 via-[#07070b]/80 to-[#07070b]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#07070b]/50 to-[#07070b]" />
        <div className="absolute inset-0 analog-noise opacity-20 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Subtle editorial kicker (Clean unboxed text, no pills) */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-purple-300/80 uppercase">
            <span>Archival Dream Log</span>
            <span aria-hidden="true">·</span>
            <span>Recorded 03:14 AM</span>
            <span aria-hidden="true">·</span>
            <span>Windows x64 Native</span>
          </div>

          {/* Marquee Title */}
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl [text-wrap:balance]">
            Do not close your eyes in the endless meadow.
          </h1>

          {/* Value proposition & lore description */}
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-neutral-300 max-w-2xl font-normal">
            You wake up behind a freestanding wooden door in the middle of nowhere.
            Traverse non-Euclidean liminal spaces, endless tiled poolrooms, and forgotten
            retro playgrounds using your 1999 Hi8 camcorder before the Entity finds where you sleep.
          </p>

          {/* Primary Action Zone */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                audioEngine.playDreamChime(440);
                onOpenDownload();
              }}
              type="button"
              className="group relative inline-flex items-center gap-3 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all hover:bg-purple-500 hover:shadow-[0_0_45px_rgba(147,51,234,0.6)] active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              <Download className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              <span>Download game.exe for Windows</span>
            </button>

            <button
              onClick={() => {
                audioEngine.playGlitchSfx();
                onOpenTerminal();
              }}
              type="button"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-medium text-neutral-200 backdrop-blur-sm transition-all hover:border-purple-400/40 hover:bg-white/10 hover:text-white cursor-pointer whitespace-nowrap"
            >
              <Play className="h-4 w-4 text-purple-400" />
              <span>Inspect Dream Terminal</span>
            </button>
          </div>

          {/* Windows-specific release details (Unboxed metadata with separators) */}
          <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Windows 10 / 11 64-bit Only</span>
            </span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Github className="h-3.5 w-3.5 text-neutral-400" />
              <span>GitHub Binary: <code className="text-purple-300">game.exe</code></span>
            </span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <HardDrive className="h-3.5 w-3.5 text-neutral-400" />
              <span>Size: 2.4 GB</span>
            </span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span>Version 1.2.0</span>
          </div>
        </div>
      </div>
    </section>
  );
};
