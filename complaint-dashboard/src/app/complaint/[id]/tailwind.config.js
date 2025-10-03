theme: {
  extend: {
    colors: {
      'background-light': '#f9fafb',
      'background-dark': '#1f2937',
      'primary': '#2563eb',
    },
    fontFamily: {
      display: ['Inter', 'sans-serif'],
    },
  },
},
plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-light': '#f9fafb',
        'background-dark': '#1f2937',
        'primary': '#2563eb',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
