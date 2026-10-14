"use client";

import { useEffect, useRef, useState } from "react";
import { music } from "@/lib/data";

/** Header switch that plays the tracks listed in `music` (lib/data.ts) on a loop. */
export function MusicToggle() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const index = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState(music[0]?.title ?? "");

  useEffect(() => {
    const el = new Audio();
    el.preload = "none";
    el.volume = 0.6;
    // next track when one ends, back to the first after the last
    el.addEventListener("ended", () => {
      index.current = (index.current + 1) % music.length;
      el.src = music[index.current].src;
      setTitle(music[index.current].title);
      void el.play();
    });
    audio.current = el;
    return () => {
      el.pause();
      audio.current = null;
    };
  }, []);

  if (music.length === 0) return null;

  const toggle = async () => {
    const el = audio.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }
    if (!el.src) el.src = music[index.current].src;
    try {
      await el.play();
      setPlaying(true);
    } catch {
      // missing file or the browser blocked playback
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Turn music off" : "Turn music on"}
      title={playing ? `Now playing: ${title}` : "Play music"}
      className="flex items-center gap-2 rounded-full border border-tobacco/40 px-3 py-1.5 text-tobacco-deep hover:border-tobacco-deep transition-colors"
    >
      <span
        className={`w-2 h-2 rounded-full transition-colors ${playing ? "bg-vu shadow-[0_0_8px_var(--color-vu)]" : "bg-tobacco/25"}`}
        aria-hidden="true"
      />
      <span>MUSIC {playing ? "ON" : "OFF"}</span>
    </button>
  );
}
