/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens:{
      sm:'480px',
      md: '768px',
      lg: '976px',
      xl:'1440px'
    },
    extend: {
      colors:{
        mainColor:'rgb(58, 49, 175)',
        secendoryColor:'rgb(93, 127, 254)',
      },
      fontFamily:{
        inter:['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'landing-bg': "url('/src/assets/bgImage1.png')",
      }
    },
  },
  plugins: [],
}

