/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#101828', // Primary dark navy
          800: '#17243A', // Secondary navy
          700: '#1E2D4A',
          600: '#2A3F66',
        },
        electric: {
          500: '#2563EB', // Electric blue
          600: '#1D4ED8',
          400: '#3B82F6',
          100: '#EFF6FF',
        },
        purple: {
          brand: '#7C3AED', // Vibrant purple
          glow: '#9333EA',
          soft: '#F3E8FF',
        },
        surface: {
          light: '#F5F7FB', // Light background
          card: '#FFFFFF',
          darkCard: '#131D31',
        },
        charcoal: {
          900: '#1D2939', // Primary text
          700: '#344054',
          500: '#667085',
          400: '#98A2B3',
          300: '#D0D5DD',
          200: '#EAECF0',
          100: '#F2F4F7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 35px -5px rgba(37, 99, 235, 0.3)',
        'glow-purple': '0 0 35px -5px rgba(124, 58, 237, 0.3)',
        'card-subtle': '0 10px 30px -10px rgba(16, 24, 40, 0.08)',
        'card-elevated': '0 20px 40px -15px rgba(16, 24, 40, 0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top, rgba(37,99,235,0.15), transparent 70%), radial-gradient(ellipse at bottom right, rgba(124,58,237,0.12), transparent 70%)',
        'dark-mesh': 'radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.12) 0%, transparent 40%)',
      }
    },
  },
  plugins: [],
}

