/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': {'min': '400px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
    },
    
    fontFamily: {
      bungee: ['Bungee Spice', 'sans-serif'],
      mina: ['Mina', 'sans-serif'],
    },
    extend: {
      gradients: theme => ({
        'gradient-border': ['90deg', '#ff6347 0%', '#f3c971 100%'],
      }),
      
      colors: {
        tomato: '#ff6347',
        redditblue: '#58c6fc',
        orangy: '#f3c971',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'radial-gradient':
          'radial-gradient(circle at center, #58c6fc, #dbebf3)',
      },
    },
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
};
