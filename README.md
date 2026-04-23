# Petrait

AI portraits of your pet in any style — royal, Renaissance, astronaut, wizard. Made for your wall.

## Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **pnpm**

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deploy to [Vercel](https://vercel.com) — zero config required. Connect the repo and push.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with waitlist signup |
| `/try` | Upload a pet photo, apply Napoleon style (client-side), download |
| `/api/waitlist` | `POST { email }` → forwards to waitlist API |

## Status

v0 skeleton — landing page ported from static HTML, `/try` page with mocked Napoleon style (CSS sepia + contrast + crown overlay), waitlist API wired up. AI image generation not yet integrated.
