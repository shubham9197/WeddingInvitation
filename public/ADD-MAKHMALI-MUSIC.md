# Add Makhmali MP3 (replace instrumental)

The app plays **`public/wedding-music.mp3`**. Right now that file is still the old
instrumental track. You must replace it with Makhmali yourself (legal download).

## Song
**Makhmali** — Sonu Nigam & Shreya Ghoshal (from *Zindagi Virat*)

## Legal download (pick one)
- [JioSaavn](https://www.jiosaavn.com/song/makhmali/PzEgA0xzBgs) — download in app (premium)
- [Gaana](https://gaana.com/song/makhmali-2) — download in app (premium)
- [Apple Music](https://music.apple.com/in/song/makhmali/1465733860) — purchase / library

## Steps
1. Download **Makhmali** using one of the apps above (paid/subscription download).
2. Export or copy the file to your PC as an **MP3** (or convert M4A → MP3 with any converter).
3. **Delete** the old `public/wedding-music.mp3` (instrumental).
4. Save your Makhmali file as exactly:  
   `public/wedding-music.mp3`
5. Optional: trim to ~60 seconds in an editor (the site loops the first 60 seconds).
6. Run `npm run dev` and test — open envelope, hear Makhmali.
7. **Git commit** `public/wedding-music.mp3` and **redeploy** so the live site gets the new file.

## Check on live server
Open: `https://YOUR-SITE.com/wedding-music.mp3`  
If it plays Makhmali, deploy is correct.

We cannot auto-download this song from YouTube/Google (copyright).
