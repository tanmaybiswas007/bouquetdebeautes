# My Space — social links + image gallery

A responsive static website with:
- YouTube and Telegram link cards
- QR codes generated from your actual links
- Image gallery
- Mobile-friendly layout
- Share button

## 1. Add your channel links
Open `script.js` and replace the example links near the top:

```js
const SITE_CONFIG = {
  youtube: "https://www.youtube.com/@YOUR_CHANNEL",
  telegram: "https://t.me/YOUR_CHANNEL"
};
```

Use the full public URL for each channel.

## 2. Add images that everyone can see
Put your image files in the `images/` folder. Then update `GALLERY_IMAGES` in `script.js`:

```js
const GALLERY_IMAGES = [
  { src: "images/photo-1.jpg", caption: "Behind the scenes" },
  { src: "images/photo-2.png", caption: "Latest work" }
];
```

File names and capitalization must match exactly. The website's “Add photos” button is only for local previews; it does not upload files to a server.

## 3. Publish for free with GitHub Pages
1. Create a new repository on GitHub.
2. Upload `index.html`, `style.css`, `script.js`, and the `images` folder.
3. Open the repository's **Settings → Pages**.
4. Under Build and deployment, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. Wait for GitHub to publish the site. Your public website URL will appear in the Pages section.

## Notes
- QR codes require the QRCode.js CDN to load. An internet connection is needed on first page load.
- This is a static site. Permanent uploads from a visitor-facing upload form need a backend or image-hosting service; this starter intentionally does not pretend local previews are public uploads.
