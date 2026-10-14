"use client";

import { useRef } from "react";
import { km, tracks, type Track } from "@/lib/data";
import { SectionTitle } from "@/components/SectionTitle";
import { gsap, onVelocity, useGSAP } from "@/lib/motion";

function trackNo(t: Track) {
  const sameSide = tracks.filter((x) => x.side === t.side);
  return `${t.side}${sameSide.indexOf(t) + 1}`;
}

function Links({ t, light = false }: { t: Track; light?: boolean }) {
  const cls = `group inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors ${
    light ? "text-ivory hover:text-mustard" : "text-burgundy hover:text-vu"
  }`;
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      <a href={t.source} target="_blank" rel="noopener noreferrer" className={cls}>
        <span aria-hidden="true">▶</span> Hear the source
      </a>
      {t.demo && (
        <a href={t.demo} target="_blank" rel="noopener noreferrer" className={cls}>
          <span aria-hidden="true">◉</span> Live
        </a>
      )}
    </div>
  );
}

/** Side A: a 7" picture sleeve with the record peeking out, notes alongside. */
function Single({ t }: { t: Track }) {
  return (
    <article data-card className="shrink-0 w-full lg:w-[720px] grid sm:grid-cols-[minmax(0,300px)_minmax(0,1fr)] gap-6 sm:gap-8 items-center">
      <div className="relative pt-[14%]">
        {/* the single, half out of its sleeve */}
        <div className="vinyl absolute top-0 left-[12%] w-[76%] aspect-square" aria-hidden="true">
          <div className="absolute inset-[34%] rounded-full bg-mustard" />
        </div>
        <div className="relative aspect-square overflow-hidden shadow-[0_24px_40px_-20px_rgba(47,31,19,0.7)] bg-burgundy">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.imageSrc} alt={`${t.title} screenshot`} loading="lazy" className="absolute inset-0 w-full h-full object-cover faded" />
          <div className="photo-burn" />
          <div className="absolute inset-x-0 bottom-0 bg-burgundy/95 px-4 py-3">
            <p className="album text-ivory text-3xl">{t.title}</p>
          </div>
          <span className="absolute top-3 left-3 w-12 h-12 rounded-full bg-mustard text-tobacco-deep flex items-center justify-center font-display text-lg shadow">
            {trackNo(t)}
          </span>
          <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(47,31,19,0.55)] pointer-events-none" />
        </div>
      </div>

      <div className="min-w-0">
        <p className="flex items-baseline gap-4">
          <span className="album text-6xl text-mustard">{trackNo(t)}</span>
          <span className="font-mono text-sm text-tobacco tabular">{t.year} · {t.runtime}</span>
        </p>
        <h3 className="album text-4xl text-tobacco-deep mt-2">{t.title}</h3>
        <p className="mt-4 leading-relaxed text-tobacco-deep max-w-[46ch]">{t.description}</p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-tobacco mt-5 mb-2">INSTRUMENTS</p>
        <ul className="flex flex-wrap gap-2 mb-6">
          {t.instruments.map((i) => (
            <li key={i} className="dymo dymo-teal">{i}</li>
          ))}
        </ul>
        <Links t={t} />
      </div>
    </article>
  );
}

/** Side B: a cassette J-card. */
function JCard({ t }: { t: Track }) {
  return (
    <article data-card className="shrink-0 w-full lg:w-[340px] flex bg-ivory shadow-[0_24px_40px_-22px_rgba(47,31,19,0.7)]">
      {/* spine */}
      <div className="w-11 shrink-0 bg-teal text-ivory flex items-center justify-center">
        <span className="font-mono text-[11px] tracking-[0.25em] whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
          {trackNo(t)} · {t.title.toUpperCase()} · {t.year}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.imageSrc} alt={`${t.title} screenshot`} loading="lazy" className="absolute inset-0 w-full h-full object-cover faded" />
          <div className="photo-burn" />
        </div>
        <div className="h-1.5 bg-mustard" />
        <div className="h-1 bg-needle" />
        <div className="p-4 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_23px,rgba(107,68,40,0.18)_23px,rgba(107,68,40,0.18)_24px)]">
          <p className="flex items-baseline justify-between gap-3">
            <span className="album text-2xl text-tobacco-deep">{t.title}</span>
            <span className="font-mono text-xs text-tobacco tabular">{t.runtime}</span>
          </p>
          <p className="text-sm leading-[24px] text-tobacco-deep mt-1">{t.description}</p>
          <p className="font-mono text-[10px] tracking-[0.16em] text-tobacco mt-2 leading-[24px]">
            FEAT. {t.instruments.join(" · ").toUpperCase()}
          </p>
          <div className="mt-3">
            <Links t={t} />
          </div>
        </div>
      </div>
    </article>
  );
}

function SideMarker({ side, kmText }: { side: "A" | "B"; kmText: string }) {
  return (
    <div className="shrink-0 flex lg:flex-col items-center lg:items-start gap-3 lg:w-28" aria-hidden="true">
      <span className="album text-[5rem] lg:text-[8rem] leading-none text-burgundy">{side}</span>
      <span>
        <span className="block font-mono text-[10px] tracking-[0.25em] text-tobacco">SIDE {side}</span>
        <span lang="km" className="block font-khmer text-sm text-tobacco">{kmText}</span>
      </span>
    </div>
  );
}

export function Tracklist() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const pin = root.current?.querySelector<HTMLElement>("[data-pin]");
      const row = root.current?.querySelector<HTMLElement>("[data-row]");
      if (!pin || !row) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => row.scrollWidth - window.innerWidth + 48;
        gsap.to(row, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "center center",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Tape flutter: cards lean with the speed of the scroll.
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]", row);
        const skew = cards.map((c) => gsap.quickTo(c, "skewX", { duration: 0.4, ease: "power3.out" }));
        const off = onVelocity((v) => {
          const s = gsap.utils.clamp(-7, 7, -v * 0.25);
          skew.forEach((q) => q(s));
        });
        return off;
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const sideA = tracks.filter((t) => t.side === "A");
  const sideB = tracks.filter((t) => t.side === "B");

  return (
    <section id="work" ref={root} className="relative py-24 sm:py-32 overflow-hidden" aria-labelledby="tracklist-title">
      <div className="page" id="tracklist-title">
        <SectionTitle kicker="A2 · Rec" title="Tracklist" km={km.tracks}>
          {tracks.length} tracks. Side A is the backend work I&apos;d play you first. Side B is the rest of the session.
        </SectionTitle>
      </div>

      <div data-pin className="lg:motion-safe:h-[80vh] lg:motion-safe:flex lg:motion-safe:items-center">
        <div
          data-row
          className="flex flex-col lg:motion-safe:flex-row lg:motion-safe:items-center gap-14 lg:gap-20 px-[clamp(1rem,5vw,3rem)] lg:pl-[max(3rem,calc((100vw-1240px)/2+3rem))] lg:motion-safe:w-max"
        >
          <SideMarker side="A" kmText={km.sideA} />
          {sideA.map((t) => <Single key={t.id} t={t} />)}
          <SideMarker side="B" kmText={km.sideB} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 lg:motion-safe:flex gap-10 lg:gap-12 items-start lg:motion-safe:items-center">
            {sideB.map((t) => <JCard key={t.id} t={t} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
