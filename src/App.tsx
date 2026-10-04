/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SectorsShowcase } from './components/SectorsShowcase';
import { GallerySection } from './components/GallerySection';
import { DreamTerminal } from './components/DreamTerminal';
import { GameFeatures } from './components/GameFeatures';
import { SystemRequirements } from './components/SystemRequirements';
import { DevLogs } from './components/DevLogs';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { audioEngine } from './utils/audio';

export default function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);
  const [audioActive, setAudioActive] = useState<boolean>(false);

  const toggleAudio = () => {
    const isPlaying = audioEngine.toggle();
    setAudioActive(isPlaying);
  };

  const toggleCrt = () => {
    setCrtEnabled((prev) => !prev);
    audioEngine.playGlitchSfx();
  };

  // Listen for user interaction to resume audio context if desired
  useEffect(() => {
    const handleFirstClick = () => {
      // do not auto-play loud audio without consent, but warm up context
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, []);

  const scrollToTerminal = () => {
    const el = document.getElementById('terminal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative min-h-screen bg-[#07070b] text-neutral-100 font-sans selection:bg-purple-500/30 selection:text-purple-200 ${crtEnabled ? 'crt-active' : ''}`}>
      {/* Optional Global CRT scanlines overlay */}
      {crtEnabled && (
        <div className="fixed inset-0 z-50 pointer-events-none crt-overlay opacity-30" />
      )}

      {/* Navigation */}
      <Navbar
        onOpenDownload={() => setDownloadModalOpen(true)}
        crtEnabled={crtEnabled}
        onToggleCrt={toggleCrt}
        audioActive={audioActive}
        onToggleAudio={toggleAudio}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenDownload={() => setDownloadModalOpen(true)}
          onOpenTerminal={scrollToTerminal}
        />

        {/* Sectors Showcase */}
        <SectorsShowcase />

        {/* In-Game Gameplay Photo Gallery */}
        <GallerySection
          onOpenDownload={() => setDownloadModalOpen(true)}
        />

        {/* Playable Interactive Dream Terminal */}
        <DreamTerminal
          onOpenDownload={() => setDownloadModalOpen(true)}
        />

        {/* Core Game Features */}
        <GameFeatures />

        {/* Windows System Requirements */}
        <SystemRequirements />

        {/* Dev Logs & Patch History */}
        <DevLogs
          onOpenDownload={() => setDownloadModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenDownload={() => setDownloadModalOpen(true)}
      />

      {/* Windows Download Hub Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
}
