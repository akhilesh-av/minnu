import { useEffect, useRef, useState } from 'react'
import { copy } from '../config'

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [available, setAvailable] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    fetch(copy.musicSrc, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') ?? ''
        setAvailable(res.ok && type.includes('audio'))
      })
      .catch(() => setAvailable(false))
  }, [])

  if (!available) return null

  return (
    <>
      <audio ref={audioRef} src={copy.musicSrc} loop preload="none" />
      <button
        type="button"
        onClick={() => {
          const audio = audioRef.current
          if (!audio) return
          if (playing) {
            audio.pause()
            setPlaying(false)
          } else {
            void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
          }
        }}
        className="fixed right-4 bottom-20 z-30 rounded-full bg-white/80 px-4 py-2 text-[11px] tracking-[0.18em] text-ink-soft uppercase shadow-sm ring-1 ring-rose/20 backdrop-blur dark:bg-[#2a151b]/80 dark:text-[#d9c4bc]"
        aria-label={playing ? copy.musicLabelPause : copy.musicLabelPlay}
      >
        {playing ? 'Pause' : 'Music'}
      </button>
    </>
  )
}
