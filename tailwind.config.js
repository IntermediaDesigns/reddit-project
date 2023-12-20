/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
