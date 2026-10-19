# Fathur — Portfolio

A responsive static portfolio for GitHub Pages. The homepage is intentionally compact; each project has its own HTML page under `projects/`.

## Files

- `index.html` — homepage, profile, CV, rotating project previews, contact links.
- `style.css` — responsive styling for the homepage and project detail pages.
- `script.js` — mobile navigation and accessible project carousel.
- `projects/steel-canopy.html` — steel canopy project detail template.
- `projects/precast-fence.html` — precast fence project detail template.
- `projects/railing-details.html` — railing/detail drawing project template.
- `docs/MyCurriculum Vitae.pdf` — current CV file copied from the supplied portfolio.
- `assets/profile/` — existing profile image assets retained for later use.

## Before publishing

1. Replace `your.email@example.com` in `index.html` with your active professional email.
2. Check the CV PDF and replace it if it is outdated.
3. Update the project descriptions so they exactly match your personal contribution.
4. Replace the schematic illustrations with screenshots/images from your own work. They are explicitly labelled as placeholders and should not be presented as actual project screenshots.
5. Upload only IFC/PDF files you are permitted to share. The project pages currently do not link to fabricated sample files.
6. Add your real LinkedIn profile URL if you want to keep that link; the current link goes to LinkedIn's homepage.

## Publish on GitHub Pages

1. Extract this ZIP.
2. Upload the **contents** of the `portfolio-final` folder to the root of your GitHub repository (so `index.html` is at the repository root).
3. Commit and push the files.
4. In the repository, open **Settings → Pages**. Select **Deploy from a branch**, choose the default branch and `/ (root)`, then save.
5. Wait for the deployment link to appear in the Pages settings.

No build process or backend is required. Google Fonts is optional; if offline, the page falls back to system fonts.


## IFC viewer troubleshooting

Viewer IFC memakai `three.js` + `web-ifc` yang di-host sendiri di folder `vendor/` (tidak bergantung CDN seperti esm.sh/unpkg). Pastikan folder `vendor/` dan `models/` ikut ter-upload ke repo. Jika model gagal tampil, buka DevTools (F12) → Console/Network dan cek apakah `vendor/web-ifc.wasm` dan `models/the-breeze-rejuvenation.ifc` bisa diakses (status 200) di path GitHub Pages Anda.

**Privacy note:** the IFC file in this test package is stored under `models/` and will be publicly accessible if uploaded to GitHub Pages. Hiding a download button does not prevent direct access. For a public portfolio where the source IFC must not be downloadable, replace it with a derived visualization asset (for example GLB) or rendered images before publishing.
