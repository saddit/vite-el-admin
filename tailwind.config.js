const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      width: {
        'fit': 'fit-content'
      },
      colors: {
        'gray-menu': "#545c64",
        'ylw-active': "#ffd04b"
      },
      height: {
        'fit': 'fit-content'
      },
      minHeight: {
        '9/10': '90%',
        '4/5': '80%',
        '7/10': '70%',
        '1/2': '50%',
        '1/3': '33.333%',
        '44': '11rem',
        '32': '8rem',
        '28': '7rem'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
