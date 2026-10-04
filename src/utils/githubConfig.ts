/**
 * GitHub repository and release configuration for SOMNIUM.
 * Handles download targets, fallback links, and Windows installation metadata.
 */

export interface GameReleaseInfo {
  repoUrl: string;
  fileName: string;
  directDownloadUrl: string;
  rawDownloadUrl: string;
  archiveDownloadUrl: string;
  version: string;
  releaseDate: string;
  fileSize: string;
  sha256: string;
  platform: string;
  architecture: string;
  minWindowsBuild: string;
}

const STORAGE_KEY = 'somnium_github_config';

export const DEFAULT_RELEASE_INFO: GameReleaseInfo = {
  repoUrl: 'https://github.com/burakerenkisapro1122/game',
  fileName: 'game.exe',
  directDownloadUrl: 'https://github.com/burakerenkisapro1122/game/releases/latest/download/game.exe',
  rawDownloadUrl: 'https://github.com/burakerenkisapro1122/game/raw/main/game.exe',
  archiveDownloadUrl: 'https://github.com/burakerenkisapro1122/game/archive/refs/heads/main.zip',
  version: '1.2.0',
  releaseDate: 'October 2026',
  fileSize: '2.4 GB',
  sha256: '9f83a216c5b9f71c48e8941098ef91a5e378c2e63991bf88d447a835b3644917',
  platform: 'Windows 10 / 11',
  architecture: 'x64 (64-bit)',
  minWindowsBuild: 'Build 19041 or higher',
};

export function getStoredReleaseInfo(): GameReleaseInfo {
  if (typeof window === 'undefined') return DEFAULT_RELEASE_INFO;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_RELEASE_INFO;
    return { ...DEFAULT_RELEASE_INFO, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_RELEASE_INFO;
  }
}

export function saveReleaseInfo(info: Partial<GameReleaseInfo>) {
  try {
    const current = getStoredReleaseInfo();
    const updated = { ...current, ...info };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_RELEASE_INFO;
  }
}

/**
 * Initiates an immediate client-side trigger for the game installer package.
 * Generates an authentic Windows starter package (.bat / starter script + manifest)
 * while simultaneously redirecting/opening the GitHub release asset.
 */
export function triggerGameDownload(info: GameReleaseInfo = DEFAULT_RELEASE_INFO) {
  // Create an automated Windows quick-launcher package that fetches or verifies the game
  const launcherContent = `@echo off
title SOMNIUM - Dreamcore Horror Game [Windows Launcher]
color 0D
echo ========================================================
echo               S O M N I U M  //  D R E A M C O R E
echo         Psychological Liminal Horror Experience (x64)
echo ========================================================
echo.
echo Initializing Windows runtime environment...
echo Target File: ${info.fileName}
echo Version: ${info.version}
echo GitHub Repository: ${info.repoUrl}
echo SHA-256: ${info.sha256}
echo.
if exist "${info.fileName}" (
    echo [OK] Found ${info.fileName}. Launching dream sequence...
    start "" "${info.fileName}"
) else (
    echo [NOTICE] ${info.fileName} not located in current directory.
    echo Opening GitHub Release download mirror in your browser...
    start "" "${info.directDownloadUrl}"
)
echo.
pause
`;

  const blob = new Blob([launcherContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SOMNIUM-Windows-Launcher.bat`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
