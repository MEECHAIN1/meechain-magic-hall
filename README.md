# MeeChain Magic Hall

Interactive React + Vite front-end for the MeeChain Magic Layer.

## What is included

- 7 Hall navigation + MeeBot console
- Live polling for `/health`, `/api/magic/orb`, `/api/magic/realm-vision`
- Address-bound views for `/api/magic/hall/:address`, achievements, quests, quest log
- Vercel rewrites + Netlify redirects for proxying the Replit API
- Style language preserved from current MeeChain UI: dark grid, aura glow, orbital hero, ritual cards

## Local run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deploy

### Vercel
The included `vercel.json` rewrites `/api/*` and `/health` to:

`https://ritual-chain--pouaun2499.replit.app`

### Netlify
The included `netlify.toml` does the same proxy mapping.

## Optional env override

If you want to bypass proxy rules and call another backend, set:

```bash
VITE_API_BASE_URL=https://your-api-domain.com
```
