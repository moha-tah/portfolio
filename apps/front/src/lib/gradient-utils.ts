export type GradientColor =
  | 'purple'
  | 'blue'
  | 'green'
  | 'orange'
  | 'pink'
  | 'red'
  | 'yellow'
  | 'cyan'

const GRADIENT_COLORS = {
  purple: { r: 168, g: 85, b: 247 },
  blue: { r: 54, g: 67, b: 189 },
  green: { r: 3, g: 203, b: 158 },
  orange: { r: 255, g: 122, b: 0 },
  pink: { r: 236, g: 72, b: 153 },
  red: { r: 239, g: 68, b: 68 },
  yellow: { r: 234, g: 179, b: 8 },
  cyan: { r: 6, g: 182, b: 212 }
} as const

// Centralized control points for easy color adjustment
const LIGHT_END = { r: 255, g: 255, b: 255 } // White
const DARK_END = { r: 0, g: 0, b: 0 } // Black
const TRANSITION_OPACITY = 0.15 // Transition opacity

export function getGradientStyle(color: GradientColor): React.CSSProperties {
  const { r, g, b } = GRADIENT_COLORS[color]

  return {
    // Light mode gradient - base
    '--gradient-light': `radial-gradient(circle at 0% 0%, 
      rgba(${r}, ${g}, ${b}, 0.5) 0%, 
      rgba(${r}, ${g}, ${b}, ${TRANSITION_OPACITY}) 35%, 
      rgba(${LIGHT_END.r}, ${LIGHT_END.g}, ${LIGHT_END.b}, 1) 100%
    )`,
    // Dark mode gradient - base
    '--gradient-dark': `radial-gradient(circle at 0% 0%, 
      rgba(${r}, ${g}, ${b}, 0.5) 0%, 
      rgba(${r}, ${g}, ${b}, ${TRANSITION_OPACITY}) 35%, 
      rgba(${DARK_END.r}, ${DARK_END.g}, ${DARK_END.b}, 1) 100%
    )`,
    // Light mode gradient - hover (expanded)
    '--gradient-light-hover': `radial-gradient(circle at 0% 0%, 
      rgba(${r}, ${g}, ${b}, 0.6) 0%, 
      rgba(${r}, ${g}, ${b}, ${TRANSITION_OPACITY * 1.2}) 50%, 
      rgba(${LIGHT_END.r}, ${LIGHT_END.g}, ${LIGHT_END.b}, 1) 100%
    )`,
    // Dark mode gradient - hover (expanded)
    '--gradient-dark-hover': `radial-gradient(circle at 0% 0%, 
      rgba(${r}, ${g}, ${b}, 0.6) 0%, 
      rgba(${r}, ${g}, ${b}, ${TRANSITION_OPACITY * 1.2}) 50%, 
      rgba(${DARK_END.r}, ${DARK_END.g}, ${DARK_END.b}, 1) 100%
    )`
  } as React.CSSProperties
}
