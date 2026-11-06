import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { copy } from '../config'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Surprise() {
  const reduced = usePrefersReducedMotion()
  const [open, setOpen] = useState(false)

  return (
    <section className="mx-auto max-w-xl px-6 py-16 text-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-rose/30 bg-white/50 px-8 py-3 text-sm tracking-[0.18em] text-rose-deep uppercase transition hover:border-rose hover:bg-white dark:border-gold/30 dark:bg-burgundy/40 dark:text-[#f3c9c9] dark:hover:bg-burgundy"
      >
        {copy.surpriseButton}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mt-10"
          >
            {!reduced &&
              Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 text-rose"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                  animate={{
                    x: (i - 6) * 18,
                    y: -70 - (i % 4) * 16,
                    opacity: 0,
                    scale: 1.2,
                  }}
                  transition={{ duration: 1.1, delay: i * 0.03 }}
                >
                  ♥
                </motion.span>
              ))}
            <p className="whitespace-pre-line font-serif text-2xl leading-relaxed text-ink dark:text-[#f8eee8]">
              {copy.surpriseMessage}
            </p>
            <p className="mt-4 text-sm tracking-[0.2em] text-gold uppercase">{copy.surpriseFrom}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
