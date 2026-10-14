"use client";

import { useState } from "react";
import { artist, km } from "@/lib/data";
import { SectionTitle } from "@/components/SectionTitle";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() =>
        navigator.clipboard
          .writeText(value)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          })
          .catch(() => {})
      }
      className="dymo dymo-teal hover:brightness-110 transition"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/** Contact, as a Rolodex address card. */
export function FanMail() {
  const rows = [
    { label: "Name", value: artist.name },
    { label: "Address", value: `${artist.location}, Cambodia` },
    { label: "Email", value: artist.email, href: `mailto:${artist.email}`, copy: true },
    { label: "GitHub", value: artist.github.replace("https://", ""), href: artist.github },
    ...(artist.linkedin
      ? [{ label: "LinkedIn", value: artist.linkedin.replace(/^https:\/\/(www\.)?/, ""), href: artist.linkedin }]
      : []),
    { label: "Tel", value: artist.telephone, href: `tel:${artist.telephone.replace(/\s/g, "")}` },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-burgundy text-ivory" aria-labelledby="fan-title">
      <div className="page grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-14 lg:gap-20 items-center">
        <div id="fan-title" className="min-w-0">
          <SectionTitle kicker="B3 · Stop" title="Fan Mail" km={km.fanMail} light>
            Writing about a project, a job, or a question about something on this record? Send it to the address on the card.
            Letters in Khmer or English are both welcome.
          </SectionTitle>
        </div>

        {/* Rolodex card */}
        <div className="relative min-w-0 mx-auto w-full max-w-[560px]">
          {/* index tab */}
          <div className="absolute -top-7 left-8 h-8 px-5 bg-paper text-burgundy rounded-t-md flex items-center font-display text-lg">
            H
          </div>
          <div className="relative bg-paper text-tobacco-deep rounded-sm shadow-[0_30px_50px_-24px_rgba(0,0,0,0.6)] -rotate-1">
            <div className="h-2 bg-needle" />
            <div className="px-6 sm:px-9 pt-6 pb-14 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_39px,rgba(30,87,83,0.28)_39px,rgba(30,87,83,0.28)_40px)]">
              <dl>
                {rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3 min-h-10">
                    <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-tobacco">{r.label}</dt>
                    <dd className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0">
                      {r.href ? (
                        <a
                          href={r.href}
                          target={r.href.startsWith("http") ? "_blank" : undefined}
                          rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="font-mono text-sm sm:text-[15px] break-all hover:text-burgundy underline decoration-tobacco/30 underline-offset-4"
                        >
                          {r.value}
                        </a>
                      ) : (
                        <span className="font-mono text-sm sm:text-[15px]">{r.value}</span>
                      )}
                      {r.copy && <CopyButton value={r.value} />}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* Rolodex slots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-24" aria-hidden="true">
              <span className="w-6 h-4 rounded-t-full bg-burgundy" />
              <span className="w-6 h-4 rounded-t-full bg-burgundy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
