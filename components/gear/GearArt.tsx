import type { GearArt as GearArtName } from "@/lib/data";

/**
 * Era studio equipment, drawn flat like a 1960s hi-fi catalogue.
 * All share a 160×120 canvas so cards line up.
 */

const C = {
  ink: "#2F1F13",
  tobacco: "#6B4428",
  teal: "#1E5753",
  tealDeep: "#133A37",
  mustard: "#D3A033",
  burgundy: "#6E1E29",
  needle: "#C3332A",
  ivory: "#F5EEDD",
  tape: "#D5C098",
  chrome: "#CFC4AE",
  tapeBrown: "#3A2416",
};

function Spool({ cx, cy, r, tape }: { cx: number; cy: number; r: number; tape: number }) {
  return (
    <g data-wiggle-spin style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "view-box" }}>
      <circle cx={cx} cy={cy} r={tape} fill={C.tapeBrown} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.chrome} strokeWidth="2.5" />
      {[0, 120, 240].map((d) => (
        <path key={d} d={`M${cx - 3} ${cy - 6} L${cx - 2.5} ${cy - r + 3} L${cx + 2.5} ${cy - r + 3} L${cx + 3} ${cy - 6} Z`} fill={C.chrome} transform={`rotate(${d} ${cx} ${cy})`} />
      ))}
      <circle cx={cx} cy={cy} r="6" fill={C.chrome} />
      <circle cx={cx} cy={cy} r="2" fill={C.ink} />
    </g>
  );
}

const ART: Record<GearArtName, React.ReactNode> = {
  // Reel-to-reel deck
  reel: (
    <>
      <rect x="18" y="8" width="124" height="104" rx="6" fill={C.teal} />
      <rect x="22" y="12" width="116" height="96" rx="4" fill="none" stroke={C.tealDeep} strokeWidth="1.5" />
      <Spool cx={50} cy={42} r={24} tape={20} />
      <Spool cx={110} cy={42} r={24} tape={12} />
      <path d="M30 42 L44 82 L116 82 L130 42" fill="none" stroke={C.tapeBrown} strokeWidth="1.6" />
      <rect x="66" y="76" width="28" height="12" rx="2" fill={C.chrome} />
      {[34, 50, 66, 82, 98, 114].map((x, i) => (
        <rect key={x} x={x} y="96" width="12" height="7" rx="1.5" fill={i === 1 ? C.needle : C.ivory} />
      ))}
    </>
  ),
  // Tube amplifier
  amp: (
    <>
      <rect x="14" y="30" width="132" height="76" rx="8" fill={C.tobacco} />
      <rect x="20" y="36" width="120" height="48" rx="4" fill={C.tape} />
      <g opacity="0.45">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={26 + i * 11} y1="40" x2={26 + i * 11} y2="80" stroke={C.tobacco} strokeWidth="1.2" />
        ))}
      </g>
      <rect x="20" y="88" width="120" height="13" rx="2" fill={C.ink} />
      {[34, 56, 78, 100, 122].map((x) => (
        <g key={x}>
          <circle cx={x} cy="94.5" r="4.5" fill={C.chrome} />
          <line x1={x} y1="94.5" x2={x} y2="91" stroke={C.ink} strokeWidth="1.2" />
        </g>
      ))}
      <rect x="54" y="8" width="52" height="20" rx="3" fill="none" stroke={C.ink} strokeWidth="2" />
      {[64, 80, 96].map((x) => (
        <ellipse key={x} cx={x} cy="18" rx="5" ry="8" fill={C.mustard} opacity="0.85" />
      ))}
      <rect x="62" y="40" width="36" height="9" rx="1.5" fill={C.ivory} />
      <text x="80" y="47" textAnchor="middle" fontSize="6.5" fill={C.tobacco} fontFamily="monospace" fontWeight="700">VALVE 30</text>
    </>
  ),
  // Mixing console
  console: (
    <>
      <path d="M10 104 L22 34 L138 34 L150 104 Z" fill={C.teal} />
      <path d="M22 34 L138 34 L136 44 L24 44 Z" fill={C.tealDeep} />
      {Array.from({ length: 8 }, (_, i) => {
        const x = 34 + i * 13;
        const knob = 52 + ((i * 7) % 3) * 3;
        const fader = 74 + ((i * 5) % 4) * 5;
        return (
          <g key={i}>
            <circle cx={x} cy={knob} r="3.4" fill={i % 3 === 0 ? C.mustard : C.ivory} />
            <line x1={x} y1="68" x2={x} y2="98" stroke={C.ink} strokeWidth="2" />
            <rect x={x - 4} y={fader} width="8" height="6" rx="1" fill={C.chrome} />
          </g>
        );
      })}
      <circle cx="40" cy="39" r="2" fill={C.needle} />
      <circle cx="120" cy="39" r="2" fill={C.mustard} />
    </>
  ),
  // Ribbon microphone
  mic: (
    <>
      <line x1="80" y1="86" x2="80" y2="112" stroke={C.ink} strokeWidth="3" />
      <rect x="56" y="108" width="48" height="6" rx="3" fill={C.ink} />
      <path d="M60 52 L60 82 Q80 92 100 82 L100 52" fill="none" stroke={C.chrome} strokeWidth="3" />
      <rect x="58" y="10" width="44" height="66" rx="20" fill={C.chrome} />
      <rect x="62" y="14" width="36" height="58" rx="17" fill={C.tobacco} />
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} x1="64" y1={20 + i * 5.2} x2="96" y2={20 + i * 5.2} stroke={C.tape} strokeWidth="1.4" />
      ))}
      <rect x="64" y="40" width="32" height="8" fill={C.needle} />
      <text x="80" y="46.5" textAnchor="middle" fontSize="5.5" fill={C.ivory} fontFamily="monospace" fontWeight="700">ON AIR</text>
    </>
  ),
  // Road case
  case: (
    <>
      <rect x="18" y="28" width="124" height="80" rx="4" fill={C.ink} />
      <rect x="22" y="32" width="116" height="72" rx="2" fill="none" stroke={C.tobacco} strokeWidth="1" />
      {[[16, 26], [130, 26], [16, 96], [130, 96]].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="14" height="14" rx="2" fill={C.chrome} />
      ))}
      <line x1="18" y1="66" x2="142" y2="66" stroke={C.chrome} strokeWidth="3" />
      <rect x="62" y="16" width="36" height="12" rx="6" fill="none" stroke={C.chrome} strokeWidth="3" />
      <rect x="48" y="44" width="64" height="14" rx="1" fill={C.mustard} />
      <text x="80" y="54" textAnchor="middle" fontSize="7" fill={C.ink} fontFamily="monospace" fontWeight="700">FRAGILE · SHIP</text>
      <rect x="74" y="62" width="12" height="8" rx="1" fill={C.chrome} />
    </>
  ),
  // Cassette
  cassette: (
    <>
      <g transform="rotate(-6 80 60)">
        <rect x="20" y="22" width="120" height="78" rx="6" fill={C.burgundy} />
        <rect x="30" y="30" width="100" height="42" rx="3" fill={C.ivory} />
        <rect x="30" y="34" width="100" height="5" fill={C.mustard} />
        <rect x="30" y="41" width="100" height="3" fill={C.needle} />
        <rect x="46" y="49" width="68" height="18" rx="9" fill={C.ink} />
        <circle cx="58" cy="58" r="6" fill={C.ivory} />
        <circle cx="102" cy="58" r="6" fill={C.ivory} />
        <rect x="70" y="53" width="20" height="10" fill={C.tapeBrown} />
        <path d="M40 100 L48 82 L112 82 L120 100 Z" fill={C.tealDeep} opacity="0.6" />
      </g>
    </>
  ),
  // Transistor radio
  radio: (
    <>
      <path d="M44 22 L60 4" stroke={C.chrome} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="26" y="20" width="108" height="88" rx="12" fill={C.needle} />
      <rect x="34" y="28" width="56" height="72" rx="6" fill={C.ivory} />
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 5 }, (_, c) => (
          <circle key={`${r}-${c}`} cx={42 + c * 10} cy={38 + r * 11} r="2.6" fill={C.tobacco} />
        )),
      )}
      <circle cx="113" cy="48" r="13" fill={C.mustard} />
      <circle cx="113" cy="48" r="9" fill="none" stroke={C.ink} strokeWidth="1" strokeDasharray="1.5 2" />
      <circle cx="113" cy="84" r="8" fill={C.chrome} />
      <line x1="113" y1="84" x2="117" y2="79" stroke={C.ink} strokeWidth="1.5" />
    </>
  ),
  // Electric guitar (offset body)
  guitar: (
    <>
      <g transform="rotate(-28 80 60)">
        <rect x="76" y="-4" width="8" height="66" fill={C.tobacco} />
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1="76" y1={4 + i * 8} x2="84" y2={4 + i * 8} stroke={C.chrome} strokeWidth="0.8" />
        ))}
        <rect x="73" y="-14" width="14" height="12" rx="3" fill={C.ink} />
        <path d="M80 58 C52 54 44 70 52 84 C58 96 50 108 62 116 C72 122 88 122 98 116 C110 108 102 96 108 84 C116 70 108 54 80 58 Z" fill={C.teal} />
        <path d="M68 74 L94 74 L96 100 L64 100 Z" fill={C.ivory} />
        <rect x="70" y="78" width="20" height="5" rx="1" fill={C.chrome} />
        <rect x="70" y="88" width="20" height="5" rx="1" fill={C.chrome} />
        {[78, 80, 82].map((x) => (
          <line key={x} x1={x} y1="-2" x2={x} y2="106" stroke={C.chrome} strokeWidth="0.5" />
        ))}
      </g>
    </>
  ),
  // Record crate
  crate: (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`rotate(${-12 + i * 5} ${40 + i * 18} 90)`}>
          <rect x={22 + i * 18} y="16" width="58" height="72" fill={[C.burgundy, C.mustard, C.teal, C.needle, C.tape][i]} />
          <circle cx={51 + i * 18} cy="44" r="14" fill="none" stroke={C.ivory} strokeWidth="1.2" opacity="0.6" />
        </g>
      ))}
      <rect x="12" y="66" width="136" height="46" rx="3" fill={C.tobacco} />
      <rect x="12" y="66" width="136" height="7" fill={C.ink} opacity="0.25" />
      <rect x="62" y="84" width="36" height="9" rx="4.5" fill={C.ink} />
    </>
  ),
};

export function GearArt({ name, className = "" }: { name: GearArtName; className?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true">
      {ART[name]}
    </svg>
  );
}
