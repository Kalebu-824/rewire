# ReWire – e-waste marketplace

A simple static website where people list used electrical and electronic items for sale. No build step, no dependencies.

## Files
- `index.html` – page structure
- `style.css` – design (auto light/dark)
- `script.js` – listings, search, category filter, sell form
- Edit the `SEED` list and `CATEGORIES` at the top of `script.js` to change the listings and categories.

## Push to GitHub and publish

1. Create an empty repository on github.com (for example `rewire`).
2. In this folder, run:

```bash
git init
git add .
git commit -m "Initial e-waste marketplace site"
git branch -M main
git remote add origin https://github.com/<your-username>/rewire.git
git push -u origin main
```

3. On GitHub, open **Settings → Pages**, set Source to **Deploy from a branch**, choose `main` and `/ (root)`, then save.
4. After a minute your site is live at `https://<your-username>.github.io/rewire/`.

## Important limitation

GitHub Pages hosts only static files, so listings added through the form are saved in that visitor's own browser. Other visitors will not see them. Listings everyone should see go in the `SEED` array in `script.js`: add an entry, commit and push.

To let all visitors see new listings, you need a shared database. Easy options: Firebase Firestore, Supabase, or a Google Form that writes to a Google Sheet. I can wire one of these in when you're ready.

## Before you use it
- Replace the placeholder WhatsApp number `919999999999` in the sample listings with real numbers (country code, digits only).
- Remind sellers to wipe personal data from phones, laptops and storage.
