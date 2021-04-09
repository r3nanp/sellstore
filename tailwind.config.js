module.exports = {
  future: {
    purgeLayersByDefault: true
  },
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Poppins', 'ui-sans-serif'],
        mono: ['Roboto Mono', 'monospace']
      },
      colors: {
        primary: 'var(--primary)',
        'primary-2': 'var(--primary-2)',
        secondary: 'var(--secondary)',
        'secondary-2': 'var(--secondary-2)',
        'accents-0': 'var(--accents-0)',
        'accents-1': 'var(--accents-1)',
        'accents-2': 'var(--accents-2)',
        'accents-3': 'var(--accents-3)',
        overlay: 'var(--overlay)'
      }
    },
    textColor: {
      base: 'var(--text-base)',
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)'
    },
    boxShadow: {
      'outline-normal': '0 0 0 2px var(--accents-2)',
      magical:
        'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
