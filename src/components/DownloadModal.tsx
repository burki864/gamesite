import React, { useState } from 'react';
import {
  X,
  Download,
  Github,
  HardDrive,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  Settings,
  AlertTriangle,
  FolderArchive,
  Info
} from 'lucide-react';
import {
  getStoredReleaseInfo,
  saveReleaseInfo,
  triggerGameDownload,
  GameReleaseInfo,
} from '../utils/githubConfig';
import { audioEngine } from '../utils/audio';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [releaseInfo, setReleaseInfo] = useState<GameReleaseInfo>(getStoredReleaseInfo());
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [copiedClone, setCopiedClone] = useState<boolean>(false);
  const [isEditingRepo, setIsEditingRepo] = useState<boolean>(false);
  const [customRepo, setCustomRepo] = useState<string>(releaseInfo.repoUrl);
  const [customFileName, setCustomFileName] = useState<string>(releaseInfo.fileName);
  const [downloadStarted, setDownloadStarted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'download' | 'guide' | 'integrity'>('download');

  if (!isOpen) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(releaseInfo.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyClone = () => {
    navigator.clipboard.writeText(`git clone ${releaseInfo.repoUrl}.git`);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const handleTriggerDownload = () => {
    audioEngine.playDreamChime(523.25);
    setDownloadStarted(true);
    triggerGameDownload(releaseInfo);
    // Also open the direct GitHub download mirror in a new window/tab if configured
    window.open(releaseInfo.directDownloadUrl, '_blank');
  };

  const handleSaveRepoConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveReleaseInfo({
      repoUrl: customRepo.trim(),
      fileName: customFileName.trim(),
      directDownloadUrl: `${customRepo.trim().replace(/\/$/, '')}/releases/latest/download/${customFileName.trim()}`,
      rawDownloadUrl: `${customRepo.trim().replace(/\/$/, '')}/raw/main/${customFileName.trim()}`,
    });
    setReleaseInfo(updated);
    setIsEditingRepo(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-[#0d0d14] shadow-2xl">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#12121c]">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-500 animate-pulse" />
            <h2 className="font-display text-base font-bold tracking-wider text-white uppercase">
              Download SOMNIUM for Windows
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="flex border-b border-white/10 bg-[#0e0e17] px-6 text-xs font-mono">
          <button
            onClick={() => setActiveTab('download')}
            type="button"
            className={`border-b-2 py-3 px-4 transition-colors cursor-pointer ${
              activeTab === 'download'
                ? 'border-purple-400 text-purple-300 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Windows Packages
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            type="button"
            className={`border-b-2 py-3 px-4 transition-colors cursor-pointer ${
              activeTab === 'guide'
                ? 'border-purple-400 text-purple-300 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Windows Defender Guide
          </button>
          <button
            onClick={() => setActiveTab('integrity')}
            type="button"
            className={`border-b-2 py-3 px-4 transition-colors cursor-pointer ${
              activeTab === 'integrity'
                ? 'border-purple-400 text-purple-300 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Checksum & GitHub Repo
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {activeTab === 'download' && (
            <div className="space-y-6">
              {/* Primary Download Card */}
              <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                      <span>Official Executable</span>
                      <span aria-hidden="true">·</span>
                      <span>Windows 10 / 11 64-bit</span>
                    </div>
                    <h3 className="mt-1 font-display text-xl font-bold text-white flex items-center gap-2">
                      <span>{releaseInfo.fileName}</span>
                      <span className="text-xs font-mono text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded">
                        v{releaseInfo.version}
                      </span>
                    </h3>
                    <p className="mt-1 text-xs text-neutral-300">
                      Complete packaged build including game assets, audio soundbanks, and DirectX 12 shaders.
                    </p>
                  </div>

                  <button
                    onClick={handleTriggerDownload}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download {releaseInfo.fileName}</span>
                  </button>
                </div>

                {downloadStarted && (
                  <div className="mt-4 rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-3 text-xs font-mono text-emerald-300 flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>
                      Download initialized! If the browser pop-up is blocked, use the direct GitHub mirror link below.
                    </span>
                  </div>
                )}
              </div>

              {/* Mirror Links & Options */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Alternative Mirrors & Formats
                </h4>

                {/* GitHub Releases Direct */}
                <a
                  href={releaseInfo.directDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs font-mono text-neutral-200 hover:bg-white/[0.07] hover:border-purple-400/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Github className="h-4 w-4 text-neutral-400" />
                    <div>
                      <div className="font-semibold text-white">GitHub Releases Mirror (game.exe)</div>
                      <div className="text-neutral-400 truncate max-w-sm">{releaseInfo.directDownloadUrl}</div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-neutral-400" />
                </a>

                {/* GitHub Raw Main Branch File */}
                <a
                  href={releaseInfo.rawDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs font-mono text-neutral-200 hover:bg-white/[0.07] hover:border-purple-400/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HardDrive className="h-4 w-4 text-purple-400" />
                    <div>
                      <div className="font-semibold text-white">Direct Raw GitHub Link (Main Branch)</div>
                      <div className="text-neutral-400 truncate max-w-sm">{releaseInfo.rawDownloadUrl}</div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-neutral-400" />
                </a>

                {/* Portable ZIP Archive */}
                <a
                  href={releaseInfo.archiveDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs font-mono text-neutral-200 hover:bg-white/[0.07] hover:border-purple-400/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FolderArchive className="h-4 w-4 text-neutral-400" />
                    <div>
                      <div className="font-semibold text-white">Source / Portable ZIP Package (.zip)</div>
                      <div className="text-neutral-400">Extract anywhere without running Windows installer</div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-neutral-400" />
                </a>
              </div>

              {/* Windows Quick Notice */}
              <div className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-black/40 p-3.5 text-xs text-neutral-300">
                <Info className="h-4 w-4 shrink-0 text-purple-400 mt-0.5" />
                <div>
                  <strong>First time launching on Windows?</strong> Indie executables downloaded from GitHub may trigger
                  the Windows Defender SmartScreen notice. Switch to the <em>Windows Defender Guide</em> tab above to view the simple 2-click bypass.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-5 text-xs font-mono text-neutral-300">
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-200">
                <div className="flex items-center gap-2 font-bold uppercase">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <span>Why Windows Defender Displays "Windows Protected Your PC"</span>
                </div>
                <p className="mt-2 leading-relaxed text-xs">
                  Microsoft Windows SmartScreen displays a warning on any newly downloaded indie game executable that does not possess an enterprise code-signing certificate (which costs $400+/year). The file is completely clean, open source, and hosted transparently on GitHub.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 font-bold">1</span>
                  <div>
                    <h5 className="font-bold text-white text-sm">Download the Game Executable</h5>
                    <p className="mt-1 text-neutral-400">
                      Download <code className="text-purple-300">game.exe</code> to your Downloads folder or preferred directory.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 font-bold">2</span>
                  <div>
                    <h5 className="font-bold text-white text-sm">Click "More info" on the Blue Prompt</h5>
                    <p className="mt-1 text-neutral-400">
                      When the Windows blue banner pops up saying "Windows protected your PC", click the underlined link reading <strong>"More info"</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 font-bold">3</span>
                  <div>
                    <h5 className="font-bold text-white text-sm">Click "Run anyway"</h5>
                    <p className="mt-1 text-neutral-400">
                      A button labeled <strong>"Run anyway"</strong> will appear at the bottom right. Click it to launch SOMNIUM directly into fullscreen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrity' && (
            <div className="space-y-6 text-xs font-mono">
              {/* Checksum Info */}
              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="flex items-center gap-1.5 text-neutral-200">
                    <ShieldCheck className="h-4 w-4 text-purple-400" />
                    <span>SHA-256 Checksum Verification</span>
                  </span>
                  <button
                    onClick={handleCopyHash}
                    type="button"
                    className="flex items-center gap-1 text-purple-400 hover:text-purple-300 cursor-pointer"
                  >
                    {copiedHash ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="mt-2 rounded bg-neutral-900 p-2.5 text-neutral-300 break-all select-all font-mono text-[11px]">
                  {releaseInfo.sha256}
                </div>
                <p className="mt-2 text-[11px] text-neutral-500">
                  Verify in Windows PowerShell: <code className="text-neutral-400">Get-FileHash .\game.exe -Algorithm SHA256</code>
                </p>
              </div>

              {/* GitHub Repo Clone */}
              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="flex items-center gap-1.5 text-neutral-200">
                    <Terminal className="h-4 w-4 text-emerald-400" />
                    <span>Clone via Git Command Line</span>
                  </span>
                  <button
                    onClick={handleCopyClone}
                    type="button"
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 cursor-pointer"
                  >
                    {copiedClone ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedClone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="mt-2 rounded bg-neutral-900 p-2.5 text-neutral-300 select-all font-mono text-[11px]">
                  git clone {releaseInfo.repoUrl}.git
                </div>
              </div>

              {/* Creator Custom Repository Config */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-300 font-bold">
                    <Settings className="h-4 w-4 text-purple-400" />
                    <span>Configured GitHub Repository</span>
                  </div>
                  <button
                    onClick={() => setIsEditingRepo(!isEditingRepo)}
                    type="button"
                    className="text-xs text-purple-400 hover:underline cursor-pointer"
                  >
                    {isEditingRepo ? 'Cancel' : 'Change Repository Link'}
                  </button>
                </div>

                {!isEditingRepo ? (
                  <div className="mt-2 flex items-center justify-between">
                    <a
                      href={releaseInfo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:underline flex items-center gap-1 truncate max-w-md"
                    >
                      <span>{releaseInfo.repoUrl}</span>
                      <ExternalLink className="h-3 w-3 inline" />
                    </a>
                    <span className="text-neutral-500">Target: {releaseInfo.fileName}</span>
                  </div>
                ) : (
                  <form onSubmit={handleSaveRepoConfig} className="mt-3 space-y-3">
                    <div>
                      <label className="block text-neutral-400 text-[11px]">Repository URL</label>
                      <input
                        type="url"
                        value={customRepo}
                        onChange={(e) => setCustomRepo(e.target.value)}
                        className="mt-1 w-full rounded border border-white/20 bg-neutral-900 px-3 py-1.5 text-white"
                        placeholder="https://github.com/username/game"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 text-[11px]">Binary File Name</label>
                      <input
                        type="text"
                        value={customFileName}
                        onChange={(e) => setCustomFileName(e.target.value)}
                        className="mt-1 w-full rounded border border-white/20 bg-neutral-900 px-3 py-1.5 text-white"
                        placeholder="game.exe"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded bg-purple-600 px-3 py-1.5 text-xs text-white hover:bg-purple-500 cursor-pointer font-bold"
                    >
                      Save Configuration
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#12121c] px-6 py-4 text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Windows x64 Build Verified</span>
          </span>
          <button
            onClick={onClose}
            type="button"
            className="rounded px-3 py-1 text-neutral-400 hover:text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
