import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { copy, names } from '../config'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { Remaining } from '../lib/time'

type CountdownProps = {
  remaining: Remaining
  isBirthday: boolean
}

function Digit({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, '0')
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center sm:min-w-[5.5rem]">
      <div className="relative h-16 w-full overflow-hidden rounded-2xl bg-white/70 shadow-[0_10px_40px_rgba(154,77,87,0.08)] ring-1 ring-rose/15 dark:bg-burgundy/60 dark:ring-gold/20">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={padded}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 flex items-center justify-center font-serif text-3xl text-ink sm:text-4xl dark:text-[#f8eee8]"
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-[10px] tracking-[0.28em] text-ink-soft uppercase dark:text-[#cbb8b0]">
        {label}
      </span>
    </div>
  )
}

function burstConfetti(root: HTMLElement, reduced: boolean) {
  if (reduced) return
  const canvas = document.createElement('canvas')
  canvas.className = 'pointer-events-none fixed inset-0 z-50 h-full w-full'
  root.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  ctx.scale(dpr, dpr)

  const bits = Array.from({ length: 70 }, () => ({
    x: window.innerWidth / 2,
    y: window.innerHeight * 0.42,
    vx: (Math.random() - 0.5) * 12,
    vy: Math.random() * -11 - 3,
    size: 8 + Math.random() * 10,
    life: 1,
    color: ['#c97b7b', '#c4a574', '#e8b4b0', '#9a4d57'][Math.floor(Math.random() * 4)]!,
  }))

  const heart = (x: number, y: number, size: number, color: string, alpha: number) => {
    ctx.save()
    ctx.globalAlpha = alpha
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

  let frame = 0
  const tick = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    bits.forEach((bit) => {
      bit.x += bit.vx
      bit.y += bit.vy
      bit.vy += 0.2
      bit.life -= 0.01
      heart(bit.x, bit.y, bit.size, bit.color, Math.max(bit.life, 0))
    })
    frame += 1
    if (frame < 140) requestAnimationFrame(tick)
    else canvas.remove()
  }
  requestAnimationFrame(tick)
}

export function Countdown({ remaining, isBirthday }: CountdownProps) {
  const reduced = usePrefersReducedMotion()
  const bursted = useRef(false)

  useEffect(() => {
    if (!isBirthday || bursted.current) return
    bursted.current = true
    burstConfetti(document.body, reduced)
  }, [isBirthday, reduced])

  return (
    <section id="countdown" className="relative mx-auto max-w-3xl px-6 py-20 text-center">
      <AnimatePresence mode="wait">
        {isBirthday ? (
          <motion.div
            key="birthday"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glow"
          >
            <p className="text-xs tracking-[0.35em] text-gold uppercase">November 7</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-rose-deep sm:text-6xl dark:text-[#f3c9c9]">
              {copy.birthdayHeadline}
              <span className="ml-2" aria-hidden="true">
                ❤️
              </span>
            </h2>
            <p className="mt-6 font-serif text-lg italic text-ink-soft dark:text-[#d9c4bc]">
              {copy.birthdaySub}
            </p>
            <p className="mt-3 text-sm text-ink-soft/80 dark:text-[#cbb8b0]">
              {`From ${names.myNickname}, with all of it.`}
            </p>
          </motion.div>
        ) : (
          <motion.div key="count" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-xs tracking-[0.35em] text-rose-deep uppercase dark:text-gold">
              Until your day
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
              <Digit value={remaining.days} label="Days" />
              <Digit value={remaining.hours} label="Hours" />
              <Digit value={remaining.minutes} label="Minutes" />
              <Digit value={remaining.seconds} label="Seconds" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
