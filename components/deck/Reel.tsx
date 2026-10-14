/**
 * A reel-to-reel spool. The parent spins `[data-spin]` and resizes `[data-tape]`.
 */
export function Reel({ tape = 30, className = "" }: { tape?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {/* wound tape */}
      <circle data-tape cx="50" cy="50" r={tape} fill="#3A2416" />
      <circle cx="50" cy="50" r={tape} fill="none" stroke="#5A3A24" strokeWidth="0.8" opacity="0.6" />
      <g data-spin style={{ transformOrigin: "50px 50px", transformBox: "view-box" }}>
        {/* clear plastic flange */}
        <circle cx="50" cy="50" r="46" fill="rgba(235, 228, 212, 0.18)" stroke="#CFC4AE" strokeWidth="2.5" />
        {/* spokes */}
        {[0, 120, 240].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 50 50)`}>
            <path d="M46 38 L44 8 Q50 5 56 8 L54 38 Z" fill="#CFC4AE" opacity="0.92" />
          </g>
        ))}
        {/* hub */}
        <circle cx="50" cy="50" r="13" fill="#DCD3C0" stroke="#A89C84" strokeWidth="1" />
        <circle cx="50" cy="50" r="4.5" fill="#22180F" />
        {[0, 120, 240].map((deg) => (
          <rect key={deg} x="48.5" y="39" width="3" height="4" fill="#22180F" transform={`rotate(${deg} 50 50)`} />
        ))}
      </g>
    </svg>
  );
}
