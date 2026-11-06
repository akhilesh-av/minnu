export function parseDate(value: string) {
  return new Date(value.includes('T') ? value : `${value}T00:00:00+05:30`)
}

export function daysBetween(from: Date, to: Date) {
  const start = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())
  const end = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate())
  return Math.max(0, Math.floor((end - start) / 86_400_000))
}

export function formatLongDate(value: string) {
  if (value === 'today') return 'Today'
  return new Intl.DateTimeFormat('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(parseDate(value))
}

export type Remaining = {
  total: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function remainingUntil(target: Date, now = new Date()): Remaining {
  const total = Math.max(0, target.getTime() - now.getTime())
  const days = Math.floor(total / 86_400_000)
  const hours = Math.floor((total / 3_600_000) % 24)
  const minutes = Math.floor((total / 60_000) % 60)
  const seconds = Math.floor((total / 1000) % 60)
  return { total, days, hours, minutes, seconds }
}

export function wantsBirthdayPreview() {
  return new URLSearchParams(window.location.search).get('birthday') === '1'
}
