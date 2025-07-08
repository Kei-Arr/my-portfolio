/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#F6F0F0",
          100: "#EAE4D5",
          200: "#FFD7C4",
          300: "#E6D4C5",
          400: "#D4C4B5",
        },
        burgundy: {
          400: "#B85555",
          500: "#A94A4A",
          600: "#8B3A3A",
          700: "#7A2E2E",
          800: "#6A2626",
        },
        dark: {
          700: "#2A2D35",
          800: "#21242A",
          900: "#181B20",
        },
        // shadcn ui colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
      },
      fontFamily: {
        "kurye-italic": ["Kurye Light Italic", "Georgia", "serif"],
        kurye: ["Kurye Light", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        selino: ["Selino Regular", "Georgia", "serif"],
        "selino-italic": ["Selino Italic", "Georgia", "serif"],
        paris: ["Paris", "Georgia", "serif"],
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        hero: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "fade-in-delayed": "fadeIn 0.8s ease-out 0.3s both",
        "slide-up": "slideUp 0.8s ease-out",
        "slide-up-delayed": "slideUp 0.8s ease-out 0.2s both",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        glow: {
          "0%": {
            boxShadow: "0 0 20px rgba(169, 74, 74, 0.4)",
          },
          "100%": {
            boxShadow: "0 0 30px rgba(169, 74, 74, 0.6)",
          },
        },
        shimmer: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      boxShadow: {
        burgundy: "0 8px 32px rgba(169, 74, 74, 0.4)",
        "burgundy-lg": "0 12px 40px rgba(169, 74, 74, 0.5)",
        dark: "0 8px 32px rgba(33, 36, 42, 0.4)",
        glow: "0 0 20px rgba(169, 74, 74, 0.3)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #FFD7C4 0%, #EAE4D5 100%)",
        "primary-gradient": "linear-gradient(135deg, #A94A4A 0%, #8B3A3A 100%)",
        "glass-shimmer":
          "linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, transparent 100%)",
        "glass-shimmer-subtle":
          "linear-gradient(to right, rgba(255, 255, 255, 0.05) 0%, transparent 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
