# Sunflower Birthday Website

A static, GitHub Pages-ready birthday website with a cute sunflower theme, animated petals, confetti, an interactive wish jar, a click-to-grow sunflower garden, photo placeholders, birthday coupons, and a secret love note.

https://ezrahojc.github.io/Irene/

## Files

```text
sunflower-birthday-site/
├── index.html
├── styles.css
├── script.js
├── .nojekyll
├── README.md
└── assets/
    └── sunflower.svg
```

## Personalize it

1. Open `script.js`.
2. Change:

```js
partnerName: "my sunflower",
fromName: "me",
```

3. Open `index.html` and edit the birthday letter, reasons, coupons, and gallery captions.
4. To add real photos, place image files inside `assets/`, then replace a placeholder like this:

```html
<div class="photo-placeholder photo-one" role="img" aria-label="Photo placeholder with sunflower pattern">🌻</div>
```

with this:

```html
<img class="photo-placeholder" src="assets/your-photo.jpg" alt="A sweet memory together" />
```

The CSS already sizes the gallery area, so normal JPG, PNG, or WebP files will work.

## Preview locally

Open `index.html` directly in a browser, or run a local static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Push to GitHub

From inside the `sunflower-birthday-site` folder:

```bash
git init
git add .
git commit -m "Add sunflower birthday website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

## Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/** root.
5. Save.

GitHub Pages should serve the site from the `index.html` file in the repository root.
