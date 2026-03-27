# Lexx AI — Website

Medical record intelligence platform for legal teams. Built with React + React Router, deployable to Vercel in minutes.

---

## 🗂 Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, stats, problem/solution, CTA |
| `/how-it-works` | Process walkthrough + practice areas |
| `/features` | Full feature breakdown by category |
| `/pricing` | Plans with annual/monthly toggle + FAQ |
| `/contact` | Demo request form |

---

## 🚀 Deploy to GitHub + Vercel

### Step 1 — Push to GitHub

```bash
# Inside the lexx-ai folder
git init
git add .
git commit -m "Initial commit — Lexx AI website"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/lexx-ai.git
git branch -M main
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your `lexx-ai` GitHub repository
3. Vercel auto-detects Create React App — no config needed
4. Click **Deploy**
5. Your site is live at `lexx-ai.vercel.app` (or your custom domain)

**Every `git push` to `main` auto-deploys.** That's it.

### Step 3 — Custom Domain (optional)

In Vercel → Project Settings → Domains → Add `lexxai.com` or whatever you own.

---

## 🛠 Local Development

```bash
npm install
npm start        # runs at http://localhost:3000
npm run build    # production build → /build folder
```

---

## 📁 Project Structure

```
src/
  components/
    Navbar.jsx / .css
    Footer.jsx / .css
  pages/
    Home.jsx / .css
    HowItWorks.jsx / .css
    Features.jsx / .css
    Pricing.jsx / .css
    Contact.jsx / .css
  App.jsx          ← routing lives here
  index.css        ← design system / global styles
  index.js         ← entry point
public/
  index.html
vercel.json        ← SPA routing fix for Vercel
```

---

## ✏️ Common Edits

- **Change pricing** → `src/pages/Pricing.jsx` — edit the `plans` array
- **Add a testimonial section** → create `src/components/Testimonials.jsx` and import it in `Home.jsx`
- **Update the navbar links** → `src/components/Navbar.jsx` — edit the `links` array
- **Connect a real form backend** → In `Contact.jsx`, replace `setSubmitted(true)` with a `fetch()` call to Formspree, Netlify Forms, or your own API

---

## 🎨 Design System

All colors and tokens are in `src/index.css` under `:root`. Change `--teal` and `--navy` to rebrand instantly.
