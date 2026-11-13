import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Calendar, Sparkles } from 'lucide-react';

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
    { name: 'Services', path: '/services' },
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
          <Link to="/" data-cursor-text="HOME" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-500 to-purple-brand flex items-center justify-center shadow-glow-blue group-hover:scale-105 transition-transform duration-300 border border-white/20">
              <span className="font-display font-extrabold text-white text-lg tracking-wider">AJ</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-electric-400 transition-colors">
                AJDesigners<span className="text-purple-brand">.</span>
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
                      ? 'bg-gradient-to-r from-electric-500 to-purple-brand text-white shadow-glow-blue'
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric-500 via-blue-600 to-purple-brand hover:shadow-glow-blue hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-white/10"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule a Call</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
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
                      ? 'bg-gradient-to-r from-electric-500 to-purple-brand text-white'
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
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand shadow-glow-blue"
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
