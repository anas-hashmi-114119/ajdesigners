import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Calendar } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const handleScheduleClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const calendarEl = document.getElementById('booking-calendar');
      if (calendarEl) {
        calendarEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#booking-calendar');
      setTimeout(() => {
        const calendarEl = document.getElementById('booking-calendar');
        if (calendarEl) {
          calendarEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070709]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" data-cursor-text="HOME" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="AJDesigners Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(198,147,65,0.35)] group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-gold-400 transition-colors">
                AJDesigners<span className="text-gold-500">.</span>
              </span>
              <span className="text-[9px] tracking-widest uppercase text-gray-400 font-semibold -mt-1">
                Creative Minds. Digital Growth.
              </span>
            </div>
          </Link>

          {/* Center Links (Exact spec: Home, Services, Industries, Portfolio, Pricing) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#111116]/80 border border-white/[0.08] px-3.5 py-1.5 rounded-full backdrop-blur-xl shadow-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                data-cursor-text={link.name.toUpperCase()}
                className={({ isActive }) =>
                  `px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-500 to-gold-700 text-black font-bold shadow-glow-gold'
                      : 'text-gray-300 hover:text-white hover:bg-white/[0.06]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right CTA Button: Schedule a Call */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#booking-calendar"
              onClick={handleScheduleClick}
              data-cursor-text="BOOK CALL"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-black bg-gradient-to-r from-[#C69341] via-[#DDA74F] to-[#8A5D20] hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-white/20 shadow-md"
            >
              <Calendar className="w-3.5 h-3.5 text-black" />
              <span>Schedule a Call</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-90 text-black" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#111116] border border-white/[0.08] text-gray-300 hover:text-white hover:border-electric-500/50 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bg-[#070709]/95 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-500 to-gold-700 text-black font-bold'
                      : 'text-gray-300 hover:bg-white/[0.05] hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/[0.05] hover:text-white"
            >
              About Founders
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/[0.05] hover:text-white"
            >
              Contact
            </Link>
          </nav>

          <div className="pt-3 border-t border-white/[0.08]">
            <a
              href="#booking-calendar"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleScheduleClick(e);
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-[#C69341] via-[#DDA74F] to-[#8A5D20] shadow-glow-gold"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a Strategy Call</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
