"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

// ---------- Scroll velocity feed (Lenis velocity, or native scroll delta) ----------
type VelocityListener = (velocity: number, progress: number) => void;
const listeners = new Set<VelocityListener>();

export function emitVelocity(velocity: number, progress: number) {
  listeners.forEach((l) => l(velocity, progress));
}

export function onVelocity(listener: VelocityListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// ---------- Lenis instance ----------
let lenis: Lenis | null = null;
export const setLenis = (instance: Lenis | null) => { lenis = instance; };

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView({ behavior: "auto" });
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
