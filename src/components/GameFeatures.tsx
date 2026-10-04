import React from 'react';
import { Camera, Compass, Volume2, ShieldAlert, Cpu, Eye } from 'lucide-react';

export const GameFeatures: React.FC = () => {
  return (
    <section id="features" className="relative border-t border-white/10 bg-[#07070b] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
            <span>Core Game Mechanics</span>
            <span aria-hidden="true">·</span>
            <span>Windows Unreal Engine Pipeline</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl [text-wrap:balance]">
            Surviving the Liminal Architecture
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-400">
            Engineered specifically for Windows 64-bit with custom volumetric fog, ray-marched
            tiled acoustics, and dynamic perspective warping.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Wide Col-Span-2 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-purple-500/30 md:col-span-2">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
              <span className="text-purple-400 font-semibold">01. Spatial Distortion</span>
              <span>Non-Euclidean Systems</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-white">
              Recursive Hallways & Shifting Corridors
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              The layout of SOMNIUM is not fixed in 3D Euclidean space. Walking forward 100 meters
              and turning around reveals a completely different sector. Rooms seamlessly wrap into themselves;
              staircases descend into higher elevations, and doors lock behind you the moment your back is turned.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 border-t border-white/10 pt-4">
              <span>Portals seamlessly rendered</span>
              <span aria-hidden="true">·</span>
              <span>Zero loading screens</span>
              <span aria-hidden="true">·</span>
              <span>DirectX 12 Compute Shaders</span>
            </div>
          </div>

          {/* Card 2: Single Column */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-purple-500/30">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
              <span className="text-purple-400 font-semibold">02. Optical Tools</span>
              <span>Hi8 Camcorder</span>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-white">
              1999 Tape Camcorder
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              Your only defensive tool is a battered Hi8 magnetic tape camera. Through its viewscreen,
              hidden doors appear, static reveals unseen entity footprints, and zoom lenses resolve anomalies
              that the naked human eye renders as pure mist.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-neutral-400 border-t border-white/10 pt-4">
              <Camera className="h-4 w-4 text-purple-400" />
              <span>Simulated magnetic tape tracking</span>
            </div>
          </div>

          {/* Card 3: Single Column */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-purple-500/30">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
              <span className="text-purple-400 font-semibold">03. Psychological Pressure</span>
              <span>The Lucidity Metric</span>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-white">
              Lucid Decay & Eye-Closing
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              Prolonged exposure to the dream degrades your lucidity. If it reaches zero, you slip into
              deep paralysis. You must hold your breath or physically close your eyes to re-orient—even
              while hearing rapid footsteps approaching in the water.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-neutral-400 border-t border-white/10 pt-4">
              <ShieldAlert className="h-4 w-4 text-amber-400" />
              <span>Psychological tension mechanics</span>
            </div>
          </div>

          {/* Card 4: Wide Col-Span-2 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-purple-500/30 md:col-span-2">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
              <span className="text-purple-400 font-semibold">04. Binaural Audio Engine</span>
              <span>Windows Spatial Sound</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-white">
              Full 3D Positional Audio with Reverberation Decay
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              Headphones are strongly recommended. Every tile in the Poolrooms reflects sonic waves
              with physical convolution reverb. Distant hums of fluorescent ballasts, hollow pipe groans,
              and low-frequency tape rumble alert you to when the Entity crosses sectors.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 border-t border-white/10 pt-4">
              <span>Binaural HRTF profiles</span>
              <span aria-hidden="true">·</span>
              <span>Dynamic audio occlusion</span>
              <span aria-hidden="true">·</span>
              <span>24-bit 48kHz Mastered Audio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
