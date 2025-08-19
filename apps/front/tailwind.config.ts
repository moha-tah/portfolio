import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        custom: '0 10px 20px 1px rgba(0, 0, 0, 0.4)'
      }
    }
  }
}

export default config
