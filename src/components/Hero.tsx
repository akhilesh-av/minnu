import { motion } from 'framer-motion'
import { FloatingPhotos } from './FloatingPhotos'
import { copy, names } from '../config'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type HeroProps = {
  isBirthday: boolean
}

export function Hero({ isBirthday }: HeroProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <FloatingPhotos />
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-5 text-xs tracking-[0.35em] text-rose-deep uppercase"
      >
        {copy.heroEyebrow}
      </motion.p>

      <motion.h1
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="relative z-10 font-serif text-6xl font-medium tracking-tight text-rose-deep sm:text-8xl dark:text-[#f3c9c9]"
      >
        {names.partnerName}
      </motion.h1>

      <motion.p
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.35 }}
        className="relative z-10 mt-6 max-w-sm font-serif text-xl italic text-ink-soft sm:text-2xl dark:text-[#e6d4cc]"
      >
        {isBirthday ? copy.heroBirthdayLine : copy.heroLine}
      </motion.p>

      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 mt-10"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 32"
          className="heartbeat h-8 w-8 fill-rose drop-shadow-[0_0_18px_rgba(201,123,123,0.55)]"
        >
          <path d="M16 28S4 20 4 12a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 8-12 16-12 16z" />
        </svg>
      </motion.div>

      <a
        href="#countdown"
        className="absolute bottom-10 z-10 text-[11px] tracking-[0.28em] text-ink-soft uppercase transition hover:text-rose-deep dark:text-[#cbb8b0]"
      >
        {copy.scrollHint}
        <span className="mt-2 block animate-bounce" aria-hidden="true">
          ⌄
        </span>
      </a>
    </section>
  )
}
