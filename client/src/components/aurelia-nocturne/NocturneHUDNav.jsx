import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, ArrowLeft, Sparkles, Compass } from 'lucide-react';

export default function NocturneHUDNav({ onOpenAllocation, isTritiumMode }) {
  const [genevaTime, setGenevaTime] = useState('');
  const [audioActive, setAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const audioContextRef = useRef(null);
  const audioIntervalRef = useRef(null);

  // Live Geneva CET Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Europe/Zurich',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setGenevaTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll listener for compact HUD styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Audio API Mechanical Escapement Ticking (3 Hz / 21,600 vph)
  const toggleAudio = () => {
    if (audioActive) {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setAudioActive(false);
      return;
    }

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Realistic Horological Escapement Dual-Tick (tick-tack at ~333ms intervals)
      let tickToggle = false;
      const playTick = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Frequency difference between escapement pallet stones (jewel click)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(tickToggle ? 3200 : 2850, ctx.currentTime);
        tickToggle = !tickToggle;

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      };

      playTick();
      audioIntervalRef.current = setInterval(playTick, 333); // 3 Hz oscillation
      setAudioActive(true);
    } catch (e) {
      console.warn('Web Audio not supported or blocked:', e);
    }
  };

  useEffect(() => {
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleNavScroll = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500 font-sans">
      {/* 1. TOP ASTRONOMICAL TELEMETRY STRIP */}
      <div className="bg-[#050507]/90 border-b border-white/[0.06] backdrop-blur-md px-4 sm:px-8 py-1.5 text-[10px] font-mono tracking-wider text-gray-400 flex items-center justify-between">
        {/* Left: Swiss Coordinates & Agency Return */}
        <div className="flex items-center gap-4">
          <Link
            to="/portfolio"
            className="flex items-center gap-1.5 text-[#C89B53] hover:text-[#E8D5B5] transition-colors uppercase font-bold"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>AJDesigners Portfolio</span>
          </Link>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-gray-400">
            46°35'N 6°12'E • LE BRASSUS, SUISSE
          </span>
        </div>

        {/* Center: Live Moon Phase & Sidereal Telemetry */}
        <div className="hidden lg:flex items-center gap-2 text-gray-300">
          <Compass className="w-3 h-3 text-[#C89B53] animate-spin" style={{ animationDuration: '40s' }} />
          <span>ASTRONOMICAL SIDEREAL TIME</span>
          <span className="text-white/20">•</span>
          <span className="text-[#E8D5B5]">WAXING GIBBOUS (88% ILLUMINATION)</span>
        </div>

        {/* Right: Geneva Live Time & Escapement Audio Switch */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#18E0B5] animate-ping" />
            <span>GENEVA: {genevaTime || '14:30:00'} CET</span>
          </span>

          {/* Web Audio Escapement Tick */}
          <button
            onClick={toggleAudio}
            title={audioActive ? 'Mute Mechanical Escapement' : 'Unmute 3Hz Escapement Tick'}
            className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] font-mono transition-all ${
              audioActive
                ? 'bg-[#C89B53]/20 border-[#C89B53] text-[#E8D5B5]'
                : 'border-white/10 hover:border-white/30 text-gray-400 hover:text-white'
            }`}
          >
            {audioActive ? <Volume2 className="w-3 h-3 text-[#C89B53]" /> : <VolumeX className="w-3 h-3" />}
            <span className="hidden sm:inline">{audioActive ? '3HZ TICK ON' : 'SOUND'}</span>
          </button>
        </div>
      </div>

      {/* 2. PRIMARY LUXURY MAISON NAVIGATION */}
      <nav
        className={`px-4 sm:px-8 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050507]/90 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#050507]/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#hero"
            onClick={(e) => handleNavScroll(e, 'hero')}
            className="flex flex-col group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full border border-[#C89B53] flex items-center justify-center">
                <span className="w-0.5 h-0.5 rounded-full bg-[#E8D5B5]" />
              </span>
              <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.2em] text-[#E8D5B5] group-hover:text-white transition-colors">
                AURELIA NOCTURNE
              </span>
            </div>
            <span className="text-[8px] font-mono tracking-[0.35em] text-[#C89B53] uppercase ml-4 -mt-0.5">
              GENÈVE • MANUFACTURE
            </span>
          </a>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em]">
            <a
              href="#collection"
              onClick={(e) => handleNavScroll(e, 'collection')}
              className="text-gray-300 hover:text-[#E8D5B5] transition-colors hover:tracking-[0.25em]"
            >
              Collection
            </a>
            <a
              href="#exhibition"
              onClick={(e) => handleNavScroll(e, 'exhibition')}
              className="text-gray-300 hover:text-[#E8D5B5] transition-colors hover:tracking-[0.25em]"
            >
              The Alchemy
            </a>
            <a
              href="#caliber"
              onClick={(e) => handleNavScroll(e, 'caliber')}
              className="text-gray-300 hover:text-[#E8D5B5] transition-colors hover:tracking-[0.25em]"
            >
              Caliber AN-01
            </a>
            <a
              href="#atelier"
              onClick={(e) => handleNavScroll(e, 'atelier')}
              className="text-gray-300 hover:text-[#E8D5B5] transition-colors hover:tracking-[0.25em]"
            >
              Swiss Atelier
            </a>
          </div>

          {/* Right Action: Request Allocation */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenAllocation}
              className="relative px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest text-[#050507] font-bold bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C89B53] hover:shadow-[0_0_25px_rgba(200,155,83,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all border border-white/30"
            >
              Request Allocation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white border border-white/10"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* 3. MOBILE LUXURY DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[82px] bg-[#050507]/98 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-8 space-y-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-4 font-mono text-xs uppercase tracking-widest">
            <a
              href="#collection"
              onClick={(e) => handleNavScroll(e, 'collection')}
              className="block py-2 text-gray-300 hover:text-[#E8D5B5] border-b border-white/[0.05]"
            >
              Curated Collection (3 References)
            </a>
            <a
              href="#exhibition"
              onClick={(e) => handleNavScroll(e, 'exhibition')}
              className="block py-2 text-gray-300 hover:text-[#E8D5B5] border-b border-white/[0.05]"
            >
              The Alchemy (Crucible & Complications)
            </a>
            <a
              href="#caliber"
              onClick={(e) => handleNavScroll(e, 'caliber')}
              className="block py-2 text-gray-300 hover:text-[#E8D5B5] border-b border-white/[0.05]"
            >
              Caliber AN-01 Movement Dismantler
            </a>
            <a
              href="#atelier"
              onClick={(e) => handleNavScroll(e, 'atelier')}
              className="block py-2 text-gray-300 hover:text-[#E8D5B5] border-b border-white/[0.05]"
            >
              Swiss Atelier & Cryptographic Provenance
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAllocation();
              }}
              className="w-full py-3.5 rounded-full text-xs font-mono uppercase tracking-widest text-black font-extrabold bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C89B53] shadow-[0_0_20px_rgba(200,155,83,0.35)]"
            >
              Request Private Allocation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
