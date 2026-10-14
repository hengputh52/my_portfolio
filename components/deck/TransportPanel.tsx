"use client";

import { useRef, useState } from "react";
import { gsap, onVelocity, prefersReducedMotion, scrollToId, ScrollTrigger, useGSAP } from "@/lib/motion";
import { startCrackle, stopCrackle } from "@/lib/crackle";
import { Reel } from "@/components/deck/Reel";

const KEYS = [
  { id: "about",   key: "PLAY", label: "About",   glyph: "play" },
  { id: "work",    key: "REC",  label: "Work",    glyph: "rec" },
  { id: "archive", key: "RWD",  label: "Archive", glyph: "rwd" },
  { id: "contact", key: "STOP", label: "Contact", glyph: "stop" },
] as const;

/** Which transport key lights up for each section on the page. */
const SECTION_TO_KEY: Record<string, string> = {
  about: "about",
  work: "work",
  gear: "work",
  archive: "archive",
  contact: "contact",
};

function Glyph({ name }: { name: (typeof KEYS)[number]["glyph"] }) {
  const common = "w-3 h-3 sm:w-3.5 sm:h-3.5";
  if (name === "play") return <svg viewBox="0 0 12 12" className={common}><path d="M2 1 L11 6 L2 11 Z" fill="currentColor" /></svg>;
  if (name === "rec") return <svg viewBox="0 0 12 12" className={common}><circle cx="6" cy="6" r="5" fill="var(--color-needle)" /></svg>;
  if (name === "rwd") return <svg viewBox="0 0 14 12" className={common}><path d="M7 1 L1 6 L7 11 Z M13 1 L7 6 L13 11 Z" fill="currentColor" /></svg>;
  return <svg viewBox="0 0 12 12" className={common}><rect x="1.5" y="1.5" width="9" height="9" fill="currentColor" /></svg>;
}

export function TransportPanel() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [crackle, setCrackle] = useState(false);

  useGSAP(
    () => {
      // Light the key for whichever section is in the middle of the screen.
      Object.keys(SECTION_TO_KEY).forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) setActive(SECTION_TO_KEY[id]);
            else if (id === "about" && self.direction < 0) setActive(null);
          },
        });
      });

      const counter = root.current?.querySelector<HTMLElement>("[data-counter]");
      const spins = gsap.utils.toArray<SVGGElement>("[data-spin]", root.current);
      const tapes = gsap.utils.toArray<SVGCircleElement>("[data-tape]", root.current);

      let speed = 0;
      let angle = 0;
      const off = onVelocity((v, progress) => {
        speed = v;
        if (counter) counter.textContent = String(Math.round(progress * 9999)).padStart(4, "0");
        // tape moves from the left spool to the right one as you scroll
        if (tapes[0]) tapes[0].setAttribute("r", String(40 - progress * 22));
        if (tapes[1]) tapes[1].setAttribute("r", String(18 + progress * 22));
      });

      if (prefersReducedMotion()) return off;

      const tick = (_t: number, dt: number) => {
        angle += (0.12 + speed * 0.06) * dt;
        speed *= 0.9;
        spins.forEach((s) => gsap.set(s, { rotation: angle }));
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        off();
      };
    },
    { scope: root },
  );

  const toggleCrackle = () => {
    if (crackle) stopCrackle();
    else startCrackle();
    setCrackle(!crackle);
  };

  return (
    <div
      ref={root}
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pointer-events-none"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
    >
      <nav
        aria-label="Sections"
        className="pointer-events-auto flex items-stretch gap-2 sm:gap-3 rounded-xl p-2 sm:p-2.5 bg-teal-deep text-ivory shadow-[0_18px_40px_-14px_rgba(19,58,55,0.75),inset_0_1px_0_rgba(255,255,255,0.12)] border border-black/30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px), linear-gradient(180deg, var(--color-teal), var(--color-teal-deep))",
        }}
      >
        {/* Reels + tape counter */}
        <div className="hidden md:flex items-center gap-2 pr-3 mr-1 border-r border-black/30">
          <Reel tape={40} className="w-11 h-11" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-[8px] tracking-[0.2em] text-ivory/50">COUNT</span>
            <span data-counter className="font-mono text-sm tabular bg-[#120D09] text-mustard px-1.5 py-0.5 rounded-sm tracking-[0.2em]">
              0000
            </span>
          </div>
          <Reel tape={18} className="w-11 h-11" />
        </div>

        {/* Transport keys */}
        <ul className="flex gap-1.5 sm:gap-2">
          {KEYS.map((k) => {
            const isOn = active === k.id;
            return (
              <li key={k.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(k.id)}
                  aria-current={isOn ? "true" : undefined}
                  className={`group relative flex flex-col items-center justify-center gap-1 w-[3.7rem] min-[400px]:w-[4.1rem] sm:w-[4.6rem] h-14 rounded-md transition-all duration-150 ${
                    isOn
                      ? "translate-y-[2px] bg-[#E9DDC1] shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)]"
                      : "bg-ivory shadow-[0_3px_0_#8D7C5C,0_4px_8px_rgba(0,0,0,0.3)] hover:translate-y-[1px] hover:shadow-[0_2px_0_#8D7C5C,0_3px_6px_rgba(0,0,0,0.3)]"
                  } text-tobacco-deep`}
                >
                  <span
                    className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${isOn ? "bg-vu shadow-[0_0_6px_var(--color-vu)]" : "bg-tobacco/25"}`}
                    aria-hidden="true"
                  />
                  <span className="flex items-center gap-1">
                    <Glyph name={k.glyph} />
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.1em]">{k.key}</span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-tobacco">{k.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Crackle toggle */}
        <button
          type="button"
          onClick={toggleCrackle}
          aria-pressed={crackle}
          aria-label={crackle ? "Turn vinyl crackle off" : "Turn vinyl crackle on"}
          className="flex flex-col items-center justify-center gap-1 w-12 sm:w-16 pl-1 sm:pl-3 sm:border-l border-black/30"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full transition-colors ${crackle ? "bg-vu shadow-[0_0_8px_var(--color-vu)]" : "bg-[#120D09] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"}`}
            aria-hidden="true"
          />
          <span className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.14em] text-ivory/80 leading-tight text-center">
            CRACKLE
            <br />
            {crackle ? "ON" : "OFF"}
          </span>
        </button>
      </nav>
    </div>
  );
}
