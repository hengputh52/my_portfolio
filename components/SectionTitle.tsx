"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

/**
 * Section heading with a tape-flutter entrance: the title wobbles in like a
 * reel coming up to speed (pitch wow and flutter, drawn as a skew and blur).
 */
export function SectionTitle({
  kicker,
  title,
  km,
  light = false,
  children,
}: {
  kicker: string;
  title: string;
  km: string;
  light?: boolean;
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const title = root.current?.querySelector("[data-flutter]");
      gsap.from(title ?? [], {
        skewX: 14,
        x: -24,
        opacity: 0,
        filter: "blur(6px)",
        duration: 1.3,
        ease: "elastic.out(1, 0.35)",
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
      gsap.from(root.current?.querySelectorAll("[data-fade]") ?? [], {
        y: 14,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mb-12 sm:mb-16">
      <div data-fade className="flex flex-wrap items-center gap-3 mb-5">
        <span className={light ? "dymo dymo-black" : "dymo"}>{kicker}</span>
        <span lang="km" className={`font-khmer text-lg ${light ? "text-mustard" : "text-burgundy"}`}>{km}</span>
      </div>
      <h2
        data-flutter
        className={`album text-[clamp(3rem,9vw,7rem)] origin-left ${light ? "text-ivory" : "text-tobacco-deep"}`}
      >
        {title}
      </h2>
      {children && (
        <div data-fade className={`mt-5 max-w-[60ch] text-lg leading-relaxed ${light ? "text-ivory/80" : "text-tobacco"}`}>
          {children}
        </div>
      )}
    </div>
  );
}
