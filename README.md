# For Arya (Minnu)

A quiet birthday page for November 7. Vite + React + TypeScript + Tailwind + Framer Motion. No backend.

Tomorrow is the day. Edit `src/config.ts`, add a song if you want one, deploy.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Preview birthday mode before midnight:

```
http://localhost:5173/?birthday=1
```

Build:

```bash
npm run build
npm run preview
```

## Change names, dates, and words

Everything she will read lives in **`src/config.ts`**.

- `names` — Arya / Minnu / Akhilesh / Shuttu
- `dates` — birthday, first met, first travel
- `copy` — hero line, surprise, footer, gallery titles
- `letter` — the letter body
- `timeline` — story beats
- `photos` — only the pictures that appear on the page

## Add photos (keep it small)

The page is not a gallery dump. It shows **only** the photos listed in `photos` inside `src/config.ts`. Extra files in `public/photos/` will not appear until you add them there.

1. Drop files into `public/photos/`
2. Add an entry:

```ts
{
  src: '/photos/your-file.jpg',
  caption: 'A line only she will understand.',
  alt: 'Short description for accessibility',
}
```

Prefer 6–10 photos. Use `.jpg` / `.webp`. Skip huge `.MOV` / `.HEIC` files for the live site — they slow the phone and can fail a free deploy.

`public/photos/` currently has many originals. You can leave them there, but Vercel/Netlify uploads get heavy (~300MB). For a fast deploy, keep only the files listed in `config.ts`.

## Music

Optional. Off by default. No autoplay.

Put a file at:

```
public/music.mp3
```

A play/pause control appears in the corner if that file exists.

## Deploy to Vercel

1. Push this folder to GitHub (or GitLab / Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework: Vite. Build command: `npm run build`. Output: `dist`.
4. Deploy. Share the URL with her.

Or from the terminal, after logging in:

```bash
npx vercel
```

Netlify: drag the `dist` folder after `npm run build`, or connect the git repo with the same Vite defaults.

After you have a live URL, you can set `site.siteUrl` in `src/config.ts` if you want a fully qualified Open Graph image.

## Notes

- Dark / light toggle is in the top-right. It follows her system the first time.
- The countdown targets `2026-11-07T00:00:00+05:30` (IST). At zero it becomes birthday mode without a reload.
- `?birthday=1` is only for you, so you can check the confetti and headline tonight.
