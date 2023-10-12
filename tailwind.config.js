/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,jsx,tsx}'
  ],
  plugins: [
    require('@tailwindcss/forms')
  ],
  future: {
    hoverOnlyWhenSupported: true
  }
}

