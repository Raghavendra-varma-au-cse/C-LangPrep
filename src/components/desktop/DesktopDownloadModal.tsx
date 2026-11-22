'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  CheckCircle2, 
  ExternalLink, 
  Terminal, 
  Sparkles,
  Monitor,
  Apple,
  Cpu,
  Smartphone
} from 'lucide-react';

interface DesktopDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesktopDownloadModal: React.FC<DesktopDownloadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedOS, setSelectedOS] = useState<'win' | 'mac' | 'linux' | 'mobile'>('win');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white border-2 border-[#ede3d2] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#fdf5ea] border-b-2 border-[#ede3d2] p-5 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white border border-[#f3d4b1] flex items-center justify-center p-2 shadow-2xs shrink-0">
                <img src="/c-academy-icon.svg" alt="C Academy Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-[#2b2520] flex items-center gap-2">
                  <span>Download Desktop &amp; Mobile Edition</span>
                  <span className="text-[10px] uppercase tracking-wider bg-[#e57e25] text-white px-2 py-0.5 rounded-full font-bold">
                    v1.0.0
                  </span>
                </h3>
                <p className="text-xs text-[#7d7065] font-medium">
                  Cross-platform installers for Windows, macOS, Linux, and 1-tap mobile/tablet PWA
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl hover:bg-black/5 flex items-center justify-center text-[#7d7065] hover:text-[#2b2520] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* OS Switcher Tabs */}
          <div className="px-6 pt-4 pb-2 border-b border-[#ede3d2] flex items-center gap-2 bg-white overflow-x-auto">
            <button
              onClick={() => setSelectedOS('win')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedOS === 'win'
                  ? 'bg-[#2b2520] text-white shadow-xs'
                  : 'bg-[#fdf5ea] text-[#7d7065] hover:bg-[#faebd7]'
              }`}
            >
              <Monitor className="w-4 h-4 text-[#e57e25]" />
              <span>Windows (.exe / .bat)</span>
            </button>
            <button
              onClick={() => setSelectedOS('mac')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedOS === 'mac'
                  ? 'bg-[#2b2520] text-white shadow-xs'
                  : 'bg-[#fdf5ea] text-[#7d7065] hover:bg-[#faebd7]'
              }`}
            >
              <Apple className="w-4 h-4 text-[#e57e25]" />
              <span>macOS (.dmg / .sh)</span>
            </button>
            <button
              onClick={() => setSelectedOS('linux')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedOS === 'linux'
                  ? 'bg-[#2b2520] text-white shadow-xs'
                  : 'bg-[#fdf5ea] text-[#7d7065] hover:bg-[#faebd7]'
              }`}
            >
              <Cpu className="w-4 h-4 text-[#e57e25]" />
              <span>Linux (Ubuntu / Fedora / Arch)</span>
            </button>
            <button
              onClick={() => setSelectedOS('mobile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedOS === 'mobile'
                  ? 'bg-[#2b2520] text-white shadow-xs'
                  : 'bg-[#fdf5ea] text-[#7d7065] hover:bg-[#faebd7]'
              }`}
            >
              <Smartphone className="w-4 h-4 text-[#e57e25]" />
              <span>Mobile &amp; Tablet (PWA)</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#2b2520]">
            {selectedOS === 'win' && (
              <div className="space-y-4">
                {/* Method 1: NSIS Setup.exe */}
                <div className="p-4 rounded-2xl border-2 border-[#e57e25]/30 bg-[#fdf5ea]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-[#2b2520]">Windows One-Click Installer (.exe)</span>
                      <span className="text-[10px] font-bold bg-[#e57e25] text-white px-2 py-0.5 rounded-full">Recommended</span>
                    </div>
                    <p className="text-xs text-[#7d7065]">
                      Installs the full native application, automatically creates the desktop shortcut icon on your Home screen, registers in Start Menu, and runs 100% offline.
                    </p>
                    <div className="text-[11px] font-mono text-[#e57e25] font-semibold">
                      Package: The Complete C Academy Setup 1.0.0.exe (x64)
                    </div>
                  </div>
                  <a
                    href="https://github.com/Raghavendra-varma-au-cse/C-LangPrep/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-[#e57e25] hover:bg-[#c46210] text-white shadow-sm transition shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download .exe</span>
                  </a>
                </div>

                {/* Method 2: Single-Click Script Installer */}
                <div className="p-4 rounded-2xl border-2 border-[#ede3d2] bg-white space-y-3">
                  <h4 className="text-sm font-black text-[#2b2520] flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#e57e25]" />
                    <span>Single-Click Local Port Launcher (install-desktop-app.bat)</span>
                  </h4>
                  <p className="text-xs text-[#7d7065]">
                    Clones and serves on your local port (3000) while creating the official desktop shortcut icon on your Desktop screen.
                  </p>
                  <div className="bg-[#2b2520] text-white p-3 rounded-xl font-mono text-xs flex items-center justify-between overflow-x-auto">
                    <code>git clone https://github.com/Raghavendra-varma-au-cse/C-LangPrep.git &amp;&amp; cd C-LangPrep &amp;&amp; .\install-desktop-app.bat</code>
                    <button
                      onClick={() => copyToClipboard('git clone https://github.com/Raghavendra-varma-au-cse/C-LangPrep.git && cd C-LangPrep && .\\install-desktop-app.bat', 'win-bat')}
                      className="ml-3 px-2.5 py-1 bg-[#e57e25] hover:bg-[#c46210] rounded-lg text-[10px] font-bold text-white transition shrink-0"
                    >
                      {copiedCmd === 'win-bat' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedOS === 'mac' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border-2 border-[#e57e25]/30 bg-[#fdf5ea]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-[#2b2520]">macOS Disk Image (.dmg / .zip)</span>
                      <span className="text-[10px] font-bold bg-[#e57e25] text-white px-2 py-0.5 rounded-full">Universal</span>
                    </div>
                    <p className="text-xs text-[#7d7065]">
                      Drag and drop to Applications. Supports both Apple Silicon (M1/M2/M3/M4) and Intel Macs.
                    </p>
                    <div className="text-[11px] font-mono text-[#e57e25] font-semibold">
                      Package: The-Complete-C-Academy-macOS.dmg
                    </div>
                  </div>
                  <a
                    href="https://github.com/Raghavendra-varma-au-cse/C-LangPrep/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-[#e57e25] hover:bg-[#c46210] text-white shadow-sm transition shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download .dmg</span>
                  </a>
                </div>

                <div className="p-4 rounded-2xl border-2 border-[#ede3d2] bg-white space-y-3">
                  <h4 className="text-sm font-black text-[#2b2520] flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#e57e25]" />
                    <span>Single-Click macOS Terminal Installer (install-desktop-app.sh)</span>
                  </h4>
                  <p className="text-xs text-[#7d7065]">
                    Builds the production package, creates <code className="bg-[#fdf5ea] px-1 py-0.5 rounded text-[#e57e25]">~/Desktop/The Complete C Academy.command</code>, and launches the local port runner.
                  </p>
                  <div className="bg-[#2b2520] text-white p-3 rounded-xl font-mono text-xs flex items-center justify-between overflow-x-auto">
                    <code>git clone https://github.com/Raghavendra-varma-au-cse/C-LangPrep.git &amp;&amp; cd C-LangPrep &amp;&amp; chmod +x install-desktop-app.sh &amp;&amp; ./install-desktop-app.sh</code>
                    <button
                      onClick={() => copyToClipboard('git clone https://github.com/Raghavendra-varma-au-cse/C-LangPrep.git && cd C-LangPrep && chmod +x install-desktop-app.sh && ./install-desktop-app.sh', 'mac-sh')}
                      className="ml-3 px-2.5 py-1 bg-[#e57e25] hover:bg-[#c46210] rounded-lg text-[10px] font-bold text-white transition shrink-0"
                    >
                      {copiedCmd === 'mac-sh' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedOS === 'linux' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border-2 border-[#e57e25]/30 bg-[#fdf5ea]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-[#2b2520]">Linux Packages (.AppImage, .deb, .rpm)</span>
                      <span className="text-[10px] font-bold bg-[#e57e25] text-white px-2 py-0.5 rounded-full">Universal</span>
                    </div>
                    <p className="text-xs text-[#7d7065]">
                      Supports Ubuntu &amp; Debian (.deb), Fedora &amp; RedHat (.rpm), and Universal portable (.AppImage).
                    </p>
                    <div className="text-[11px] font-mono text-[#e57e25] font-semibold">
                      Packages: The-Complete-C-Academy.AppImage &bull; .deb &bull; .rpm
                    </div>
                  </div>
                  <a
                    href="https://github.com/Raghavendra-varma-au-cse/C-LangPrep/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-[#e57e25] hover:bg-[#c46210] text-white shadow-sm transition shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download AppImage</span>
                  </a>
                </div>

                <div className="p-4 rounded-2xl border-2 border-[#ede3d2] bg-white space-y-3">
                  <h4 className="text-sm font-black text-[#2b2520] flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#e57e25]" />
                    <span>Single-Click Linux Desktop Entry (install-desktop-app.sh)</span>
                  </h4>
                  <p className="text-xs text-[#7d7065]">
                    Generates a native <code className="bg-[#fdf5ea] px-1 py-0.5 rounded text-[#e57e25]">~/Desktop/c-academy.desktop</code> file with icon and launches the local port engine.
                  </p>
                  <div className="bg-[#2b2520] text-white p-3 rounded-xl font-mono text-xs flex items-center justify-between overflow-x-auto">
                    <code>git clone https://github.com/Raghavendra-varma-au-cse/C-LangPrep.git &amp;&amp; cd C-LangPrep &amp;&amp; chmod +x install-desktop-app.sh &amp;&amp; ./install-desktop-app.sh</code>
                    <button
                      onClick={() => copyToClipboard('git clone https://github.com/Raghavendra-varma-au-cse/C-LangPrep.git && cd C-LangPrep && chmod +x install-desktop-app.sh && ./install-desktop-app.sh', 'linux-sh')}
                      className="ml-3 px-2.5 py-1 bg-[#e57e25] hover:bg-[#c46210] rounded-lg text-[10px] font-bold text-white transition shrink-0"
                    >
                      {copiedCmd === 'linux-sh' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedOS === 'mobile' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border-2 border-[#e57e25]/30 bg-[#fdf5ea]/40 space-y-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-[#e57e25]" />
                    <span className="font-black text-sm text-[#2b2520]">Instant 1-Tap Mobile &amp; Tablet App (PWA)</span>
                    <span className="text-[10px] font-bold bg-[#e57e25] text-white px-2 py-0.5 rounded-full">Zero Store Download</span>
                  </div>
                  <p className="text-xs text-[#7d7065]">
                    The academy is engineered as an ultra-responsive Progressive Web App that works seamlessly on all Android phones, iPhones, iPads, and Android tablets with full-screen native execution and zero browser address bars.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Android Install Guide */}
                  <div className="p-4 rounded-2xl border-2 border-[#ede3d2] bg-white space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🤖</span>
                      <h4 className="font-black text-sm text-[#2b2520]">Android Phone &amp; Tablet</h4>
                    </div>
                    <ol className="text-xs text-[#7d7065] space-y-2 list-decimal list-inside">
                      <li>Open <strong className="text-[#2b2520]">Chrome</strong> or <strong className="text-[#2b2520]">Edge</strong> on your device.</li>
                      <li>Visit the live web app: <a href="https://raghavendra-varma-au-cse.github.io/C-LangPrep/" target="_blank" rel="noopener noreferrer" className="text-[#e57e25] font-bold underline">C Academy</a>.</li>
                      <li>Tap the three dots <strong className="text-[#2b2520]">⋮ (Menu)</strong> in the top right.</li>
                      <li>Tap <strong className="text-[#2b2520]">&quot;Install App&quot;</strong> or <strong className="text-[#2b2520]">&quot;Add to Home Screen&quot;</strong>.</li>
                      <li>The high-res C Academy icon is placed directly on your phone/tablet home screen!</li>
                    </ol>
                  </div>

                  {/* iOS Install Guide */}
                  <div className="p-4 rounded-2xl border-2 border-[#ede3d2] bg-white space-y-3">
                    <div className="flex items-center gap-2">
                      <Apple className="w-5 h-5 text-[#2b2520]" />
                      <h4 className="font-black text-sm text-[#2b2520]">iPhone &amp; iPad (iOS)</h4>
                    </div>
                    <ol className="text-xs text-[#7d7065] space-y-2 list-decimal list-inside">
                      <li>Open <strong className="text-[#2b2520]">Safari</strong> on your iPhone or iPad.</li>
                      <li>Visit: <a href="https://raghavendra-varma-au-cse.github.io/C-LangPrep/" target="_blank" rel="noopener noreferrer" className="text-[#e57e25] font-bold underline">C Academy</a>.</li>
                      <li>Tap the <strong className="text-[#2b2520]">Share icon (square with arrow up)</strong> at the bottom bar.</li>
                      <li>Scroll down and tap <strong className="text-[#2b2520]">&quot;Add to Home Screen&quot;</strong>.</li>
                      <li>Tap <strong className="text-[#2b2520]">Add</strong>. Launches in dedicated full-screen mode like a native App Store app!</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Live Web Deployments */}
            <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#ede3d2] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7d7065] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#e57e25]" />
                  <span>Official Live Cloud Deployments</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                  href="https://raghavendra-varma-au-cse.github.io/C-LangPrep/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-[#ede3d2] rounded-xl hover:border-[#e57e25] transition flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-[#2b2520] group-hover:text-[#e57e25]">GitHub Pages Live App</div>
                    <div className="text-[11px] text-[#7d7065] truncate max-w-[200px]">raghavendra-varma-au-cse.github.io/C-LangPrep</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#7d7065] group-hover:text-[#e57e25]" />
                </a>

                <a
                  href="https://raghavendravarma.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-[#ede3d2] rounded-xl hover:border-[#e57e25] transition flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-[#2b2520] group-hover:text-[#e57e25]">Architect Portfolio</div>
                    <div className="text-[11px] text-[#7d7065] truncate max-w-[200px]">raghavendravarma.vercel.app</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#7d7065] group-hover:text-[#e57e25]" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#fdf5ea] border-t border-[#ede3d2] flex items-center justify-between text-xs text-[#7d7065]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Free &bull; Open-Source &bull; MIT License</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white border border-[#ede3d2] hover:bg-[#faf6f0] text-[#2b2520] font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
