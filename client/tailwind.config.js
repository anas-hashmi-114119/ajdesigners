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
          borderHover: 'rgba(59, 130, 246, 0.4)',
        },
        navy: {
          950: '#070709',
          900: '#0B0D13',
          800: '#111116',
          700: '#181820',
          600: '#232634',
        },
        electric: {
          500: '#3B82F6', // Vibrant electric blue
          600: '#2563EB',
          400: '#60A5FA',
          300: '#93C5FD',
          100: '#EFF6FF',
        },
        purple: {
          brand: '#8B5CF6', // Vibrant purple
          glow: '#A855F7',
          soft: '#C4B5FD',
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
      },
      boxShadow: {
        'glow-blue': '0 0 35px -5px rgba(59, 130, 246, 0.35)',
        'glow-purple': '0 0 35px -5px rgba(139, 92, 246, 0.35)',
        'glow-subtle': '0 0 40px -10px rgba(59, 130, 246, 0.2)',
        'dark-card': '0 12px 36px -8px rgba(0, 0, 0, 0.65)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top, rgba(59,130,246,0.18), transparent 70%), radial-gradient(ellipse at bottom right, rgba(139,92,246,0.14), transparent 70%)',
        'dark-mesh': 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 40%)',
        'gradient-electric': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      }
    },
  },
  plugins: [],
}
