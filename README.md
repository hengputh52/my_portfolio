# Meng Heng · Building the Quiet Parts of the Web

A one-page portfolio pressed like a Golden Age Khmer LP: record-sleeve hero, liner notes, a tracklist of projects, studio gear for the stack, archive photos and a fan-mail card. A reel-to-reel transport panel serves as the navigation.
Visit the Website: https://my-portfolio-beryl-two-77.vercel.app 
## Run it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build && pnpm start
```

## Where things live

- `lib/data.ts`: all content (bio, tracks, gear, photos, Khmer labels). Edit this first.
- `components/sections/`: the six sections.
- `components/deck/`: transport panel (nav), reels and VU meters.
- `components/gear/GearArt.tsx`: SVG illustrations of the studio equipment.
- `lib/motion.ts` and `components/SmoothScroll.tsx`: GSAP + Lenis setup and the scroll-velocity feed.
- `lib/crackle.ts`: the vinyl crackle, synthesised with the Web Audio API.

## Libraries

- [GSAP](https://github.com/greensock/GSAP) with ScrollTrigger and SplitText: intro, pinned horizontal tracklist, tape-flutter headings.
- [Lenis](https://github.com/darkroomengineering/lenis): smooth scroll, driven from GSAP's ticker.
- [React Bits](https://github.com/DavidHDev/react-bits): `SplitText`, `CircularText`, `ScrollVelocity` and `Noise`, copied into `components/` and lightly edited.

Visitors with "reduce motion" turned on get native scrolling and no animation.
