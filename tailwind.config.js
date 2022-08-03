module.exports = {
  darkMode: 'class',
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mic': '281px',
      'xsm': '540px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '2rem'
    },
    backgroundSize: {
      'half': '75%',
    },
    extend: {
      backgroundColor: {
          'dpurple-700': '#06020a',
          'dpurple-500': '#381c52'
      },
      height: {
          'almost': '93vh',
          'almost0': '90vh'
      },
      width: {
          '106': '26rem',
      }
    }
  },
  plugins: [],
}