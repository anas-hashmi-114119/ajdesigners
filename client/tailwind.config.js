/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#070709',
        dark: {
          base: '#070709',
          card: '#111116',
          elevated: '#181820',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(198, 147, 65, 0.45)',
        },
        navy: {
          950: '#070709',
          900: '#0B0D13',
          800: '#111116',
          700: '#181820',
          600: '#232634',
        },
        // Complete Luxury Gold & Warm Bronze Hierarchy
        gold: {
          50: '#FDFBF7',
          100: '#F9F3E5',
          200: '#F2E4C4',
          300: '#EAD08C',  // Pale Champagne Gold
          400: '#DDA74F',  // Luminous Amber Gold
          500: '#C69341',  // ★ Core Signature Artisan Gold
          600: '#A9782E',  // Deep Burnished Gold
          700: '#8A5D20',  // Antique Bronze
          800: '#644114',  // Dark Amber Cognac
          900: '#3D2508',  // Deep Espresso Bronze
          950: '#1D1204',
        },
        champagne: '#F5D791',
        bronze: '#9E6F24',
        // Semantic mappings so existing electric & purple classes gracefully harmonize with the gold theme
        electric: {
          500: '#C69341',
          600: '#A9782E',
          400: '#DDA74F',
          300: '#EAD08C',
          100: '#FDFBF7',
        },
        purple: {
          brand: '#9E6F24',
          glow: '#C69341',
          soft: '#EAD08C',
        },
        charcoal: {
          900: '#0F172A',
          700: '#334155',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Manrope', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-gold': '0 0 35px -5px rgba(198, 147, 65, 0.35)',
        'glow-gold-lg': '0 0 55px -8px rgba(198, 147, 65, 0.50)',
        'glow-blue': '0 0 35px -5px rgba(198, 147, 65, 0.35)', // mapped to gold
        'glow-purple': '0 0 35px -5px rgba(158, 111, 36, 0.35)', // mapped to bronze
        'glow-subtle': '0 0 40px -10px rgba(198, 147, 65, 0.18)',
        'dark-card': '0 12px 36px -8px rgba(0, 0, 0, 0.75)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top, rgba(198,147,65,0.18), transparent 70%), radial-gradient(ellipse at bottom right, rgba(158,111,36,0.14), transparent 70%)',
        'gold-mesh': 'radial-gradient(circle at 20% 20%, rgba(198, 147, 65, 0.14) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(221, 167, 79, 0.10) 0%, transparent 40%)',
        'dark-mesh': 'radial-gradient(circle at 20% 20%, rgba(198, 147, 65, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(158, 111, 36, 0.10) 0%, transparent 40%)',
        'gradient-gold': 'linear-gradient(135deg, #F5D791 0%, #C69341 50%, #9E6F24 100%)',
        'gradient-gold-subtle': 'linear-gradient(135deg, rgba(198, 147, 65, 0.15) 0%, rgba(158, 111, 36, 0.05) 100%)',
        'gradient-electric': 'linear-gradient(135deg, #F5D791 0%, #C69341 50%, #9E6F24 100%)',
      }
    },
  },
  plugins: [],
}
