'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

import { useMousePosition } from '@/hooks/use-mouse-position'

// Utility: Clamp value between min and max
const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

// Utility: Debounce function
const debounce = (fn: () => void, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(fn, delay)
  }
}

// Mouse hover circle effect
interface HoverCircle {
  x: number
  y: number
  radius: number
  growing: boolean
  scale: () => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

const createHoverCircle = (
  x: number,
  y: number,
  isDark: boolean
): HoverCircle => {
  let radius = 40
  let growing = false

  return {
    x,
    y,
    radius,
    growing,
    scale() {
      if (radius >= 75) {
        growing = true
      }
      radius = Math.max(0, growing ? radius - 1 : radius + 1)
    },
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = isDark ? '#030f2b' : '#f7f5ef'
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
}

// Diamond pattern generator
interface DiamondPattern {
  canvas: OffscreenCanvas
  width: number
  height: number
  update: () => void
}

const createDiamondPattern = (
  patternWidth: number,
  patternHeight: number,
  isDark: boolean
): DiamondPattern => {
  // OffscreenCanvas polyfill
  if (typeof window !== 'undefined' && !window.OffscreenCanvas) {
    // @ts-expect-error Polyfill for OffscreenCanvas
    window.OffscreenCanvas = class {
      canvas: HTMLCanvasElement
      constructor(width: number, height: number) {
        this.canvas = document.createElement('canvas')
        this.canvas.width = width
        this.canvas.height = height
        // @ts-expect-error Polyfill for OffscreenCanvas
        return this.canvas as unknown as OffscreenCanvas
      }
    }
  }

  const offscreenCanvas = new OffscreenCanvas(
    2 * patternWidth,
    2 * patternHeight
  )
  const ctx = offscreenCanvas.getContext('2d')

  if (!ctx) {
    throw new Error('Could not get 2D context')
  }

  // Styling
  ctx.strokeStyle = isDark ? '#3a3a3a' : '#ece5d9'
  ctx.lineWidth = 3

  // Pattern dimensions
  const centerX = patternWidth / 2
  const centerY = patternHeight / 2
  const rayWidth = centerX / 2
  const rayHeight = centerY / 2

  // Animation state
  let innerWidth = rayWidth / 2
  let innerHeight = rayHeight / 2
  let outerOffsetX = 0
  let outerOffsetY = 0
  let scrollVelocity = 0
  let phase = 0.25
  let previousScroll = 0
  let previousTime = 0

  // Draw inner diamond
  const drawInnerDiamond = (cx: number, cy: number) => {
    ctx.beginPath()
    ctx.moveTo(cx, cy - innerHeight)
    ctx.lineTo(cx + innerWidth, cy)
    ctx.lineTo(cx, cy + innerHeight)
    ctx.lineTo(cx - innerWidth, cy)
    ctx.lineTo(cx, cy - innerHeight)
    ctx.stroke()
  }

  // Draw outer rays (4 separate lines extending from center)
  const drawOuterRays = (cx: number, cy: number) => {
    // Top-right ray
    ctx.beginPath()
    ctx.moveTo(cx + outerOffsetX, cy - rayHeight)
    ctx.lineTo(cx + outerOffsetX + rayWidth, cy)
    ctx.stroke()

    // Bottom-right ray
    ctx.beginPath()
    ctx.moveTo(cx + rayWidth, cy + outerOffsetY)
    ctx.lineTo(cx, cy + outerOffsetY + rayHeight)
    ctx.stroke()

    // Bottom-left ray
    ctx.beginPath()
    ctx.moveTo(cx - outerOffsetX, cy + rayHeight)
    ctx.lineTo(cx - outerOffsetX - rayWidth, cy)
    ctx.stroke()

    // Top-left ray
    ctx.beginPath()
    ctx.moveTo(cx - rayWidth, cy - outerOffsetY)
    ctx.lineTo(cx, cy - rayHeight - outerOffsetY)
    ctx.stroke()
  }

  // Render pattern based on phase
  const renderPattern = (patternState: 'pattern1' | 'pattern2') => {
    const normalizedPhase = Math.min(1, Math.max(0, phase))
    let interpolation: number

    if (patternState === 'pattern1') {
      interpolation =
        (1 + Math.sin(2 * normalizedPhase * Math.PI - Math.PI)) / 2
    } else {
      interpolation =
        (1 - Math.sin(2 * normalizedPhase * Math.PI - Math.PI)) / 2
      ctx.save()
      ctx.translate(centerX / 2, 0)
    }

    // Calculate interpolated values
    innerWidth = rayWidth * (1 - interpolation)
    innerHeight = rayHeight * (1 - interpolation)
    outerOffsetX = rayWidth * interpolation
    outerOffsetY = rayHeight * interpolation

    // Draw at center
    const cx = offscreenCanvas.width / 2
    const cy = offscreenCanvas.height / 2
    drawInnerDiamond(cx, cy)
    drawOuterRays(cx, cy)

    if (patternState === 'pattern2') {
      ctx.restore()
    }
  }

  return {
    canvas: offscreenCanvas,
    width: centerX,
    height: centerY,
    update() {
      const currentTime = performance.now()
      const currentScroll = window.scrollY
      const scrollDelta = currentScroll - previousScroll
      const deltaTime = currentTime - previousTime

      if (deltaTime > 1000 / 60) {
        previousTime = currentTime
      }

      // Calculate velocity
      if (deltaTime > 0) {
        scrollVelocity = clamp(scrollDelta / deltaTime, -3, 3)
      }

      // Update phase based on velocity
      phase += 0.006 * scrollVelocity

      // Wrap phase
      if (phase > 1) {
        phase = 0
      } else if (phase < 0) {
        phase = 1
      }

      // Snap to keyframes when idle
      if (scrollDelta === 0) {
        const targetPhase = phase < 0.5 ? 0.25 : 0.75
        phase += (targetPhase - phase) * 0.03
      }

      // Clear and redraw
      ctx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height)

      // Choose pattern based on phase
      if (phase > 0.75 || phase < 0.25) {
        renderPattern('pattern2')
      } else {
        renderPattern('pattern1')
      }

      previousScroll = currentScroll
      previousTime = currentTime
    }
  }
}

export function Background() {
  const { theme, systemTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useMousePosition()
  const hoverCirclesRef = useRef<HoverCircle[]>([])
  const animationFrameRef = useRef<number>(0)
  const lastMouseUpdateRef = useRef<number>(0)

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDarkMode = currentTheme === 'dark'

  // Mouse hover effect
  useEffect(() => {
    if (!mousePosition || !canvasRef.current || window.innerWidth < 760) return

    const now = performance.now()
    if (now - lastMouseUpdateRef.current < 25) return

    const rect = canvasRef.current.getBoundingClientRect()
    const canvasX =
      ((mousePosition.x - rect.left) / (rect.right - rect.left)) *
      canvasRef.current.width
    const canvasY =
      ((mousePosition.y - rect.top) / (rect.bottom - rect.top)) *
      canvasRef.current.height

    const circle = createHoverCircle(canvasX, canvasY, isDarkMode)
    hoverCirclesRef.current.push(circle)

    lastMouseUpdateRef.current = now
  }, [mousePosition, isDarkMode])

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) return

    // Pattern size
    const patternWidth = 240
    const patternHeight = 400

    // Create pattern
    const pattern = createDiamondPattern(
      patternWidth,
      patternHeight,
      isDarkMode
    )

    // Calculate tiles needed
    const tilesX = Math.ceil(window.innerWidth / (patternWidth / 5)) + 1
    const tilesY = Math.ceil(window.innerHeight / (patternHeight / 5)) + 1

    // Render function
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw tiled pattern
      for (let x = 0; x < tilesX; x++) {
        for (let y = 0; y < tilesY; y++) {
          ctx.drawImage(
            pattern.canvas as unknown as CanvasImageSource,
            x * pattern.width - 3 * pattern.width,
            y * pattern.height - 3 * pattern.height
          )
        }
      }

      // Draw hover circles
      hoverCirclesRef.current.forEach((circle, index) => {
        circle.draw(ctx)
        circle.scale()

        if (circle.radius <= 0.1 && circle.growing) {
          hoverCirclesRef.current.splice(index, 1)
        }
      })
    }

    // Resize handler
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = 2 * window.innerWidth
        canvas.height = 2 * window.innerHeight
      }
    }

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      pattern.update()
      render()
    }

    const debouncedResize = debounce(resizeCanvas, 100)

    resizeCanvas()
    window.addEventListener('resize', debouncedResize)
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', debouncedResize)
    }
  }, [isDarkMode])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="bg-background h-full w-full"
        style={{
          imageRendering: 'crisp-edges'
        }}
      />
    </div>
  )
}
