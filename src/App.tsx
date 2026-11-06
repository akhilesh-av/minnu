import { useEffect, useMemo } from 'react'
import { Ambient } from './components/Ambient'
import { Countdown } from './components/Countdown'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Letter } from './components/Letter'
import { MusicToggle } from './components/MusicToggle'
import { Surprise } from './components/Surprise'
import { Timeline } from './components/Timeline'
import { dates, names, site } from './config'
import { useCountdown } from './hooks/useCountdown'
import { useTheme } from './hooks/useTheme'
import { parseDate, wantsBirthdayPreview } from './lib/time'

export default function App() {
  const { theme, toggle } = useTheme()
  const target = useMemo(() => parseDate(dates.birthdayTarget), [])
  const forceDone = useMemo(() => wantsBirthdayPreview(), [])
  const { remaining, isBirthday } = useCountdown(target, forceDone)

  useEffect(() => {
    document.title = isBirthday
      ? `Happy ${dates.turningAge}th, ${names.partnerName}`
      : site.title
  }, [isBirthday])

  return (
    <div className="relative min-h-dvh bg-linear-to-b from-cream via-blush/40 to-cream dark:from-night dark:via-burgundy dark:to-night">
      <div className="grain" aria-hidden="true" />
      <Ambient />

      <a
        href="#countdown"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to countdown
      </a>

      <button
        type="button"
        onClick={toggle}
        className="fixed top-4 right-4 z-30 rounded-full bg-white/70 px-3 py-2 text-[11px] tracking-[0.18em] text-ink-soft uppercase shadow-sm ring-1 ring-rose/15 backdrop-blur dark:bg-[#2a151b]/80 dark:text-[#d9c4bc]"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>

      <main className="relative z-10">
        <Hero isBirthday={isBirthday} />
        <Countdown remaining={remaining} isBirthday={isBirthday} />
        <Timeline />
        <Gallery />
        <Letter />
        <Surprise />
        <Footer />
      </main>

      <MusicToggle />
    </div>
  )
}
