import React from 'react';
import { Volume2, VolumeX, Monitor, Download, Radio } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface NavbarProps {
  onOpenDownload: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  audioActive: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDownload,
  crtEnabled,
  onToggleCrt,
  audioActive,
  onToggleAudio,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#07070b]/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2 font-display text-xl font-bold tracking-[0.25em] text-neutral-100 transition-colors hover:text-purple-300"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] group-hover:scale-125 transition-transform" />
          SOMNIUM
        </a>

        {/* Zone 2: 4–6 clean single-line nav links */}
        <nav className="hidden items-center gap-7 text-xs tracking-wider uppercase md:flex font-medium text-neutral-400">
          <a
            href="#sectors"
            className="hover:text-neutral-100 transition-colors py-1"
          >
            Sectors
          </a>
          <a
            href="#gallery"
            className="hover:text-neutral-100 transition-colors py-1 text-purple-300 font-semibold"
          >
            Gallery
          </a>
          <a
            href="#features"
            className="hover:text-neutral-100 transition-colors py-1"
          >
            Features
          </a>
          <a
            href="#terminal"
            className="hover:text-neutral-100 transition-colors py-1 flex items-center gap-1.5"
          >
            <Radio className="h-3 w-3 text-purple-400 animate-pulse" />
            Dream Feed
          </a>
          <a
            href="#specs"
            className="hover:text-neutral-100 transition-colors py-1"
          >
            Windows Specs
          </a>
          <a
            href="#logs"
            className="hover:text-neutral-100 transition-colors py-1"
          >
            Logs
          </a>
        </nav>

        {/* Zone 3: 1–2 primary action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle */}
          <button
            onClick={onToggleAudio}
            type="button"
            title={audioActive ? 'Mute ambient dream drone' : 'Play ambient dream drone'}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-mono transition-all ${
              audioActive
                ? 'border-purple-500/40 bg-purple-500/15 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                : 'border-white/10 bg-white/5 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {audioActive ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{audioActive ? 'Tape: ON' : 'Tape: OFF'}</span>
          </button>

          {/* CRT scanlines toggle */}
          <button
            onClick={onToggleCrt}
            type="button"
            title="Toggle CRT scanlines and VHS jitter"
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-mono transition-all ${
              crtEnabled
                ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                : 'border-white/10 bg-white/5 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">CRT</span>
          </button>

          {/* Primary CTA: Download Windows */}
          <button
            onClick={() => {
              audioEngine.playDreamChime(523.25);
              onOpenDownload();
            }}
            type="button"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(147,51,234,0.35)] transition-all hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_35px_rgba(147,51,234,0.55)] active:scale-95 whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            <span>Download for Windows</span>
          </button>
        </div>
      </div>
    </header>
  );
};
