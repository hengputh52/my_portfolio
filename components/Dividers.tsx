"use client";

import { useRef } from "react";
import ScrollVelocity from "@/components/ScrollVelocity";
import { gsap, onVelocity, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { Reel } from "@/components/deck/Reel";

/** A strip of tape-reel beige with a printed label that runs with your scroll. */
export function TapeTicker({ text, reverse = false }: { text: string; reverse?: boolean }) {
  return (
    <div
      className="relative bg-tape border-y-[3px] border-tobacco-deep py-2.5 text-tobacco-deep overflow-hidden"
      aria-hidden="true"
    >
      <ScrollVelocity
        texts={[<span key="t" className="px-4">{text}</span>]}
        velocity={reverse ? -38 : 38}
        numCopies={6}
        className="font-mono"
        scrollerClassName="text-sm! md:text-base! leading-none! font-mono! font-semibold! tracking-[0.18em]! drop-shadow-none! uppercase"
      />
    </div>
  );
}

/** Graphic-equaliser bars that bounce with scroll speed. */
export function EqBars({ bars = 48 }: { bars?: number }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-bar]", root.current);
      if (prefersReducedMotion()) {
        els.forEach((el, i) => gsap.set(el, { scaleY: 0.25 + 0.5 * Math.abs(Math.sin(i * 0.6)) }));
        return;
      }
      let energy = 0;
      const off = onVelocity((v) => { energy = Math.max(energy, Math.min(1, Math.abs(v) / 25)); });
      const tick = (t: number) => {
        els.forEach((el, i) => {
          const base = 0.18 + 0.22 * Math.abs(Math.sin(t * 2.1 + i * 0.55)) + 0.12 * Math.abs(Math.sin(t * 5.3 + i * 1.7));
          gsap.set(el, { scaleY: Math.min(1, base + energy * (0.4 + 0.3 * Math.sin(i + t * 9))) });
        });
        energy *= 0.94;
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        off();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="page py-10" aria-hidden="true">
      <div className="flex items-end justify-between gap-[3px] h-16">
        {Array.from({ length: bars }, (_, i) => (
          <span
            key={i}
            data-bar
            className="flex-1 h-full origin-bottom rounded-t-[1px]"
            style={{
              background: "linear-gradient(to top, var(--color-teal) 0%, var(--color-teal) 55%, var(--color-mustard) 55%, var(--color-mustard) 80%, var(--color-needle) 80%)",
              transform: "scaleY(0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Two spools with tape running between them, marking the turn from side A to side B. */
export function SideFlip() {
  return (
    <div className="page py-16 sm:py-20" role="separator" aria-label="Side B">
      <div className="flex items-center gap-3 sm:gap-6">
        <Reel tape={22} className="w-16 h-16 sm:w-24 sm:h-24 shrink-0 animate-[spin_7s_linear_infinite] motion-reduce:animate-none" />
        <div className="flex-1 relative h-10 flex items-center">
          <div className="w-full h-[5px] bg-[#3A2416] rounded-full" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-ivory px-3 sm:px-5 text-center">
            <span className="block font-mono text-[10px] sm:text-xs tracking-[0.3em] text-tobacco">TURN THE RECORD OVER</span>
            <span className="block album text-3xl sm:text-5xl text-burgundy mt-1">Side B</span>
          </span>
        </div>
        <Reel tape={38} className="w-16 h-16 sm:w-24 sm:h-24 shrink-0 animate-[spin_7s_linear_infinite] motion-reduce:animate-none" />
      </div>
    </div>
  );
}

/** Two lengths of tape cut on the diagonal and joined with splicing tape. */
export function TapeSplice() {
  return (
    <div className="page py-12" aria-hidden="true">
      <div className="relative h-7">
        <div className="absolute inset-y-1 left-0 right-1/2 bg-[#3A2416] [clip-path:polygon(0_0,100%_0,calc(100%-14px)_100%,0_100%)]" />
        <div className="absolute inset-y-1 left-1/2 right-0 bg-[#4A2F1C] [clip-path:polygon(0_0,100%_0,100%_100%,-14px_100%)] -ml-[14px]" />
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-14 bg-ivory/90 border border-tape shadow-sm rotate-[-1deg]" />
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] text-tobacco">EDIT</span>
      </div>
    </div>
  );
}
