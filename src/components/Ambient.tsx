import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Particle = {
  x: number
  y: number
  size: number
  speed: number
  drift: number
  opacity: number
  kind: 'heart' | 'spark'
}

function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(size / 16, size / 16)
  ctx.beginPath()
  ctx.moveTo(0, 4)
  ctx.bezierCurveTo(-10, -6, -16, 6, 0, 16)
  ctx.bezierCurveTo(16, 6, 10, -6, 0, 4)
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
}

export function Ambient() {
  const reduced = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let running = true
    const particles: Particle[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = (count: number) => {
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 6 + Math.random() * 10,
          speed: 0.15 + Math.random() * 0.35,
          drift: (Math.random() - 0.5) * 0.4,
          opacity: 0.12 + Math.random() * 0.22,
          kind: Math.random() > 0.35 ? 'heart' : 'spark',
        })
      }
    }

    const tick = () => {
      if (!running) return
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      const dark = document.documentElement.classList.contains('dark')
      for (const particle of particles) {
        particle.y -= particle.speed
        particle.x += Math.sin(frame / 80 + particle.y / 40) * particle.drift
        if (particle.y < -20) {
          particle.y = window.innerHeight + 20
          particle.x = Math.random() * window.innerWidth
        }
        if (particle.kind === 'heart') {
          drawHeart(
            ctx,
            particle.x,
            particle.y,
            particle.size,
            dark
              ? `rgba(232, 176, 176, ${particle.opacity})`
              : `rgba(201, 123, 123, ${particle.opacity})`,
          )
        } else {
          ctx.beginPath()
          ctx.fillStyle = dark
            ? `rgba(201, 176, 122, ${particle.opacity})`
            : `rgba(196, 165, 116, ${particle.opacity})`
          ctx.arc(particle.x, particle.y, particle.size / 6, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      frame += 1
      requestAnimationFrame(tick)
    }

    resize()
    spawn(22)
    window.addEventListener('resize', resize)
    const id = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(id)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
