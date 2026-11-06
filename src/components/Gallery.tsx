import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { copy, photos } from '../config'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0', '-rotate-2', 'rotate-1', '-rotate-1']

export function Gallery() {
  const reduced = usePrefersReducedMotion()
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (open === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(null)
      if (event.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % photos.length))
      if (event.key === 'ArrowLeft')
        setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-center text-xs tracking-[0.35em] text-rose-deep uppercase dark:text-gold">
        Memories
      </p>
      <h2 className="mt-3 text-center font-serif text-3xl text-ink dark:text-[#f8eee8]">
        {copy.galleryTitle}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-sm text-ink-soft dark:text-[#d9c4bc]">
        {copy.gallerySubtitle}
      </p>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <motion.button
            key={photo.src}
            type="button"
            onClick={() => setOpen(index)}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
            className={`group rounded-sm bg-white p-2 pb-8 text-left shadow-[0_12px_30px_rgba(58,42,42,0.08)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:rotate-0 focus-visible:ring-2 focus-visible:ring-rose dark:bg-[#2a151b] dark:ring-white/5 ${tilts[index % tilts.length]}`}
            aria-label={`Open photo: ${photo.caption}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover"
            />
            <span className="mt-3 block px-1 font-serif text-sm italic text-ink-soft dark:text-[#d9c4bc]">
              {photo.caption}
            </span>
          </motion.button>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {open !== null && (
            <Lightbox index={open} onClose={() => setOpen(null)} onChange={setOpen} />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}

function Lightbox({
  index,
  onClose,
  onChange,
}: {
  index: number
  onClose: () => void
  onChange: (index: number) => void
}) {
  const photo = photos[index]
  const [touchX, setTouchX] = useState<number | null>(null)
  if (!photo) return null

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#14090c]/88 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 text-sm tracking-[0.2em] text-white/80 uppercase"
      >
        Close
      </button>
      <button
        type="button"
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 -translate-y-1/2 px-3 text-3xl text-white/80"
        onClick={(event) => {
          event.stopPropagation()
          onChange((index - 1 + photos.length) % photos.length)
        }}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next photo"
        className="absolute right-3 top-1/2 -translate-y-1/2 px-3 text-3xl text-white/80"
        onClick={(event) => {
          event.stopPropagation()
          onChange((index + 1) % photos.length)
        }}
      >
        ›
      </button>
      <motion.figure
        key={photo.src}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="max-h-[82dvh] max-w-3xl"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => setTouchX(event.changedTouches[0]?.clientX ?? null)}
        onTouchEnd={(event) => {
          if (touchX === null) return
          const delta = (event.changedTouches[0]?.clientX ?? 0) - touchX
          if (delta > 40) onChange((index - 1 + photos.length) % photos.length)
          if (delta < -40) onChange((index + 1) % photos.length)
          setTouchX(null)
        }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[72dvh] w-full rounded-md object-contain"
        />
        <figcaption className="mt-4 text-center font-serif italic text-[#f4ddd6]">
          {photo.caption}
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}
