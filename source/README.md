# Monika — A Little Secret 💗
A mobile-first birthday surprise (React + Vite + TypeScript). Scan a QR code → open in any phone browser, no app needed.

## 1. Run it
```bash
npm install
npm run dev        # opens on http://localhost:5173 (also on your Wi-Fi IP for phone testing)
npm run build      # type-checks and creates the deployable /dist folder
npm run preview    # test the production build locally
```
Requires Node 18+.

## 2. Edit the words
Everything is in **`src/data/birthdayContent.ts`**: names, birthday date (`YYYY-MM-DD`), balloon messages, captions, secret notes, final and confession text, and the optional music path. Replace the starter text with your own words.

## 3. Add photos, videos, music
Put files in `public/media/` and list them in the same config file.
- Photos: `public/media/photos/` (JPG, PNG, WebP). Resize to ~900 px wide first for fast mobile loading. Write real `alt` text and optional `caption` / `date` (only add dates you are sure of).
- Videos: `public/media/videos/*.mp4` (H.264/AAC plays everywhere), optional `poster` image. Keep them small (a few MB) for mobile data.
- Music: `public/media/audio/song.mp3`, then set `music.src`. Use only music you made, own, or are licensed to use. With no `src`, the music button is hidden and everything else works. Music never autoplays; it starts only when she taps Play.

Before sharing, check that you have permission to share every photo/video, including from other people shown in them. One photo contains a second person, and one originally showed a car number plate (it was blurred in the optimized copy). Remove or replace anything you or they are not comfortable sharing.

## 4. Deploy to a public HTTPS URL (pick one)
- **Netlify Drop (easiest):** `npm run build`, then drag the `dist` folder onto https://app.netlify.com/drop.
- **Vercel:** push to GitHub, import the repo, framework "Vite", build `npm run build`, output `dist`.
- **GitHub Pages / Cloudflare Pages:** build and publish `dist` (the app uses relative paths, so subfolders work).

Open the live URL on your phone first. It is only "online" once that works.

## 5. QR code (after deployment only)
```bash
npm run qr -- https://your-real-site-url
```
Creates `qr-code.png` and `qr-code.svg`. The script refuses `localhost`, `http://` and private network addresses. Print it on a card with:
> **Scan this… a little surprise is waiting for you. 💗**

Test: open the phone Camera app, point it at the printed/on-screen code, tap the banner. Test on both iPhone and Android if possible, on mobile data as well as Wi-Fi. If the URL ever changes (new host, renamed site), generate a new QR code, since the old one points to the old address. The site also works by pasting the URL directly.

## 6. Privacy
An unlisted link is **not private**. Anyone with the link (or QR) can open it and the media files, and search or link sharing can spread it. The page includes `noindex`, but that does not stop sharing. There are no trackers, backends or keys. Progress is saved only in her own browser (localStorage); the last screen's replay button clears it.

## 7. Testing checklist
- [ ] Welcome → Begin; no sound plays automatically
- [ ] Countdown ticks; birthday-day and after-date messages appear (change `birthday` in config to test)
- [ ] All 7 balloons pop once each; counter reads 7 of 7; Skip works
- [ ] Gallery: lightbox opens, Prev/Next, arrow keys, Esc, close button
- [ ] Videos play on a real phone; poster shows; error text if file missing
- [ ] Notes: 6th is locked until the others are opened; re-read works; Skip works
- [ ] Final reveal → confession → "That's so sweet" → Replay resets
- [ ] No sideways scrolling at 360 px width; reduced-motion setting calms animations
- [ ] Real QR scan opens the deployed HTTPS URL
