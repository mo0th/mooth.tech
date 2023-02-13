/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')

const drac = {
  'base-light': '#44475a',
  base: '#282a36',
  'base-dark': '#21222c',
  content: '#f8f8f2',
  highlight: '#6272a4',
  cyan: '#8be9fd',
  green: '#50fa7b',
  orange: '#ffb86c',
  pink: '#ff79c6',
  purple: '#bd93f9',
  red: '#ff5555',
  yellow: '#f1fa8c',
}

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        drac,
        current: 'currentColor',
        'var-col': 'var(--col)',
        'var-bg': 'var(--bg)',
      },
      fontFamily: {
        display: ["'Poppins'", ...fontFamily.sans],
        mono: ["'JetBrains Mono'", ...fontFamily.mono],
      },
      screens: {},
      rotate: {
        20: '20deg',
      },
      spacing: {
        em: '1em',
      },
      typography: ({ theme }) => {
        const { content, pink, purple, highlight } = drac
        return {
          DEFAULT: {
            css: {
              color: content,
              a: {
                color: pink,
                '&:hover': {
                  color: purple,
                },
                '&:focus': {
                  color: purple,
                },
                '& code': {
                  color: pink,
                  '&:hover': {
                    color: purple,
                  },
                },
              },
              'h1,h2,h3,h4,h5,h6,blockquote,strong,b,i,em': {
                color: 'inherit',
              },
              blockquote: {
                borderLeftColor: purple,
              },
              hr: {
                borderTopColor: highlight,
                opacity: 0.5,
              },
              thead: {
                color: content,
                borderBottomColor: content,
              },
              'tbody tr': {
                borderBottomColor: content,
              },
              'figure figcaption': {
                color: content,
                opacity: 0.8,
              },
              img: {
                width: '100%',
                display: 'block',
                borderRadius: '1rem',
                objectFit: 'cover',
              },
              'li::marker': {
                color: 'inherit',
              },
            },
          },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-hocus'),
    require('tailwindcss-nmp'),
  ],
}