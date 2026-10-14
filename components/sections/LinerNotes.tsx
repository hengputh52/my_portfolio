import { artist, credits, km, linerNotes } from "@/lib/data";
import { SectionTitle } from "@/components/SectionTitle";
import { GearArt } from "@/components/gear/GearArt";

/** About, set like the back of an LP: notes in columns, credits underneath. */
export function LinerNotes() {
  return (
    <section id="about" className="relative py-24 sm:py-32" aria-labelledby="liner-title">
      <div className="page">
        <div className="cardboard relative p-6 sm:p-12 lg:p-16">
          <div className="ring-wear opacity-60" />
          <div id="liner-title">
            <SectionTitle kicker="A1 · Play" title="Liner Notes" km={km.about} />
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_260px] gap-12 lg:gap-16">
            <div className="min-w-0 md:columns-2 gap-10 text-[1.05rem] leading-[1.75] text-tobacco-deep">
              {linerNotes.map((p, i) => (
                <p
                  key={i}
                  className={`mb-5 break-inside-avoid ${
                    i === 0
                      ? "first-letter:font-display first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-burgundy"
                      : ""
                  }`}
                >
                  {p}
                </p>
              ))}
              <p className="font-display text-xl text-burgundy break-inside-avoid">
                &ldquo;Careful, precise, built to last.&rdquo;
              </p>
            </div>

            <aside className="min-w-0">
              <GearArt name="mic" className="w-28 h-auto mb-6 -rotate-3" />
              <dl className="space-y-3 border-t-2 border-tobacco-deep pt-4">
                {credits.map((c) => (
                  <div key={c.role}>
                    <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-tobacco">{c.role}</dt>
                    <dd className="font-display text-lg leading-snug text-tobacco-deep">{c.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="font-mono text-[10px] tracking-[0.18em] text-tobacco/80 mt-6">
                {artist.catalog} · ℗ 2026
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
