import React from 'react';
import { Github, Download, Heart } from 'lucide-react';
import { getStoredReleaseInfo } from '../utils/githubConfig';

interface FooterProps {
  onOpenDownload: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload }) => {
  const releaseInfo = getStoredReleaseInfo();

  return (
    <footer className="border-t border-white/10 bg-[#050508] py-12 text-xs font-mono text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand & Wordmark */}
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold tracking-[0.2em] text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-purple-500" />
              SOMNIUM
            </div>
            <p className="mt-1 text-neutral-500 max-w-md">
              A psychological liminal horror game based on dreamcore, nostalgia decay, and non-Euclidean memory.
              Compiled natively for Windows x64.
            </p>
          </div>

          {/* Nav mirror & GitHub links */}
          <div className="flex flex-wrap items-center gap-6 text-neutral-400">
            <a href="#sectors" className="hover:text-white transition-colors">
              Sectors
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Mechanics
            </a>
            <a href="#terminal" className="hover:text-white transition-colors">
              Dream Feed
            </a>
            <a href="#specs" className="hover:text-white transition-colors">
              Windows Specs
            </a>
            <a href="#logs" className="hover:text-white transition-colors">
              Changelog
            </a>
            <a
              href={releaseInfo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-purple-300 hover:text-white transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/10 pt-6 text-neutral-500">
          <div>
            © {new Date().getFullYear()} SOMNIUM Project · Distributed via GitHub Releases.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenDownload}
              className="hover:text-neutral-300 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Download className="h-3 w-3" />
              <span>Download {releaseInfo.fileName}</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>Windows 10 / 11 64-bit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
