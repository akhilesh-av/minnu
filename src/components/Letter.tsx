import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { copy, letter } from '../config'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Letter() {
  const reduced = usePrefersReducedMotion()
  const [open, setOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const full = `${letter.body}`

  useEffect(() => {
    if (!open) return
    if (reduced) {
      setTyped(full)
      return
    }
    setTyped('')
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTyped(full.slice(0, i))
      if (i >= full.length) window.clearInterval(id)
    }, 18)
    return () => window.clearInterval(id)
  }, [open, reduced, full])

  return (
    <section className="mx-auto max-w-xl px-6 py-20 text-center">
      <p className="text-xs tracking-[0.35em] text-rose-deep uppercase dark:text-gold">
        For your eyes
      </p>
      <h2 className="mt-3 font-serif text-3xl text-ink dark:text-[#f8eee8]">{copy.letterOpenedLabel}</h2>

      {!open ? (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          whileHover={reduced ? undefined : { y: -4 }}
          className="group relative mx-auto mt-12 block w-full max-w-sm"
          aria-label={copy.letterButton}
        >
          <span className="relative block overflow-hidden rounded-2xl bg-gradient-to-br from-[#f7e6dc] to-[#e8c4bc] px-8 py-16 shadow-[0_20px_50px_rgba(154,77,87,0.18)] ring-1 ring-rose/20 dark:from-[#4a2030] dark:to-[#2a1018]">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-20 origin-top bg-[#f0d2c8] transition duration-500 group-hover:-translate-y-2 dark:bg-[#5a2836]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />
            <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose text-white shadow-[0_0_0_8px_rgba(201,123,123,0.18)]">
              ♥
            </span>
            <span className="relative z-10 mt-6 block text-sm tracking-[0.2em] text-rose-deep uppercase dark:text-[#f3c9c9]">
              {copy.letterButton}
            </span>
          </span>
        </motion.button>
      ) : (
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 rounded-3xl bg-white/80 px-6 py-10 text-left shadow-[0_20px_50px_rgba(58,42,42,0.06)] ring-1 ring-rose/10 dark:bg-[#2a151b]/80 dark:ring-gold/10 sm:px-10"
        >
          <p className="font-serif text-2xl italic text-ink dark:text-[#f8eee8]">{letter.greeting}</p>
          <p className="mt-6 whitespace-pre-line font-serif text-lg leading-8 text-ink-soft dark:text-[#e6d4cc]">
            {typed}
            {typed.length < full.length && (
              <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-rose align-middle" />
            )}
          </p>
          <p className="mt-8 text-sm tracking-[0.18em] text-gold uppercase">{letter.signOff}</p>
          <p className="mt-1 font-serif text-2xl italic text-rose-deep dark:text-[#f3c9c9]">
            {letter.signature}
          </p>
        </motion.article>
      )}
    </section>
  )
}
