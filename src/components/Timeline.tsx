import { motion } from 'framer-motion'
import { copy, dates, timeline } from '../config'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { daysBetween, parseDate } from '../lib/time'

export function Timeline() {
  const reduced = usePrefersReducedMotion()
  const since = daysBetween(parseDate(dates.firstMet), new Date())

  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <p className="text-center text-xs tracking-[0.35em] text-rose-deep uppercase dark:text-gold">
        Our story
      </p>
      <h2 className="mt-3 text-center font-serif text-3xl text-ink dark:text-[#f8eee8]">
        A short line of days
      </h2>

      <p className="mt-8 text-center">
        <span className="font-serif text-5xl text-rose-deep dark:text-[#f3c9c9]">{since}</span>
        <span className="mt-2 block text-[11px] tracking-[0.22em] text-ink-soft uppercase dark:text-[#cbb8b0]">
          {copy.daysSinceLabel}
        </span>
      </p>

      <ol className="relative mt-14 space-y-12 border-l border-rose/30 pl-8 dark:border-gold/25">
        {timeline.map((event, index) => (
          <motion.li
            key={event.title}
            initial={reduced ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="relative"
          >
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[39px] h-3 w-3 rounded-full bg-rose shadow-[0_0_0_6px_rgba(201,123,123,0.15)] dark:bg-gold"
            />
            <p className="text-[11px] tracking-[0.22em] text-gold uppercase">{event.label}</p>
            <h3 className="mt-1 font-serif text-2xl text-ink dark:text-[#f8eee8]">{event.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-[#d9c4bc]">
              {event.body}
            </p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
