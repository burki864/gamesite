import React, { useState } from 'react';
import { Eye, Radio, Sparkles, MapPin, AlertCircle, Camera } from 'lucide-react';
import { audioEngine } from '../utils/audio';

import entityImg from '../assets/images/game_cover_entity_1791123198885.jpg';

export interface Sector {
  id: string;
  name: string;
  depth: string;
  title: string;
  description: string;
  anomalies: string;
  hazardLevel: string;
  image: string;
  audioFreq: number;
}

export const SECTORS: Sector[] = [
  {
    id: '01',
    name: 'Sector 01',
    depth: 'Subconscious Layer 1',
    title: 'The Desolate Mounds & Carousel',
    description: 'An expansive barren dreamcore plateau dotted with identical windowless huts atop artificial earthen mounds. In the absolute dead center sits an abandoned children’s carousel that rotates without any wind, surrounded by scattered tufts of yellow grass under a hazy, sunless sky.',
    anomalies: 'Carousel rotating at 0.5 RPM · Unregistered footsteps inside huts · Distant children whispers',
    hazardLevel: 'Spatial Solitude & Agoraphobia',
    image: '/photo1.jpg',
    audioFreq: 220,
  },
  {
    id: '02',
    name: 'Sector 02',
    depth: 'Subconscious Layer 2',
    title: 'Subterranean Brick Promenade',
    description: 'Vast dark subterranean boardwalks lined with aged wooden floorboards and weathered brick ramparts. Overhead geometric diamond-faceted skylights reflect sharp fluorescent beams onto the deck, while the corridors trail off into pitch-black infinite voids.',
    anomalies: 'Footstep echoes delayed by 2 seconds · Flickering ballasts · Scent of wet river stone',
    hazardLevel: 'Auditory Disorientation & Shadow Movement',
    image: '/photo2.jpg',
    audioFreq: 330,
  },
  {
    id: '03',
    name: 'Sector 03',
    depth: 'Subconscious Layer 4',
    title: 'The Infinite Descent Tunnel',
    description: 'A claustrophobic, non-Euclidean descending corridor framed by low wooden crossbeams. As you advance, receding rectangular doorways shrink into the pitch black abyss. A solitary fluorescent tube hums overhead, producing intense chromatic aberration and VHS edge distortion.',
    anomalies: 'Severe chromatic aberration · Doorways shrinking behind player · Zero backward traversal',
    hazardLevel: 'Claustrophobia & Lucidity Bleed',
    image: '/photo3.jpg',
    audioFreq: 440,
  },
  {
    id: '04',
    name: 'Sector 04',
    depth: 'Core Deviation',
    title: 'The Entity in Room 404',
    description: 'A dark, damp hallway with vintage patterned wallpaper. A single CRT television sits illuminated on the carpet, radiating harsh electrical static. The smiling face in the phosphors mimics your real-world head movements.',
    anomalies: 'Instant waking paralysis · Camera distortion spikes · Direct eye contact',
    hazardLevel: 'Fatal Sleep Paralysis',
    image: entityImg,
    audioFreq: 659.25,
  },
];

export const SectorsShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('01');
  const activeSector = SECTORS.find((s) => s.id === activeId) || SECTORS[0];

  const handleSelectSector = (sector: Sector) => {
    setActiveId(sector.id);
    audioEngine.playDreamChime(sector.audioFreq);
  };

  return (
    <section id="sectors" className="relative border-t border-white/10 bg-[#0a0a10] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>Liminal Topography</span>
            <span aria-hidden="true">·</span>
            <span>Direct In-Game Photographs</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl [text-wrap:balance]">
            Explore the Dream Sectors
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-400">
            Actual in-game captures from the Windows build of SOMNIUM. Select a sector below
            to inspect recorded telemetry, environmental anomalies, and subconscious acoustic frequencies.
          </p>
        </div>

        {/* Sector Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {SECTORS.map((sector) => {
            const isCurrent = sector.id === activeId;
            return (
              <button
                key={sector.id}
                onClick={() => handleSelectSector(sector)}
                type="button"
                className={`group flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? 'border-purple-500/50 bg-purple-500/15 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                    : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/20 hover:text-neutral-200'
                }`}
              >
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${isCurrent ? 'bg-purple-400' : 'bg-neutral-600'}`} />
                <span>{sector.name}: {sector.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Sector Showcase Detail */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Main Visual Asset Display */}
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-2xl lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={activeSector.image}
                alt={activeSector.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Scanline overlay */}
              <div className="crt-overlay absolute inset-0 opacity-40 pointer-events-none" />

              {/* Camcorder status HUD */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-emerald-400/90 drop-shadow">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span>REC [IN-GAME 60FPS]</span>
                </span>
                <span className="flex items-center gap-1">
                  <Camera className="h-3.5 w-3.5" />
                  <span>HUD: HI8 TAPE 1999</span>
                </span>
              </div>

              {/* Bottom tag inside picture */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-xs font-mono text-purple-300 uppercase tracking-widest">
                    {activeSector.depth}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                    {activeSector.title}
                  </h3>
                </div>
                <button
                  onClick={() => audioEngine.playGlitchSfx()}
                  title="Rescan Sector Audio"
                  className="rounded-lg border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-mono text-white/90 backdrop-blur-sm hover:bg-black/70 cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="h-3.5 w-3.5 text-purple-400" />
                  <span>Glitch Feed</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sector Lore & Specifications */}
          <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:col-span-5">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1 text-purple-400">
                <MapPin className="h-3.5 w-3.5" />
                <span>Sector {activeSector.id} / 04</span>
              </span>
              <span className="text-neutral-500">{activeSector.depth}</span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-bold text-white">
              {activeSector.title}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-neutral-300">
              {activeSector.description}
            </p>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs font-mono">
              <div className="flex items-start gap-2 text-neutral-300">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-400" />
                <div>
                  <span className="text-neutral-400 font-medium">Recorded Anomalies: </span>
                  <span className="text-neutral-200">{activeSector.anomalies}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-neutral-300">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                <div>
                  <span className="text-neutral-400 font-medium">Threat Assessment: </span>
                  <span className="text-amber-300">{activeSector.hazardLevel}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => audioEngine.playDreamChime(activeSector.audioFreq)}
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-purple-500/40 bg-purple-500/10 px-4 py-2.5 text-xs font-mono text-purple-300 hover:bg-purple-500/20 cursor-pointer transition-colors"
              >
                <Radio className="h-3.5 w-3.5" />
                <span>Tune Subconscious Frequency ({activeSector.audioFreq} Hz)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
