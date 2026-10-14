"use client";

import { useRef } from "react";
import SplitText from "@/components/SplitText";
import CircularText from "@/components/CircularText";
import { VuMeter } from "@/components/deck/VuMeter";
import { MusicToggle } from "@/components/deck/MusicToggle";
import { artist, km } from "@/lib/data";
import { gsap, onVelocity, scrollToId, useGSAP } from "@/lib/motion";

const SIDES = [
  {
    side: "Side A", km: km.sideA,
    rows: [
      { no: "A1", title: "Liner Notes", id: "about" },
      { no: "A2", title: "Tracklist", id: "work" },
    ],
  },
  {
    side: "Side B", km: km.sideB,
    rows: [
      { no: "B1", title: "Studio Gear", id: "gear" },
      { no: "B2", title: "From the Archive", id: "archive" },
      { no: "B3", title: "Fan Mail", id: "contact" },
    ],
  },
];

function Sleeve() {
  return (
    <div
      data-sleeve
      className="relative z-10 aspect-square w-full overflow-hidden shadow-[0_30px_60px_-25px_rgba(47,31,19,0.75)]"
      style={{
        background:
          "repeating-conic-gradient(from 0deg at 72% 78%, rgba(255,240,200,0.2) 0deg 5deg, transparent 5deg 10deg), var(--color-mustard)",
      }}
    >
      {/* artist photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/portrait.png"
        alt={`${artist.name}, cover photo`}
        className="absolute bottom-0 right-[-6%] h-[74%] w-auto mix-blend-multiply faded"
      />

      <div className="absolute inset-0 p-[5%] flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="dymo dymo-black text-[0.6rem]!">{artist.catalog}</span>
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-burgundy border-2 border-burgundy rounded-full px-2.5 py-0.5">
            STEREO
          </span>
        </div>

        <p lang="km" className="font-khmer font-bold text-burgundy text-[clamp(1.4rem,3.4vw,2.4rem)] leading-tight mt-[4%]">
          {artist.km}
        </p>
        <SplitText
          text={artist.name}
          tag="h1"
          textAlign="left"
          splitType="chars"
          delay={45}
          duration={1}
          from={{ opacity: 0, y: 60, rotate: 4 }}
          to={{ opacity: 1, y: 0, rotate: 0 }}
          threshold={0}
          rootMargin="0px"
          className="album text-burgundy-deep text-[clamp(3.4rem,8.5vw,7.2rem)] max-w-[70%] mt-1"
        />

        <div className="mt-auto max-w-[62%]">
          <p className="bg-burgundy text-ivory font-display text-[clamp(1rem,2.1vw,1.55rem)] leading-[1.1] px-3 py-2.5 shadow-md">
            {artist.album}
          </p>
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-tobacco-deep/80 mt-2">
            SIDE A · 33⅓ RPM · {artist.location.toUpperCase()}
          </p>
        </div>
      </div>

      {/* hi-fi sticker */}
      <div className="absolute top-[20%] right-[5%] w-[23%] aspect-square">
        <div className="absolute inset-0 rounded-full bg-needle shadow-md" />
        <CircularText
          text="★ HI-FI ★ BACKEND SESSIONS "
          spinDuration={24}
          onHover="speedUp"
          className="absolute! inset-[6%] w-auto! h-auto! text-ivory! font-mono! font-bold!"
          letterClassName="text-[clamp(6px,0.9vw,10px)]"
        />
        <span className="absolute inset-0 flex items-center justify-center font-display text-ivory text-[clamp(0.9rem,2vw,1.5rem)] pointer-events-none">
          33⅓
        </span>
      </div>

      <div className="ring-wear" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(107,68,40,0.45)]" />
    </div>
  );
}

function Vinyl() {
  return (
    <div data-vinyl className="absolute inset-[2%] z-0">
      <div data-disc className="vinyl relative w-full h-full">
        {/* centre label */}
        <div className="absolute inset-[33%] rounded-full bg-burgundy flex flex-col items-center justify-center text-center shadow-[inset_0_0_0_3px_rgba(211,160,51,0.7)]">
          <span lang="km" className="font-khmer text-mustard text-[clamp(0.55rem,1.2vw,0.95rem)] leading-tight">{artist.km}</span>
          <span className="font-display text-ivory text-[clamp(0.6rem,1.3vw,1rem)] leading-tight mt-0.5">{artist.name}</span>
          <span className="w-[10%] aspect-square rounded-full bg-ivory my-[6%]" />
          <span className="font-mono text-mustard text-[clamp(5px,0.7vw,8px)] tracking-[0.2em]">SIDE A · MH-2026</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const vinyl = root.current?.querySelector("[data-vinyl]");
      const disc = root.current?.querySelector("[data-disc]");
      const sleeve = root.current?.querySelector("[data-sleeve]");
      if (!vinyl || !disc || !sleeve) return;

      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)", reduce: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
          const out = desktop ? { xPercent: 52, yPercent: 0 } : { xPercent: 0, yPercent: 40 };

          if (reduce) {
            gsap.set(vinyl, out);
            return;
          }

          // Pull the record out of the sleeve, then set it spinning at 33⅓ rpm.
          const spin = gsap.to(disc, { rotation: 360, duration: 1.8, ease: "none", repeat: -1 });
          gsap.timeline()
            .from(sleeve, { y: 40, rotate: -3, opacity: 0, duration: 1, ease: "power3.out" })
            .fromTo(vinyl, { xPercent: 0, yPercent: 0 }, { ...out, duration: 1.4, ease: "power3.inOut" }, "-=0.3");

          // Scroll away: the record slides back into its sleeve.
          gsap.to(vinyl, {
            xPercent: desktop ? 18 : 0,
            yPercent: desktop ? 0 : 12,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          });

          // Faster scrolling, faster platter.
          const off = onVelocity((v) => {
            gsap.to(spin, { timeScale: 1 + Math.min(6, Math.abs(v) * 0.12), duration: 0.25, overwrite: true });
          });
          return () => {
            off();
            spin.kill();
          };
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden pt-8 sm:pt-12 pb-24" aria-label="Side A">
      <div className="page flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-tobacco mb-10 sm:mb-14">
        <span>MENG HENG RECORDS</span>
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hidden sm:inline">
            {artist.location.toUpperCase()} · <span lang="km" className="font-khmer tracking-normal">{km.city}</span>
          </span>
          <MusicToggle />
        </div>
      </div>

      <div className="page grid lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-14 lg:gap-12 items-center">
        {/* Sleeve + record */}
        <div className="relative w-full max-w-[460px] mx-auto lg:mx-0 lg:max-w-none lg:w-[66%] pb-[40%] lg:pb-0">
          <div className="relative">
            <Vinyl />
            <Sleeve />
          </div>
        </div>

        {/* Back-cover running order + meters */}
        <div className="min-w-0 lg:pl-4">
          <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-tobacco mb-6">
            <span className="w-2 h-2 rounded-full bg-vu shadow-[0_0_8px_var(--color-vu)] animate-pulse" />
            NOW PLAYING · {artist.role.toUpperCase()}
          </p>
          {SIDES.map(({ side, km: sideKm, rows }) => (
            <div key={side} className="mb-7">
              <p className="flex items-baseline gap-3 border-b-2 border-tobacco-deep pb-1.5 mb-2">
                <span className="album text-2xl text-burgundy">{side}</span>
                <span lang="km" className="font-khmer text-sm text-tobacco">{sideKm}</span>
              </p>
              <ol>
                {rows.map((r) => (
                  <li key={r.no}>
                    <button
                      type="button"
                      onClick={() => scrollToId(r.id)}
                      className="group w-full flex items-baseline gap-3 py-1.5 text-left"
                    >
                      <span className="font-mono text-xs text-tobacco tabular w-6">{r.no}</span>
                      <span className="text-lg text-tobacco-deep group-hover:text-burgundy transition-colors">{r.title}</span>
                      <span className="flex-1 border-b border-dotted border-tobacco/40 translate-y-[-4px]" />
                      <span className="font-mono text-[10px] text-tobacco/70 group-hover:text-vu transition-colors">▶</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3 mt-8 max-w-[380px]">
            <VuMeter channel="L" />
            <VuMeter channel="R" seed={1.7} />
          </div>
        </div>
      </div>
    </section>
  );
}

