import type { CSSProperties } from 'react'
import { floatingPhotos } from '../config'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function FloatingPhotos() {
  const reduced = usePrefersReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden [mask-image:radial-gradient(ellipse_36%_40%_at_50%_48%,transparent_38%,black_74%)]"
    >
      {floatingPhotos.map((photo, index) => (
        <figure
          key={photo.src}
          className={`absolute ${photo.className}`}
          style={{
            '--duration': `${photo.duration}s`,
            '--delay': `${photo.delay}s`,
            '--tilt': `${index % 2 === 0 ? -8 : 7}deg`,
            '--tilt-end': `${index % 2 === 0 ? 5 : -6}deg`,
            '--drift-x': `${index % 2 === 0 ? 14 : -16}px`,
            '--drift-y': `${index % 3 === 0 ? -22 : 16}px`,
          } as CSSProperties}
        >
          <div
            className={`rounded-sm bg-white/35 p-1.5 shadow-[0_10px_30px_rgba(58,42,42,0.06)] ring-1 ring-white/30 dark:bg-white/10 dark:ring-white/10 ${reduced ? '' : 'float-photo'}`}
          >
            <img
              src={photo.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover opacity-30 mix-blend-multiply dark:opacity-20 dark:mix-blend-screen"
            />
          </div>
        </figure>
      ))}
    </div>
  )
}
