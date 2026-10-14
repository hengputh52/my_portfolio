"use client";

import { useRef } from "react";
import { gear, km, tracks } from "@/lib/data";
import { SectionTitle } from "@/components/SectionTitle";
import { GearArt } from "@/components/gear/GearArt";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

/** Which tracks a tool played on, read from the tracklist. */
function playedOn(tool: string) {
  const names = tool.split(/\s*&\s*/);
  return tracks.filter((t) => t.instruments.some((i) => names.includes(i))).map((t) => t.title);
}

export function StudioGear() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-gear]", root.current);
      gsap.from(items, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: { each: 0.07, grid: "auto", from: "start" },
        scrollTrigger: { trigger: items[0], start: "top 85%", once: true },
      });

      // Hover: the gear "powers on" with a small wobble, like a valve warming up.
      const cleanups = items.map((el) => {
        const art = el.querySelector("svg");
        const enter = () => gsap.fromTo(art, { rotate: -3 }, { rotate: 0, duration: 0.9, ease: "elastic.out(1.2, 0.3)" });
        el.addEventListener("mouseenter", enter);
        return () => el.removeEventListener("mouseenter", enter);
      });
      return () => cleanups.forEach((c) => c());
    },
    { scope: root },
  );

  return (
    <section id="gear" ref={root} className="relative py-24 sm:py-32 bg-teal-deep text-ivory" aria-labelledby="gear-title">
      <div className="page">
        <div id="gear-title">
          <SectionTitle kicker="B1 · Studio" title="Studio Gear" km={km.gear} light>
            The equipment list from the session sheet. Every tool is a piece of gear, and each one has a job in the room.
          </SectionTitle>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/25 border border-black/25">
          {gear.map((g) => {
            const used = playedOn(g.tool);
            return (
              <li key={g.tool} data-gear className="group bg-teal-deep hover:bg-teal transition-colors duration-300 p-6 sm:p-8 flex flex-col">
                <div className="rounded-sm bg-paper/95 p-4 mb-6">
                  <GearArt name={g.art} className="w-full h-auto max-h-36 origin-bottom" />
                </div>
                <span className="dymo dymo-black self-start">{g.model}</span>
                <h3 className="album text-3xl text-ivory mt-3">{g.tool}</h3>
                <p className="text-ivory/75 leading-relaxed mt-2">{g.caption}</p>
                {used.length > 0 && (
                  <p className="font-mono text-[10px] tracking-[0.16em] text-mustard mt-auto pt-5">
                    PLAYED ON · {used.join(", ").toUpperCase()}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
