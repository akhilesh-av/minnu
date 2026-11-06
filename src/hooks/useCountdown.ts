import { useEffect, useState } from 'react'
import { remainingUntil, type Remaining } from '../lib/time'

export function useCountdown(target: Date, forceDone = false) {
  const [remaining, setRemaining] = useState<Remaining>(() =>
    forceDone ? remainingUntil(target, target) : remainingUntil(target),
  )

  useEffect(() => {
    if (forceDone) {
      setRemaining(remainingUntil(target, target))
      return
    }

    const tick = () => setRemaining(remainingUntil(target))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [target, forceDone])

  return {
    remaining,
    isBirthday: forceDone || remaining.total <= 0,
  }
}
