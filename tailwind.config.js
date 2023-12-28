/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        innovation: {
          '100': '#182e4d',
          '200': '#094089',
          '300': '#289dbc',
          },
          peach: {
            '100': '#e1b7ee',
            '200': '#eeb7e6',
            '300': '#eeb7d0',
            },
            lake: {
              '100': '#255dce',
              '200': '#1c9fe7',
              },
              sky: {
                '100': '#1e8cd6',
                '200': '#39bbdb',
                },
      },
     
        
    },
  },
  
  plugins: [],
  darkMode: 'class',
}

