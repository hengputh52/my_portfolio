"use client";

import { useRef } from "react";
import { gsap, onVelocity, prefersReducedMotion, useGSAP } from "@/lib/motion";

// VU scale: value → needle angle (degrees from vertical)
const SCALE: [string, number][] = [
  ["20", -50], ["10", -34], ["7", -25], ["5", -17], ["3", -8],
  ["2", -3], ["1", 2], ["0", 9], ["1", 20], ["2", 33], ["3", 46],
];
const PIVOT = { x: 100, y: 122 };
const R = 86;

const polar = (deg: number, r: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: PIVOT.x + r * Math.cos(rad), y: PIVOT.y + r * Math.sin(rad) };
};

const arc = (from: number, to: number, r: number) => {
  const a = polar(from, r);
  const b = polar(to, r);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`;
};

/**
 * Analogue VU meter. The needle rides on scroll speed, idles like music is
 * playing, and swings into the red when you hover it.
 */
export function VuMeter({ channel, seed = 0 }: { channel: "L" | "R"; seed?: number }) {
  const root = useRef<HTMLDivElement>(null);
  const needle = useRef<SVGGElement>(null);
  const hover = useRef(false);

  useGSAP(
    () => {
      if (!needle.current) return;
      const setAngle = gsap.quickSetter(needle.current, "rotation", "deg") as (v: number) => void;
      gsap.set(needle.current, { svgOrigin: `${PIVOT.x} ${PIVOT.y}` });

      if (prefersReducedMotion()) {
        setAngle(-46);
        return;
      }

      let speed = 0;
      let level = 0;
      const off = onVelocity((v) => {
        speed = Math.max(speed, Math.min(1, Math.abs(v) / 30));
      });

      const tick = (time: number) => {
        const t = time + seed;
        // a quiet "programme" signal so the meter breathes like a track is playing
        const music = 0.2 + 0.1 * Math.sin(t * 6.3) + 0.07 * Math.sin(t * 11.7) + Math.random() * 0.05;
        const target = Math.min(1.04, music + speed * 0.75 + (hover.current ? 0.55 : 0));
        // fast attack, slower release, like a real ballistic
        level += (target - level) * (target > level ? 0.35 : 0.08);
        speed *= 0.93;
        setAngle(-50 + level * 96);
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
    <div
      ref={root}
      className="relative rounded-md bg-[#2A1C11] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_-12px_rgba(47,31,19,0.6)]"
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
    >
      <svg viewBox="0 0 200 140" className="block w-full h-auto rounded-sm" role="img" aria-label={`VU meter, ${channel} channel`}>
        <defs>
          <radialGradient id={`vu-glow-${channel}`} cx="50%" cy="75%" r="75%">
            <stop offset="0%" stopColor="#FBE9B4" />
            <stop offset="100%" stopColor="#E3C27A" />
          </radialGradient>
        </defs>
        <rect width="200" height="140" fill={`url(#vu-glow-${channel})`} />

        {/* scale */}
        <path d={arc(-50, 9, R)} fill="none" stroke="#2F1F13" strokeWidth="1.4" />
        <path d={arc(9, 46, R)} fill="none" stroke="#C3332A" strokeWidth="4.5" />
        {SCALE.map(([label, deg], i) => {
          const a = polar(deg, R - 1);
          const b = polar(deg, R + 7);
          const t = polar(deg, R + 16);
          const red = deg >= 9;
          return (
            <g key={i}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={red ? "#C3332A" : "#2F1F13"} strokeWidth="1.3" />
              {i % 2 === 0 || red ? (
                <text x={t.x} y={t.y + 3} textAnchor="middle" fontSize="9" fill={red ? "#C3332A" : "#2F1F13"} className="font-mono">
                  {red && label !== "0" ? `+${label}` : label}
                </text>
              ) : null}
            </g>
          );
        })}
        <text x="100" y="88" textAnchor="middle" fontSize="20" fill="#2F1F13" className="font-display">VU</text>
        <text x="12" y="132" fontSize="9" fill="#6B4428" className="font-mono">{channel}</text>
        <text x="188" y="132" fontSize="8" textAnchor="end" fill="#6B4428" className="font-mono">−  +</text>

        {/* needle */}
        <g ref={needle}>
          <line x1={PIVOT.x} y1={PIVOT.y} x2={PIVOT.x} y2={PIVOT.y - R - 6} stroke="#1A120B" strokeWidth="1.6" strokeLinecap="round" />
        </g>
        <rect x="70" y="118" width="60" height="22" fill="#2A1C11" />
        <circle cx={PIVOT.x} cy={PIVOT.y} r="6" fill="#1A120B" />
      </svg>
    </div>
  );
}
