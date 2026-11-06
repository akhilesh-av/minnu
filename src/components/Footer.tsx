import { copy } from '../config'

export function Footer() {
  return (
    <footer className="px-6 py-16 text-center">
      <p className="font-serif italic text-ink-soft dark:text-[#d9c4bc]">{copy.footer}</p>
    </footer>
  )
}
