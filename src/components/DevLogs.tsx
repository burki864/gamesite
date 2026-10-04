import React from 'react';
import { GitCommit, Tag, ArrowUpRight } from 'lucide-react';

interface DevLog {
  version: string;
  date: string;
  tag: string;
  title: string;
  notes: string[];
}

const LOGS: DevLog[] = [
  {
    version: 'v1.2.0',
    date: 'October 2026',
    tag: 'Latest Stable Release',
    title: 'The Sunken Tides (Poolrooms & Lucidity Overhaul)',
    notes: [
      'Added Sector 02: Infinite tiled poolrooms with real-time water reflections.',
      'Implemented Lucidity Gauge decay system and spatial blink mechanics.',
      'Optimized Windows x64 memory allocation; reduced RAM footprint by 35%.',
      'Added binaural convolution reverb profiles for all tiled vaulted corridors.',
    ],
  },
  {
    version: 'v1.1.2',
    date: 'September 2026',
    tag: 'Hotfix',
    title: 'DirectX 12 Shader Stutter & Hi8 Camcorder Fix',
    notes: [
      'Resolved intermittent stutter during Hi8 camcorder zoom on NVIDIA RTX GPUs.',
      'Pre-compiled pipeline state objects (PSOs) at launch to eliminate micro-freezes.',
      'Added fallback DirectX 11 launch parameter (-dx11) in Windows launcher.',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'August 2026',
    tag: 'Public Debut',
    title: 'Initial Windows GitHub Release: Sector 01 & 03',
    notes: [
      'Published official binary executable: game.exe to GitHub repository.',
      'First playable build featuring The Endless Meadow and Playground at 03:14 AM.',
      'Full analog tape distortion audio engine and non-Euclidean portal rendering.',
    ],
  },
];

interface DevLogsProps {
  onOpenDownload: () => void;
}

export const DevLogs: React.FC<DevLogsProps> = ({ onOpenDownload }) => {
  return (
    <section id="logs" className="relative border-t border-white/10 bg-[#07070b] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
              <Tag className="h-3.5 w-3.5" />
              <span>Changelog & Patch Notes</span>
              <span aria-hidden="true">·</span>
              <span>GitHub Release History</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl [text-wrap:balance]">
              Build History & Updates
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-400">
              Track the development of SOMNIUM across every Windows build.
              Source binaries and release tags are cataloged on GitHub.
            </p>
          </div>

          <button
            onClick={onOpenDownload}
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-mono text-neutral-300 hover:text-white hover:border-purple-400/40 cursor-pointer whitespace-nowrap"
          >
            <span>Get Latest Windows Build (v1.2.0)</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-purple-400" />
          </button>
        </div>

        {/* Timeline List */}
        <div className="mt-12 space-y-6">
          {LOGS.map((log) => (
            <div
              key={log.version}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 transition-colors hover:border-purple-500/20"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-base font-bold text-white">
                    {log.version}
                  </span>
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    {log.tag}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                  <GitCommit className="h-3.5 w-3.5" />
                  <span>Released {log.date}</span>
                </div>
              </div>

              <h3 className="mt-4 font-display text-lg font-bold text-white sm:text-xl">
                {log.title}
              </h3>

              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-neutral-300">
                {log.notes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
