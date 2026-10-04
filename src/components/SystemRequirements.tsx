import React from 'react';
import { Monitor, Check, AlertCircle, HardDrive, Cpu, Layers } from 'lucide-react';

export const SystemRequirements: React.FC = () => {
  return (
    <section id="specs" className="relative border-t border-white/10 bg-[#0a0a10] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
            <Monitor className="h-3.5 w-3.5" />
            <span>Target Platform Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Windows x64 Native</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl [text-wrap:balance]">
            Windows System Requirements
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-400">
            SOMNIUM is compiled natively for Microsoft Windows 64-bit architecture.
            Please ensure your system meets the minimum specifications before executing <code className="text-purple-300 font-mono">game.exe</code>.
          </p>
        </div>

        {/* Windows Notice Bar */}
        <div className="mt-8 flex items-center gap-3 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 text-xs font-mono text-purple-200">
          <AlertCircle className="h-4 w-4 shrink-0 text-purple-400" />
          <span>
            <strong>Windows Exclusive Notice:</strong> macOS and Linux runtimes are not officially supported.
            DirectX 12 feature level 11_0 or higher is required for volumetric fog shaders.
          </span>
        </div>

        {/* Requirements Comparison Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Minimum Specs */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-display text-xl font-bold text-white">
                  Minimum Specifications
                </h3>
                <span className="text-xs font-mono text-neutral-400">1080p @ 30 FPS Low</span>
              </div>

              <dl className="mt-6 space-y-4 text-xs font-mono">
                <div>
                  <dt className="text-neutral-500">Operating System</dt>
                  <dd className="mt-1 font-medium text-neutral-200">
                    Windows 10 (64-bit) Version 1909 or later
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Processor (CPU)</dt>
                  <dd className="mt-1 font-medium text-neutral-200">
                    Intel Core i5-4460 3.20GHz / AMD FX-6300
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Memory (RAM)</dt>
                  <dd className="mt-1 font-medium text-neutral-200 tabular-nums">
                    8 GB RAM
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Graphics (GPU)</dt>
                  <dd className="mt-1 font-medium text-neutral-200">
                    NVIDIA GeForce GTX 960 (4 GB) / AMD Radeon R9 280
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">DirectX Version</dt>
                  <dd className="mt-1 font-medium text-neutral-200">
                    DirectX 11 / DirectX 12 Feature Level 11_0
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Available Storage</dt>
                  <dd className="mt-1 font-medium text-neutral-200 tabular-nums">
                    4.5 GB available space (SSD Recommended)
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Audio</dt>
                  <dd className="mt-1 font-medium text-neutral-200">
                    DirectX compatible soundcard or onboard audio
                  </dd>
                </div>
              </dl>
            </div>

            {/* Recommended Specs */}
            <div className="p-6 sm:p-8 bg-purple-950/[0.04]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-white">
                    Recommended Specifications
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded bg-purple-500/20 px-2 py-0.5 text-[10px] font-mono text-purple-300">
                    <Check className="h-3 w-3" /> Ideal
                  </span>
                </div>
                <span className="text-xs font-mono text-purple-300">1440p @ 60 FPS Ultra</span>
              </div>

              <dl className="mt-6 space-y-4 text-xs font-mono">
                <div>
                  <dt className="text-neutral-500">Operating System</dt>
                  <dd className="mt-1 font-medium text-neutral-200">
                    Windows 11 (64-bit) latest build
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Processor (CPU)</dt>
                  <dd className="mt-1 font-medium text-neutral-200">
                    Intel Core i7-8700K / AMD Ryzen 5 3600X
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Memory (RAM)</dt>
                  <dd className="mt-1 font-medium text-neutral-200 tabular-nums">
                    16 GB RAM (Dual Channel)
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Graphics (GPU)</dt>
                  <dd className="mt-1 font-medium text-neutral-200">
                    NVIDIA GeForce RTX 2060 (6 GB) / AMD Radeon RX 5600 XT
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">DirectX Version</dt>
                  <dd className="mt-1 font-medium text-neutral-200">
                    DirectX 12 Ultimate (Ray-marched shadows)
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Available Storage</dt>
                  <dd className="mt-1 font-medium text-neutral-200 tabular-nums">
                    4.5 GB NVMe M.2 SSD
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Audio</dt>
                  <dd className="mt-1 font-medium text-neutral-200">
                    Windows Sonic for Headphones or Dolby Atmos for PC
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
