import Noise from "@/components/Noise";
import { SmoothScroll } from "@/components/SmoothScroll";
import { TransportPanel } from "@/components/deck/TransportPanel";
import { EqBars, SideFlip, TapeSplice, TapeTicker } from "@/components/Dividers";
import { Hero } from "@/components/sections/Hero";
import { LinerNotes } from "@/components/sections/LinerNotes";
import { Tracklist } from "@/components/sections/Tracklist";
import { StudioGear } from "@/components/sections/StudioGear";
import { Archive } from "@/components/sections/Archive";
import { FanMail } from "@/components/sections/FanMail";
import { artist, km } from "@/lib/data";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      {/* tape hiss */}
      <Noise fixed opacity={0.07} blendMode="multiply" fps={14} dust={0.04} zIndex={40} />

      <main>
        <Hero />
        <TapeTicker text={`Side A ✦ ${artist.album} ✦ ${km.sideA} ✦ ${artist.catalog} ✦`} />
        <LinerNotes />
        <EqBars />
        <Tracklist />
        <SideFlip />
        <StudioGear />
        <TapeSplice />
        <Archive />
        <TapeTicker reverse text={`Side B ✦ Fan Mail ✦ ${km.fanMail} ✦ Write in any time ✦`} />
        <FanMail />
      </main>

      {/* run-out groove */}
      <footer
        className="bg-[#151010] text-ivory/70 pt-10 pb-32"
        style={{ backgroundImage: "repeating-radial-gradient(circle at 50% -400%, #151010 0 2px, #1F1918 2px 4px)" }}
      >
        <div className="page flex flex-col sm:flex-row gap-3 justify-between font-mono text-[10px] tracking-[0.22em]">
          <span>MH-2026-A ✦ CUT IN PHNOM PENH ✦ ℗ 2026 {artist.name.toUpperCase()}</span>
          <span>INSPIRED BY THE GOLDEN AGE OF KHMER MUSIC, 1950s–1970s</span>
        </div>
      </footer>

      <TransportPanel />
    </>
  );
}
