"use client";

import { useRef } from "react";
import { km, sessions } from "@/lib/data";
import { SectionTitle } from "@/components/SectionTitle";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

const TILTS = [-3, 2, -1.5, 3];

/** Session photos, printed and kept in a shoebox: faded, warm, a little crooked. */
export function Archive() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const prints = gsap.utils.toArray<HTMLElement>("[data-print]", root.current);
      prints.forEach((p, i) => {
        gsap.from(p, {
          y: 60,
          rotate: TILTS[i % TILTS.length] * 3,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: p, start: "top 90%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="archive" ref={root} className="relative py-24 sm:py-32" aria-labelledby="archive-title">
      <div className="page">
        <div id="archive-title">
          <SectionTitle kicker="B2 · Rewind" title="From the Archive" km={km.archive}>
            Session photos. Away from the keyboard I work behind the camera, volunteering on media teams for events around Phnom Penh.
          </SectionTitle>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {sessions.map((s, i) => (
            <li key={s.id} data-print style={{ rotate: `${TILTS[i % TILTS.length]}deg` }} className="hover:rotate-0! transition-[rotate] duration-500">
              <figure className="bg-[#FBF7EC] p-3 pb-0 shadow-[0_18px_30px_-16px_rgba(47,31,19,0.6)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.imageSrc} alt={`${s.where}: ${s.what}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover faded" />
                  <div className="photo-burn" />
                </div>
                <figcaption className="py-3">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-tobacco">{s.date.toUpperCase()}</p>
                  <p className="font-display text-xl text-tobacco-deep leading-tight mt-1">{s.where}</p>
                  <p className="text-sm text-tobacco mt-1">{s.what}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
