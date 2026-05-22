# Gallery photos

Drop your JPG/PNG/WebP files here. **Any file name works** (e.g. `photo_1.jpg`, `Screenshot.png`).

After adding or removing photos, run from the project folder:

```bash
npm run gallery:sync
```

That updates `src/lib/gallery-images.ts` and `manifest.json` so the app uses the correct paths.

Then refresh the browser (or restart `npm run dev`).

**Important:** Do not run `gallery:sync` while the folder looks empty — OneDrive may still be syncing your photos. If the gallery goes blank, run sync again once files are visible in this folder.

## Production

Commit **both** this folder’s images **and** the updated `gallery-images.ts` when you deploy.
