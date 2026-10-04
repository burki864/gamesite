import React, { useState } from 'react';
import { Camera, Maximize2, X, Download, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface Screenshot {
  id: number;
  title: string;
  zone: string;
  depth: string;
  description: string;
  src: string;
  technical: string;
}

const SCREENSHOTS: Screenshot[] = [
  {
    id: 1,
    title: 'The Solitary Carousel & Endless Mounds',
    zone: 'Sector 01: Void Plateau',
    depth: 'Subconscious Layer 1',
    description: 'Minimalist windowless huts perched atop barren mounds. At the dead center of the yellow grass lies a rusted playground roundabout rotating under a static daylight haze.',
    src: '/photo1.jpg',
    technical: 'FOV: 90° · DirectX 12 · Volumetric Atmospheric Fog · 1440p Native',
  },
  {
    id: 2,
    title: 'The Subterranean Boardwalk & Brick Vaults',
    zone: 'Sector 02: Brick Promenade',
    depth: 'Subconscious Layer 2',
    description: 'Vast underground boardwalk with polished aged wooden deck boards and weathered brick ramparts. Harsh fluorescent spotlights reflect off diamond skylights into pitch darkness.',
    src: '/photo2.jpg',
    technical: 'Acoustics: Convolution Reverb · Ray-Marched Shadows · 60 FPS Locked',
  },
  {
    id: 3,
    title: 'The Infinite Claustrophobic Descent',
    zone: 'Sector 03: The Wooden Shaft',
    depth: 'Subconscious Layer 4',
    description: 'A terrifying first-person descent down a narrow wooden corridor framed by low ceiling crossbeams. Receding square doorways shrink into pitch darkness under heavy chromatic aberration.',
    src: '/photo3.jpg',
    technical: 'Optics: Hi8 Tape Aberration · Radial Blur · Temporal Non-Euclidean Loop',
  },
];

interface GallerySectionProps {
  onOpenDownload: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenDownload }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    audioEngine.playDreamChime(350 + index * 80);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % SCREENSHOTS.length);
      audioEngine.playDreamChime(420);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
      audioEngine.playDreamChime(320);
    }
  };

  return (
    <section id="gallery" className="relative border-t border-white/10 bg-[#07070b] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
              <Camera className="h-3.5 w-3.5" />
              <span>In-Game Archival Gallery</span>
              <span aria-hidden="true">·</span>
              <span>Windows Build Footage</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl [text-wrap:balance]">
              Windows Gameplay Captures
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-400">
              Direct high-resolution frames captured from the latest Windows development build of SOMNIUM.
              Click any photograph to inspect in full-resolution with camcorder telemetry.
            </p>
          </div>

          <button
            onClick={onOpenDownload}
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600/20 border border-purple-500/40 px-4 py-2.5 text-xs font-mono text-purple-300 hover:bg-purple-600/30 transition-all cursor-pointer whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Play On Windows (game.exe)</span>
          </button>
        </div>

        {/* 3 Photo Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {SCREENSHOTS.map((item, index) => (
            <div
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-purple-500/40 hover:bg-white/[0.04] shadow-lg"
            >
              {/* Image Preview Container */}
              <div
                onClick={() => openLightbox(index)}
                className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-black"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />
                <div className="crt-overlay absolute inset-0 opacity-30 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                    {item.zone}
                  </span>
                  <span className="bg-black/60 backdrop-blur-sm p-1.5 rounded-full text-white/80 group-hover:text-purple-300 transition-colors">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] bg-black/30 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/50 bg-purple-950/80 px-3 py-1.5 text-xs font-mono text-purple-200">
                    <Eye className="h-3.5 w-3.5 text-purple-400" />
                    <span>View Archival Frame</span>
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="text-[11px] font-mono text-purple-400 uppercase tracking-widest">
                    {item.depth}
                  </div>
                  <h3 className="mt-1 font-display text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-300">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-white/10 pt-4 text-[11px] font-mono text-neutral-500">
                  {item.technical}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-xl animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            type="button"
            className="absolute top-6 right-6 z-50 rounded-full border border-white/20 bg-black/60 p-2.5 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={prevLightbox}
            type="button"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 rounded-full border border-white/20 bg-black/60 p-3 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next button */}
          <button
            onClick={nextLightbox}
            type="button"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 rounded-full border border-white/20 bg-black/60 p-3 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Lightbox Main Frame */}
          <div className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-[#08080d] shadow-2xl">
            <div className="relative">
              <img
                src={SCREENSHOTS[lightboxIndex].src}
                alt={SCREENSHOTS[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-full object-contain bg-black"
              />
              <div className="crt-overlay absolute inset-0 opacity-40 pointer-events-none" />
            </div>

            <div className="border-t border-white/10 bg-[#0d0d14] p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase">
                    <span>{SCREENSHOTS[lightboxIndex].zone}</span>
                    <span aria-hidden="true">·</span>
                    <span>{SCREENSHOTS[lightboxIndex].depth}</span>
                  </div>
                  <h4 className="mt-1 font-display text-xl font-bold text-white">
                    {SCREENSHOTS[lightboxIndex].title}
                  </h4>
                  <p className="mt-1 text-xs text-neutral-300 max-w-2xl">
                    {SCREENSHOTS[lightboxIndex].description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      closeLightbox();
                      onOpenDownload();
                    }}
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2.5 text-xs font-mono text-white font-semibold cursor-pointer transition-all"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Windows Build</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
