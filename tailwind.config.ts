import type { Config } from "tailwindcss";

// [ADDED] Custom brand color system, typography and animation tokens for Indrayani Sweet Corner
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        saffron: {
          50: "#FFF5ED",
          100: "#FFE6D5",
          200: "#FFCBAA",
          300: "#FFA875",
          400: "#F77F38",
          500: "#D95D1E",
          600: "#BA4914",
          700: "#96380F",
          800: "#762D11",
          900: "#4D1D0B",
        },
        gold: {
          50: "#FDFBF2",
          100: "#F9F3D9",
          200: "#F3E5AB",
          300: "#E8D075",
          400: "#D4AF37",
          500: "#B89224",
          600: "#997519",
          700: "#7A5A14",
          800: "#5C4212",
          900: "#3D2B0C",
        },
        maroon: {
          50: "#FDF2F4",
          100: "#F9DFE3",
          200: "#F4C2C9",
          300: "#E896A2",
          400: "#D15C6E",
          500: "#B03348",
          600: "#8C2434",
          700: "#681622",
          800: "#4B0F17",
          900: "#30080E",
        },
        pista: {
          50: "#F4F8F3",
          100: "#E5F0E2",
          200: "#CDE3C7",
          300: "#A9CF9F",
          400: "#7BB36E",
          500: "#4E8752",
          600: "#3D6F41",
          700: "#2D5A27",
          800: "#22431E",
          900: "#172E15",
        },
        ivory: {
          50: "#FFFFFF",
          100: "#FCFBF7",
          200: "#F8F5EC",
          300: "#F1EBDC",
          400: "#E6DDCA",
          500: "#D5C8B0",
          600: "#B5A489",
          700: "#8E7E65",
          800: "#635643",
          900: "#3D3427",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"],
        devanagari: ["var(--font-devanagari)", "serif"],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(104, 22, 34, 0.08), 0 0 1px 1px rgba(212, 175, 55, 0.15)',
        'luxury-hover': '0 30px 60px -15px rgba(217, 93, 30, 0.18), 0 0 1px 1px rgba(212, 175, 55, 0.35)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
